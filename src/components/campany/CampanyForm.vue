<template>
    <div class="container p20p20">
        <div class="header">
            <div class="logo">
                <span class="font-size-24 font-weight-900 ml20">HR-BOT</span>
            </div>
            <nav class="menu">
                <button
                    class="__button bgc-success ml4 mr4"
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
                <div class="utf-icon-button font-size-24 font-weight-900" role="button" @click="tougleCollapse()">{{getCollapseArrow()}}</div>
                <div class="line" style="width:16px"></div>
            </div> 
            <div v-if="!collapse">     
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Наниматель">
                    <input type="text" :value="Employer">
                </div>
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Должность">
                    <input type="text" :value="Position">
                </div>  
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Опыт">
                    <textarea class="font-size-16" v-model="Skills"></textarea>
                </div>                 
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Сообщение">
                    <textarea class="font-size-12">{{MessageTemplate}}</textarea>
                </div>      
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Города">
                    <input type="text" :value="Location">
                </div>        
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Круги">
                    <input type="text" :value="Circles">
                </div>    
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="Исключения">
                    <input type="text" :value="Exceptions">
                </div>   
                <div class="value-block">
                    <input type="label" class="font-size-16 font-weight-600" value="">
                    <button
                            class="__button bgc-success ml4 mr4"
                    >ВЫПОЛНИТЬ ПОИСК &#x2315</button>  
                </div>    
            </div>
            <div class="value-block disactive ">
                <input type="label" class="font-size-16 font-weight-600" value="Ищем">
                <textarea readonly ref="textarea" class="font-size-12 white-space-pre" 
                    :style="{ height: myTextAreaHeight }"
                    v-model="Summary"></textarea>
            </div>                                                         
        </div>
        <div class="campany-form pt8">
            <div class="menu">
                <p class="menu-text font-size-16 font-weight-600">Кандидаты</p>
                <div class="line" style="width:90%"></div>
                <div class="utf-icon-button font-size-32 font-weight-900" role="button">&#8801</div>
                <div class="line" style="width:16px"></div>
            </div>
            <!-- Выделить в компонент!-->
            <div class="persons-tab-menu">
                <slot v-for="(sheet, index) in getSheets" >
                    <div class="tabsheet"
                         :class="{active:sheet.active, nonactive:!sheet.active}"
                          @click="setSheetActive(index)"
                    >
                        {{sheet.caption}}
                    </div>
                    <div class="tabbreak"></div>
                </slot>
                 <div class="tabbreak flex-1"></div>
            </div>
            <div> Таблица </div>
        </div>
    </div>
</template>

<script>
//import SearchInput from '../ui/SearchInput.vue'

export default {
    data (){
        return {
            collapse: false,
            tabs: { 
                active: 0,
                Captions:['Избраные', 'Все','Ещё какие-то','Ф.И.О','Отборные!']
            },
            myTextArea:{},
            myTextAreaHeight: "auto"
        }
    },
    mounted(){
        //только после mounted открывается доступ к элементам HTML описанных в $refs
        console.log('mounted');
        console.log('setTextAreaHeight:',this.$refs.textarea);
        this.myTextArea = this.$refs.textarea;
        this.myTextAreaHeight = this.myTextArea.scrollHeight +"px"; 
    },
    watch: {
        Summary: function(){
            this.myTextAreaHeight = "auto";//сначала ставлю высоту автоматическую
                                           //чтобы высота уменьшилась! если высота текста
                                           //уменьшилась
            //а потом, сделаю высоту такой какая требуется (вычисленная из scrollHeight)
            this.$nextTick(function() {
                console.log('nextTick.scrollHeight:',this.myTextArea.scrollHeight);
                this.myTextAreaHeight = this.myTextArea.scrollHeight +"px";
            })
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logOut','');
        },
        tougleCollapse(){
            this.collapse = !this.collapse;
        },
        getCollapseArrow () {
            return (this.collapse)?'\u25BC':'\u25B2';
        },
        setSheetActive(index) {
            this.tabs.active = index;
            console.log("setSheetActive", this.tabs.active);
        }
        /*
        //высота textArea
        setTextAreaHeight(){
            console.log('setTextAreaHeight:',this.$refs);
            console.log('setTextAreaHeight:',this.$refs.textarea);
            console.log('setTextAreaHeight:',this.$refs[0]);
            return 'height=100px';
        },
        */
    },
    computed: {
        getSheets(){
            let a=[];
            this.tabs.Captions.forEach((item,index)=>{
                console.log(item, index);
                let sheet = {}
                    sheet.caption = item;
                    sheet.active = (this.tabs.active == index)?true:false;
                a.push(sheet);
            });
            console.log(a);
            return a;
        },
        Summary:{
            get() {
                let res = '';
                res +=this.$store.state.campany.hasOwnProperty('Employer')?(this.$store.state.campany.Employer+'\n'):'';
                res +=this.$store.state.campany.hasOwnProperty('Position')?(this.$store.state.campany.Position+'\n'):'';
                res +=this.$store.state.campany.hasOwnProperty('Skills')?(this.$store.state.campany.Skills+'\n'):'';
                res +=this.$store.state.campany.hasOwnProperty('Location')?(this.$store.state.campany.Location+'\n'):'';
                return res;
            },
            set(value){
            }
        },
        getTextAreaHeight(){
            let s = this.myTextArea.scrollHeight;
            console.log('getTextAreaHeight.s:',s);       
            return s;
        },
        Employer:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Employer')?this.$store.state.campany.Employer:''; 
            },
            set (value) {
                //this.$store.commit('updateEmail', value);
            }
        },
        Position:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Position')?this.$store.state.campany.Position:''; 
            },
            set (value) {
                //this.$store.commit('updateEmail', value);
            }
        },
        Skills:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Skills')?this.$store.state.campany.Skills:''; 
            },
            set (value) {
                this.$store.state.campany.Skills = value;
                //this.$store.commit('updateEmail', value);
            }
        },
        MessageTemplate:{
            get() {
                return this.$store.state.campany.hasOwnProperty('MessageTemplate')?this.$store.state.campany.MessageTemplate:''; 
            },
            set (value) {
                //this.$store.commit('updateEmail', value);
            }
        },
        Location:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Location')?this.$store.state.campany.Location:''; 
            },
            set (value) {
                //this.$store.commit('updateEmail', value);
            }
        },
        Circles:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Circles')?this.$store.state.campany.Circles:''; 
            },
            set (value) {
                //this.$store.commit('updateEmail', value);
            }
        },
        Exceptions:{
            get() {
                return this.$store.state.campany.hasOwnProperty('Exceptions')?this.$store.state.campany.Exceptions:''; 
            },
            set (value) {
                //this.$store.commit('updateEmail', value);
            }
        }         
         
    },
    filters: {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    components: {
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

.value-block textarea:read-only{
    flex: 1;
    border: none;
    outline: none;/*удаляю обводку браузера*/
    resize: none;/*удалаю элемент изменения размера в ПН углу*/
    padding-bottom: 2px;
    padding-top: 2px;
    /**/
    box-shadow: none;
    /**/
    white-space: pre-line; /* Учитываются все пробелы и переносы */ 
    word-wrap: break-word;
}

.disactive {
    color: var(--secondary-color);
    opacity: 0.8;
}

.persons-tab-menu {
    display: flex;
    align-items: flex-end;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 0px;
    padding-bottom: 12px;
    line-height: 24px;
}

.persons-tab-menu div.tabsheet {
    cursor: pointer;
    user-select: none;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 0px;
    margin-right: 0px;
}

.persons-tab-menu .active  {
    border-top: 2px solid var(--warning-color);
    border-bottom: 1px solid transparent;
    background-color: var(--primary-color);
    color: #fff; /* цвет текста */
    opacity: 0.9;
}

.persons-tab-menu .nonactive  {
    border: 1px solid var(--accent-color);
    opacity: 0.5;
}
.persons-tab-menu div.tabbreak {
    margin-left: 0px;
    margin-right: 0px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid var(--accent-color);
    width: 2px;
}

.flex-1 {
    flex: 1;
}

.white-space-pre {
    white-space: pre-line; /* Учитываются все пробелы и переносы */ 
    word-wrap: break-word;
}


</style>
