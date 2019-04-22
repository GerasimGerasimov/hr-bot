/**
* @description Форма опраций с Группами
Вкладки:
    АКТИВНЫЕ
        1) показываю Группы с Visible = true
        2) Кнопки Действия:
            2.1 Завершить (ставит Visible = false)
            2.2.Создать новую из копии (создать новую группу с настройками как у этой группы)
            2.3.Удалить (безвозвратно!)
    ЗАВЕРШЁННЫЕ 
        1) показываю Группы с Visible = false
        2) Кнопки Действия:
            2.1.Создать новую из копии (создать новую группу с настройками как у этой группы)
            2.2.Удалить (безвозвратно!)    
    WASTEBASKET' (U+1F5D1) - удалить 
    Завершить - Sleeping Face HTML Entity (hex)	&#x1f634;    

*/

<template>
    <div class="container p20p20">
        <div class="header">
            <div class="logo">
                <span class="font-size-24 font-weight-900 ml20">HR-BOT</span>
            </div>
            <nav class="menu">
                <search-input v-model="filterKey"></search-input>
                <button
                    class="__button bgc-success ml4 mr4"
                    @click="addGroup()"
                    >ДОБАВИТЬ КАМПАНИЮ
                </button>
                <button
                    class="__button bgc-primary ml4 mr4"
                    @click="logOut()"
                    >ВЫХОД
                </button>
            </nav>
        </div>
        <div>
            <center><h1 class="font-size-24 ml20">Группы</h1></center>
            <tab-sheets :Captions = "tabSheetsGroupsSelect.Captions"
                        :InitialTab = "0"
                        :onChangeTabIndex = "onClickTabSheets"
            ></tab-sheets>
              <table>
                <thead>
                <tr>
                    <th
                        v-for="item in getColumnsName" :key="item"
                        @click="sortBy(item)"
                        :class="{ active: sortKey == item }"
                    >
                    {{ item | capitalize }}
                    <span
                        class="arrow"
                        :class="getSortDirections(item)"
                    >
                    </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="group in filteredData" :key="group.filterKey" >
                    <td>{{group.Employer}}</td>
                    <td>{{group.Position}}</td>
                    <td>{{group.Created}}</td>
                    <td>{{group.Location}}</td>
                    <td>{{group.Status}}</td>
                    <td @click="onClickToolCell(group)">
                        <icons-tool-bar
                            :Captions = "IconsToolBarData.ToolsData.Active"
                            :onClkToolBtn ="onClickToolBarButtons"
                        ></icons-tool-bar>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SearchInput   from "../ui/VSearchInput.vue"
import GroupTemplate from "../../classes/group.js"
import TabSheets from '../ui/VTabSheets.vue'
import IconsToolBar from '../ui/VIconsToolBar.vue'

export default {
    data (){
        return {
            columns: ['Employer', 'Position', 'Created', 'Location', 'Status','Действия'],
            sortKey: '',
            sortDirections:'up',//'down'
            filterKey: '',
            sortOrders:{},
            SortOrders:[
                {   key: 'Employer',  //колонка
                    source: true,//если true то сортировка по этой колонке
                    dir:true     //направление сортировки
                },
                {   key: 'Position',       //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir: true      //направление сортировки
                },
                {   key: 'Created',      //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir:true      //направление сортировки
                },
                {   key: 'Location',       //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir:true      //направление сортировки
                },
                {   key: 'Status',       //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir:true      //направление сортировки
                }       
            ],
            tabSheetsGroupsSelect: {
                Captions:['Активные','Скрытые'], //данные TabSheets
                TabIndex:0
            },
            IconsToolBarData: {
                ToolsData: {
                    Active:[ {action:'ENTRY', icon:'ENTRY',  title:'Войти в группу'},
                             {action:'DEL',   icon:'DELETE', title:'Удалить группу'},
                             {action:'COPY',  icon:'COPY',   title:'Создать группу на основе этой'},
                             {action:'HIDE',  icon:'HIDE',   title:'Скрыть группу'}
                    ],
                    Hide:[   {action:'ENTRY', icon:'ENTRY',  title:'Войти в группу'},
                             {action:'DEL',   icon:'DELETE', title:'Удалить группу'},
                             {action:'COPY',  icon:'COPY',   title:'Создать группу на основе этой'}
                    ],                    
                },
                Action:{ //выбранное действие (DEL, COPY, HIDE)
                    type: Object,
                    default: function(){
                        return {action:'DEFAULT'}
                    }
                }
            }
        }
    },
    created() {
        this.$store.dispatch('GET_USER_GROUPS')
    },
    methods: {
        //при клике на ячейке c кнопками-actions, ячейка знает группу group
        //Когда юзер кликнул на ToolBar, то в Action попадает инфа о нажатой
        //кнопки в ToolBar`e. Так зная group и action можно производить
        //дальнейшие действия
        onClickToolCell(group) {
            this.applyAction(group, this.IconsToolBarData.Action.action) 
        },
        //Выбор действия для группы
        applyAction(group, action) {
            let doAction = {
                'ENTRY'  : this.goToCompanyPage,
                'HIDE'   : this.hideGroup,
                'COPY'   : this.copyGroup,
                'DEL'    : this.deleteGroup,                            
                'default': function(){
                    console.log(`${action} not found`)
                    return `${action} not found`
                }
            }
            return (doAction[action] || doAction['default'])(group)
        },
        //вызывается при клике на ToolBar, заполняет Actio - какую кнопку
        //на ToolBar нажал юзер
        onClickToolBarButtons(item){
            console.log('getCompanyPageAction:', item)
            this.IconsToolBarData.Action = item
        },
        //клик по TabSheet. Требуется показать таблицу Групп в соответствии с выбором
        //Активные или Скрытые
        onClickTabSheets(index){
            this.tabSheetsGroupsSelect.TabIndex = index
            console.log(`onClickTabSheets:${index}`)
        },
        addGroup(){//добавить Кампанию(группу)
            console.log('Добавить компанию')
            const group = new GroupTemplate(this.$store.state.username)
            this.$store.commit('enterToCampany', group)
        },
        logOut(){
            this.$store.dispatch('logOut','');
        },
        //Получает выбранный в таблице объект Группа
        //Инициирует открытие страницы данных Группы с загрузкой соответсвущих полей
        goToCompanyPage(group){
            console.log('goToCompanyPage',group)
            this.$store.commit('enterToCampany', group);
        },
        async hideGroup(group){
            try {
                await this.$store.dispatch('SAVE_GROUP', {uri:group.uri, data:{Visible:false}})
                group.Visible = false
            } catch (err) {
                console.log(`изменения не записались:  ${err}`)
            }
        },
        copyGroup(group){
            console.log('copyGroup',group)
            group.Visible = true
        }, 
        async deleteGroup(group){
            console.log('deleteGroup',group)
            try {
                await this.$store.dispatch('DELETE_GROUP', group.uri)
                //удаление на сервере прошло без ошибок, надо удалить у себя
                //но это шляпа надо сделать через мутации
                this.$store.state.groups.splice(this.$store.state.groups.indexOf(group),1)
            } catch (err) {
                console.log(`Группа не удалилась:  ${err}`)
            }
        },               
        sortBy (key) {
            this.sortKey = key;
            //если я нажимаю на зоголовал таблицы, а до этого был выбран другой заголовок
            //то сначала производится сорировка по новому заголовку с тем напрвление которое там уже было
            //повторные нажатие на заголовок приводят к смене направления сортировки
            //и так, нажатие:
            //1) проверяю сменилась ли колонка
            //   если this.sortKey не равно key то колонка сменилась
            //   console.log('sortBy._sortOrders:',key, this.SortOrders)
            //   ставлю source=true выбранной колонке, остальные false
            if (key != this.sortKey) {
                this.SortOrders.forEach((item)=>{
                    item.source  = (key == item.key)?true:false;
                })
            }
            //2) не было смены колонки, значит была смена направления
            //   тут key = this.sortKey
            //   найти объект с key = key и сделать tougle направлению
            else {
                this.SortOrders.forEach((item)=>{
                    if (item.key == key) {
                        item.dir  = (item.dir)?false:true
                        this.sortDirections = (item.dir) ? 'up' : 'down'
                    }
                },this)
            }
            //это просто вывод отладочной информации
            this.SortOrders.forEach((item)=>{
                console.log('|-'+item.key+': '+item.source+': '+item.dir );
            })
        },
        getSortDirections(key) {
            let dir = 'asc';
            this.SortOrders.forEach((item)=>{
                if (item.key == key) {
                    dir = (item.dir) ? 'asc' : 'dsc'
                }
            })
            return dir;
        }
    },

    computed: {
        filteredData: function() {
            var sortKey = this.sortKey
            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            var order = (this.sortDirections == 'up')?1:-1 //порядок сортировки
            //this.$store.state.groups;//источник данных
            //в выборку должны попасть только данные в зависимости от Активные или Скрытые
            //tabSheetsGroupsSelect: {
            //    Captions:['Активные','Скрытые'], //данные TabSheets
            //    TabIndex:0-Активные (Visible = true), 1-Скрытые  (Visible = false)
            const reqGroups = (this.tabSheetsGroupsSelect.TabIndex == 0)?true:false
            const data = this.$store.state.groups.filter(item => item.Visible === reqGroups)

            console.log("filteredData: filterKey:",filterKey,
                                            " sortKey:",sortKey,
                                                " DIR:", this.sortDirections)
            if (filterKey) {
                console.log("filteredData.filterKey:",filterKey)
                data = data.filter(function(row) {
                return Object.keys(row).some(function(key) {
                    return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            //фильтрация по заголовку и направлению сортировки
            //В зависимости от заголовка key может меняться сортировка.
            //'employer', 'position' - это просто текст
            //'date' - сортировки по дате
            //'status' - статусов может быть много (пока текст)
            if (sortKey) {
                console.log("filteredData.sortKey:",sortKey)
                data = data.slice().sort(function(a, b) {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }
            return data
        },
        getColumnsName(){
            return this.columns;
        },
        getGridData(){
             return this.$store.state.groups;
        },
        groups:{
            get() {
                return this.$store.state.groups;
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
        SearchInput,
        TabSheets,
        IconsToolBar
    }
}

</script>

<style scoped>
  .container {
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
    /*background: repeating-radial-gradient(circle, var(--info-color), var(--accent-color) 10px, var(--accent-color) 10px, var(--accent-color) 20px);
    */
    grid-column: 1/15;
    color: var(--secondary-color);
  }

.menu {
    display: flex;
    justify-content: flex-start; /*прижимает содержимое к краям */
    align-items: center; /*выравнивает элементы по центру на вертикальной */
    margin-top: 4px;
    margin-bottom: 4px;
    height: 32px;/*высота блоков текст будет по центру*/
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
  input {
    color: var(--secondary-color);
    background-color: white;
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

/*Стрелки*/
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.6;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 8px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid #fff;
}

</style>
