<template>
    <div class="container p20p20">
        <div class="header">
            <div class="logo">
                <span class="font-size-24 font-weight-900 ml20">HR-BOT</span>
            </div>
            <nav class="menu">
                <button
                    class="__button bgc-success ml4 mr4"
                    @click="backToGroups()"
                >ВЕРНУТЬСЯ К ГРУППАМ</button>
                <button
                    class="__button bgc-primary ml4 mr4"
                    @click="logOut()"
                >ВЫХОД</button>
            </nav>
        </div>
        <div class="campany-form">
            <div class="menu">
                <p class="menu-text font-size-16 font-weight-600">Настройки кампании</p>
                <div class="line" style="width:90%"></div>
                <div class="utf-icon-button font-size-24 font-weight-900" role="button"
                    @click="tougleCollapse()">
                    {{getCollapseArrow()}}
                </div>
                <div class="line" style="width:16px"></div>
            </div> 
            <transition name="fade">
            <div v-if="!collapse">     
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Наниматель">
                    <input type="text" v-model="Employer">
                </div>
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Должность">
                    <input type="text" v-model="Position">
                </div>  
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Опыт">
                    <textarea class="font-size-16" v-model="Skills"></textarea>
                </div>                 
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Сообщение">
                    <textarea class="font-size-12" v-model="MessageTemplate"></textarea>
                </div>      
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Города">
                    <input type="text" v-model="Location">
                </div>        
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Круги">
                    <input type="text" v-model="Circles">
                </div>    
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Исключения">
                    <input type="text" v-model="Exceptions">
                </div>   
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="">
                    <button
                            class="__button bgc-success ml4 mr4"
                            @click="createGroup()"
                    >ВЫПОЛНИТЬ ПОИСК &#x2315</button>  
                </div>    
            </div>
            </transition>
            <div class="value-block disactive ">
                <input type="label" class="font-size-16 font-weight-600" value="Ищем">
                <auto-height-text-area 
                    class="auto-height-text-area font-size-12 white-space-pre"
                    :text = "Summary"
                    >
                </auto-height-text-area>
            </div>                                                         
        </div>
        <div class="campany-form pt8">
            <div class="menu">
                <p class="menu-text font-size-16 font-weight-600">Кандидаты</p>
                <div class="line" style="width:90%"></div>
                <div class="utf-icon-button font-size-32 font-weight-900" role="button">&#8801</div>
                <div class="line" style="width:16px"></div>
            </div>
            <tab-sheets :Captions = "tabSheetsEmployersSelect.Captions"
                        :InitialTab = "0"
                        :onChangeTabIndex = "onChTabSheetsEmployersIndex"
            ></tab-sheets>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th
                            v-for="item in getColumnsName" :key="item"
                         >
                        {{ item }}
                        </th>
                    </tr>
                    </thead>                    
                    <tbody>
                    <tr v-for="(candidate, index) in filteredData" :key="candidate.filterKey" >
                        <td>
                            <button
                                class="font-weight-900 font-size-24"
                                :class="[candidate.Checked ? 'btn-check' : 'btn-uncheck']"
                                @click="onCheck(candidate)"
                            ></button>                             
                        </td>
                        <td>{{index + ' ' + candidate.Status}}</td>
                        <td>{{candidate.FullName}}</td>
                        <td>{{candidate.Position}}</td>
                        <td>{{candidate.Company}}</td>
                        <td>
                            <a :href=candidate.ProfileURI>GO</a>
                        </td>
                        <td>{{candidate.Note}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
//так я менял текст в кнопке
//{{ candidate.Checked ? `&#x2611` : `&#x2610` }}
import AutoHeightTextArea from '../ui/VAutoHeightTextArea.vue'
import TabSheets from '../ui/VTabSheets.vue'
import { format } from 'path';
import Candidate from "../../classes/candidate.js"

export default {
    data (){
        return {
            collapse: false,
            selectedTabSheet: {},
            tabSheetsEmployersSelect: {
                Captions:['Избраные', 'Остальные'], //данные TabSheets
                TabIndex:0
            },
            columns: ['Check', 'Статус', 'Имя', 'Должность', 'Место работы','URL','Примечание'],

        }
    },
    created: function(){
        /*
        //загружу список кандидатов
        console.log('CompanyForm.created',this.$store.state.campany)
        if (!this.$store.state.campany.hasOwnProperty('uri'))
            this.$store.dispatch('GET_CANDIDATES')
        */
       this.getCandidatesData()
    },
    methods: {    
        //&#x2610
        //Unicode Character 'BALLOT BOX' (&#x2610)             ☐
        //Unicode Character 'BALLOT BOX WITH CHECK' (&#x2611)  ☑  
        onCheck(candidate){
            candidate.Checked = !candidate.Checked
        },
        async getCandidatesData(){
            //почищу список кандидатов
            this.$store.commit('clearCandidates')
            //пока выведу список кандидатов
            const campany = this.$store.state.campany
            //создам массив API URL запросов данных Кандидатов
            const uris = [] //массив URI ДБ кандидатов
            for (let item in campany.Candidates){
                uris.push(campany.Candidates[item])
            }
            //теперь зная ко-во кандидатов, можно сделать ProgressBar
            //... в какой нибудь из спринтов
            //Гружу даные кандидатов
            //try/catch внутри цикла, чтобы грузились все возможные канидаты
            //и цикл не останавливался на "битых" данных
            for (let item of uris) {
                try {
                    let candidate = new Candidate()
                    candidate = await this.$store.dispatch('GET_CANDIDATE', item)
                    candidate.uri = item
                    this.$store.commit('addCandidate',candidate)
                    //console.log(candidate)
                }
                catch (err){
                    console.log(`данные Кандидата ${item} не прочитаны:  ${err}`)
                }
            }
        },
        createGroup(){
            this.$store.dispatch('CREATE_GROUP')
        },
        //клик по TabSheet. Требуется показать таблицу в соответствии с выбором
        onChTabSheetsEmployersIndex(index){
            this.tabSheetsEmployersSelect.TabIndex = index
            console.log(`onChTabSheetsEmployersIndex:${index}`)
        },
        logOut(){
            this.$store.dispatch('logOut','');
        },
        backToGroups(){
            this.$store.dispatch('backToGroups','');
        },
        tougleCollapse(){
            this.collapse = !this.collapse;
        },
        getCollapseArrow () {
            return (this.collapse)?'\u25BC':'\u25B2';
        }
    },
    computed: {
        filteredData() {
            const required = (this.tabSheetsEmployersSelect.TabIndex == 0)?true:false
            var data = this.$store.state.candidates.filter(item => item.Checked === required)
            return data
        },
        getColumnsName(){
            return this.columns;
        },        
        getTabIndex() {
            console.log('watch:selectedTabSheet:',this.tabSheetsEmployersSelect.TabIndex)
        },
        Summary:{
            get() {
                let res = '';
                res +=this.$store.state.campany.hasOwnProperty('Employer')?(this.$store.state.campany.Employer+'\n'):'';
                res +=this.$store.state.campany.hasOwnProperty('Position')?(this.$store.state.campany.Position+'\n'):'';
                res +=this.$store.state.campany.hasOwnProperty('Skills')?(this.$store.state.campany.Skills+'\n'):'';
                res +=this.$store.state.campany.hasOwnProperty('Location')?(this.$store.state.campany.Location):'';
                return res;
            },
            set(value){
            }
        },
        Employer:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Employer')?this.$store.state.campany.Employer:''; 
            },
            set (value) {
                this.$store.commit('updateGroupEmployer', value);
            }
        },
        Position:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Position')?this.$store.state.campany.Position:''; 
            },
            set (value) {
                this.$store.commit('updateGroupPosition', value);
            }
        },
        Skills:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Skills')?this.$store.state.campany.Skills:''; 
            },
            set (value) {
                this.$store.commit('updateGroupSkills', value);
            }
        },
        MessageTemplate:{
            get() {
                return this.$store.state.campany.hasOwnProperty('MessageTemplate')?this.$store.state.campany.MessageTemplate:''; 
            },
            set (value) {
                this.$store.commit('updateGroupMessageTemplate', value);
            }
        },
        Location:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Location')?this.$store.state.campany.Location:''; 
            },
            set (value) {
                this.$store.commit('updateGroupLocation', value);
            }
        },
        Circles:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Circles')?this.$store.state.campany.Circles:''; 
            },
            set (value) {
                this.$store.commit('updateGroupCircles', value);
            }
        },
        Exceptions:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Exceptions')?this.$store.state.campany.Exceptions:''; 
            },
            set (value) {
                this.$store.commit('updateGroupExceptions', value);
            }
        }         
         
    },
    filters: {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    components: {
        AutoHeightTextArea,
        TabSheets
    }
}

</script>

<style scoped>
  .container {
    color: var(--secondary-color);
    background: white;
    grid-column: 1/15;
    position: relative;
  }

  /*Размечаю заголовок как flex-контейнер*/
  .header {
    /*background-color: lightgray;*/
    background-image: radial-gradient(ellipse farthest-corner at right bottom, var(--primary-color) 0%, var(--accent-color) 50%, var(--info-color) 100%);
    display: flex;
    flex-wrap: wrap; /*перенос строки */
    justify-content: space-between; /*прижимает содержимое к краям */
    align-items: center; /*выравнивает элементы по центру на вертикальной */
   } 

  /*описываю оформление градиентом*/
  .header {
    grid-column: 1/15;
    color: var(--secondary-color);
  }

.campany-form {
    box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.1);/* Параметры тени */
}

.menu {
    display: flex;
    justify-content: flex-start; /*прижимает содержимое к краям */
    align-items: center; /*выравнивает элементы по центру на вертикальной */
    margin-top: 4px;
    margin-bottom: 4px;
    height: 32px;/*высота блоков текст будет по центру*/
    color: var(--secondary-color);
}

.menu-text {
    white-space: nowrap;
    margin-left: 4px;
}

.utf-icon-button {
    color: var(--accent-color);
    cursor: pointer;
    user-select: none;
}
.line {
    /*border: 1px solid var(--secondary-color);*/
    height: 4px;
    margin-left: 2px;
    margin-right: 2px;
    /*opacity: 0.1;*/
    box-shadow: inset 5px 5px 1px rgba(0,0,0,0.1);/* Параметры тени */
}
/*элементы ввода и кнопки растянуты на весь контейнер*/
.menu button {
    border-style:none;
    /*box-sizing: border-box;*/
    height: 32px;
    margin-top: 0px;
    margin-bottom: 0px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,1.0);
  } 

  /*цвет текста элементов ввода*/
  input,
  textarea {
    color: var(--secondary-color);
    background-color: white;
  }

.value-block {
    display: flex;
    align-items: flex-start;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 0px;
    padding-bottom: 12px;
}

.value-block input[type=label]{
    white-space: nowrap;
    width: 165px;
    border: 0px;
    padding-bottom: 2px;
    padding-top: 2px;
}

.value-block input[type=text]{
    flex: 1;
    padding-bottom: 2px;
    padding-top: 2px;
    white-space: normal;
    /*border-width: 1px;*/
    /*border-color: var(--accent-color);*/
    /**/
    border-style:none;
    box-sizing: border-box;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1); /* Параметры тени */
}

.value-block textarea{
    flex: 1;
    height: 100%;
    padding-bottom: 2px;
    padding-top: 2px;
    white-space: normal;
    /*border-width: 1px;*/
    /*border-color: var(--accent-color);*/
    /**/
    border-style:none;
    box-sizing: border-box;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1); /* Параметры тени */
}

/*.value-block textarea:read-only{*/
.auto-height-text-area {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;/*удаляю обводку браузера*/
    resize: none;/*удалаю элемент изменения размера в ПН углу*/
    padding-bottom: 2px;
    padding-top: 2px;
    box-shadow: none;
    white-space: pre-line; /* Учитываются все пробелы и переносы */ 
    word-wrap: break-word;
}

.disactive {
    color: var(--secondary-color);
    opacity: 0.8;
}

.white-space-pre {
    white-space: pre-line; /* Учитываются все пробелы и переносы */ 
    word-wrap: break-word;
}

/*анимация появления/скрытия основных полей формы*/
.fade-enter-active, .fade-leave-active {
  transition: all .25s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scaleY(0)  scaleX(0);
}
/*Таблица*/
table {
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
}

th {
  background-color: var(--primary-color);
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  user-select: none;
  opacity: 0.6;  
}

td {
  background-color: lavender;
}

th, td {
  min-width: 100px;
  padding: 10px 20px;
}

th.active {
  color: white;
  opacity: 1;
}

th.active .arrow {
  opacity: 1;
}

.btn-check,
.btn-uncheck
 {
  border: none;
  color: inherit;
  text-align: center;
  background-color: transparent;
  outline: none;
  opacity: 0.6;
} 

.btn-check:hover,
.btn-uncheck:hover {
    opacity: 1;
}

.btn-check::before,
.btn-uncheck:active::before{
  content: "\2611"; 
}

.btn-uncheck::before,
.btn-check:active::before {
  content: "\2610"; 
}

</style>
