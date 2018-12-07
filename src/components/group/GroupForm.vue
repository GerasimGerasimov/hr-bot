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
                <span class="font-size-24 ml20">Группы</span>
            </div>
            <nav class="menu">
                <search-input></search-input>
                <button class="__button bgc-primary ml4 mr4">ВЫХОД</button>
            </nav>
        </div>
    </div>
</template>

<script>
import SearchInput from '../ui/SearchInput.vue'

export default {
    data (){
        return {
            msg:''
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
    background-color: lightgray;
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

</style>
