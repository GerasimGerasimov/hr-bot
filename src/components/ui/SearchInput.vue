<template>
    <div class="search">
        <input
            type="search"
            placeholder="Поиск по критериям"
            v-bind="$attrs"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
        >
        <div>
            &#x2315
        </div>
    </div>
</template>

<script>
//module.exports 
export default {
    inheritAttrs: false,
    //props: ['value'],
    data: function (){
        return {
            value:''
        }
    }
}
</script>

<style scoped>
/*для исключения пробелов между блоками*/
.search {
    display: flex;
    justify-content: flex-start; /*прижимает содержимое к краям */
    align-items: center; /*выравнивает элементы по центру на вертикальной */
    width: 210px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,1.0);
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
}

.search div {
    
    height: 32px;
    width: 32px;
    margin: auto;
    line-height: 30px;/*эта строчка помогла выровнять выровнять ЛУПУ по вертикали*/
    text-align:center;
    background-color: var(--primary-color);
    border-style:none;
    /*border-right: 1px solid gray;*/
    font-size: 32px;
    color:black;
    

}

.search input {
    font-size: 16px;
    background-color: white;
    min-width: 178px;
    max-width: 178px;
    margin-left: 2px;
    padding-left: 2px;
}

/*при наведении на любой элемент в классе, меняю прозрачность*/
.search:hover *{
    opacity: 0.9;/*уменьшаю прозрачность*/
}

</style>
