<template>
    <div >
        <slot v-for="(item) in Captions">
            <button class="toolbtn"
                :title="item.title"
                @click="setIconActive(item)"
            >{{item.icon}}</button> 
        </slot>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
            //передаю массив c объектами
            // [ {action:'DEL',  icon:'-', title:'Удалить группу'},
            Captions: { //названия Статусов (DEL, COPY, HIDE)
                type: Array,
                default: function(){
                    return []
                }
            },
            onClkToolBtn: {//Функция переданная из Родителя для вызова при клике на заголовок элемента TabSheet
                type: Function,//в параметре TabIndex в Родитель передаётся номер заголовка
                default: function(item) {console.log('default:onChangeIndex:',item)}
            }
    },
    data: function (){
        return {}
    },
    methods: {
        setIconActive(item) {
            console.log(item)
            this.onClkToolBtn(item)
        }
    }
}
</script>

<style scoped>
    .toolbtn {
        height: 32px;
        color: red;
        padding-left: 4px;   
    }
</style>
