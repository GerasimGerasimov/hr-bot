/**
* @description Форма опраций с Группами
*
*/

<template>
    <div class="container p20p20">
        <div class="header">
            <div class="logo">
                <span class="font-size-24 font-weight-900 ml20">HR-BOT</span>
                <span class="font-size-16 ml20">Группы</span>
            </div>
            <nav class="menu">
                <!--Поле поиска начало-->
                <div class="search">
                    <!--Место под иконку Поиск-->
                    <div>&#x2315</div>
                    <input
                        type="search"
                        placeholder="Поиск по критериям"
                    >
                </div>
                <!--Поле поиска конец-->
                <button class="__button bgc-primary ml4 mr4">ВЫЙТИ</button>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            msg:''
        }
    },
    methods: {

    },
    computed: {

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
    background-color: gray;
    display: flex;
    flex-wrap: wrap; /*перенос строки */
    justify-content: space-between; /*прижимает содержимое к краям */
    align-items: center; /*выравнивает элементы по центру на вертикальной */
   } 

  /*описываю оформление градиентом*/
  .header {
    background: repeating-radial-gradient(circle, var(--info-color), var(--accent-color) 10px, var(--accent-color) 10px, var(--accent-color) 20px);
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

/*для исключения пробелов между блоками*/
.search {
    display: flex;
    justify-content: flex-start; /*прижимает содержимое к краям */
    align-items: center; /*выравнивает элементы по центру на вертикальной */
    width: 200px;
}

.search *{
    outline: none; /*убираем стандартную обводку браузера*/
    opacity: 0.5;/*и добавляю прозрачности*/
    /*рамка*/
    border-style:none;
    /*box-sizing: border-box;
    /*Высота*/
    height: 32px;
    max-height: 32px;
    line-height: 32px;
    /*наружние отступы*/
    margin-top: 0px;
    margin-bottom: 0px;
    border: 0px;
    /*box-shadow: 0 2px 5px 0 rgba(0,0,0,1.0);*/
}

.search div {
    font-size: 32px;
    color:black;
    background-color: var(--primary-color);
    border-style:none;
    min-width: 32px;
    text-align:center;
    border-right: 1px solid gray;
    box-shadow: -2px 2px 5px 0 rgba(0,0,0,1.0);
}

.search input {
    font-size: 16px;
    background-color: white;
    min-width: 168px;
    max-width: 168px;
    box-shadow: 2px 2px 5px 0 rgba(0,0,0,1.0);
}

/*при наведении на любой элемент в классе, меняю прозрачность*/
.search:hover *{
    opacity: 0.9;/*уменьшаю прозрачность*/
}

</style>