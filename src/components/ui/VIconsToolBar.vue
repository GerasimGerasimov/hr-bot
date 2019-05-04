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
        font-family: 'FontAwesome';
        font-weight: 200;
        font-size: 24px;
        text-align: center; /*иначе иконка вращается по большому радиусу*/  
        height: 32px;
        width: 32px;
        padding: 2px;
        border: none;
        background: transparent;
        color: rgba(0, 0, 0, 0.5);
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5),
                     0   0   5px rgba(0,0,255,.5); 
    }
    .toolbtn:hover {
        background-color: var(--primary-color);
        opacity: 0.6;  
        color: white; 
        /*box-shadow: 0 2px 5px 0 rgba(0,0,0,1.0);*/
        text-shadow: 0 0 15px rgba(0,0,255,.5), 
                     0 0 10px rgba(0,0,255,.5);
    }
</style>
