/**
* @description Форма опраций с Группами
* JSON групп:Groups
*   PK:	id
*   FK:
*        GroupName
*        Owner
*        Created
*
*        Candidates
*        SearchParams
*        MessageTemplate
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
                >ДОБАВИТЬ КАМПАНИЮ</button>
                <button
                    class="__button bgc-primary ml4 mr4"
                    @click="logOut()"
                >ВЫХОД</button>
            </nav>
        </div>
        <div>
              <table>
                <caption class="font-size-24 ml20">Группы</caption>
                <thead>
                <tr>
                    <th
                        v-for="key in getColumnsName"
                        @click="sortBy(key)"
                        :class="{ active: sortKey == key }"
                    >
                    {{ key | capitalize }}
                    <span
                        class="arrow"
                        :class="getSortDirections(key)"
                    >
                    </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="entry in filteredData">
                    <td v-for="key in getColumnsName">
                        {{entry[key]}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SearchInput from '../ui/SearchInput.vue'

export default {
    data (){
        return {
            columns: ['employer', 'position', 'date', 'status'],
            sortKey: '',
            sortDirections:'up',//'down'
            filterKey: '',
            sortOrders:{},
            SortOrders:[
                {   key: 'employer',  //колонка
                    source: true,//если true то сортировка по этой колонке
                    dir:true     //направление сортировки
                },
                {   key: 'position',       //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir: true      //направление сортировки
                },
                {   key: 'date',      //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir:true      //направление сортировки
                },
                {   key: 'status',       //колонка
                    source: false,//если true то сортировка по этой колонке
                    dir:true      //направление сортировки
                }                 
            ]
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logOut','');
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
            /*
            var s = (this.sortDirections == 'up') ? 'asc' : 'dsc'
            console.log('getSortOrders:',key, s)
            return s
            */
        },
    },

    computed: {
        filteredData: function() {
            var sortKey = this.sortKey
            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            var order = (this.sortDirections == 'up')?1:-1 //порядок сортировки
            var data = this.$store.state.groups;//источник данных
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
        SearchInput
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
  min-width: 120px;
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
