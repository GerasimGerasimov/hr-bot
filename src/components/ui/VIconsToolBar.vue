<template>
    <div >
        <slot v-for="(item) in Captions">
            <button class="toolbtn"
                :title="item.title"
                @click.stop="setIconActive(item)"
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
            onChangeIndex: {//Функция переданная из Родителя для вызова при клике на заголовок элемента TabSheet
                type: Function,//в параметре TabIndex в Родитель передаётся номер заголовка
                default: function(Index) {console.log('default:onChangeIndex:',Index)}
            }
    },
    data: function (){
        return {}
    },
    methods: {
        setIconActive(item) {
            this.onChangeIndex(item)
        }
    }
}
</script>

<style scoped>
    .toolbtn {
        width: 32px; 
        height: 32px;
        color: red;
        padding-left: 4px;   
    }
</style>
