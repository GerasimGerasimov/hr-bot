<template>
    <textarea
        ref="textarea"
        v-bind="$attrs"
        :style="{ height: TextAreaHeight }"
        v-model="Summary">
    </textarea>
</template>


<script>
export default {
    inheritAttrs: false,
    props: {
            text: { //содержимое
                type: String,
                default: function(){
                    return 'VAutoHeightTextArea.vue'
                }
            },
            onChangeText: {//Функция переданная из Родителя для вызова при изменении текста (если не readonly)
                type: Function,//в параметре value в Родитель передаётся содержимое textarea
                default: function(value) {console.log('default:onChangeText:',value)}
            }
    },
    data (){
        return {
            TextArea:{},
            TextAreaHeight: "auto"
        }
    },
    mounted(){
        //только после mounted открывается доступ к элементам HTML описанных в $refs
        //console.log('setTextAreaHeight:',this.$refs.textarea);
        this.TextArea = this.$refs.textarea;
        this.TextAreaHeight = this.TextArea.scrollHeight +"px"; 
    },
    watch: {
        Summary: function(){
            this.TextAreaHeight = "auto";//сначала ставлю высоту автоматическую
                                           //чтобы высота уменьшилась! если высота текста
                                           //уменьшилась
            //а потом, сделаю высоту такой какая требуется (вычисленная из scrollHeight)
            this.$nextTick(function() {
                this.TextAreaHeight = this.TextArea.scrollHeight +"px";
            })
        }
    },
    computed: {
        Summary:{
            get() {
                return this.text;
            },
            set() {}
        }
    }    
}
</script>

<style scoped>

</style>
