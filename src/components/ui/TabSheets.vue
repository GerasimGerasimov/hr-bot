/*https://monsterlessons.com/project/lessons/peredaem-dannye-iz-child-v-parent-v-vue*/
<template>
    <div class="tabsheets">
        <slot v-for="(sheet, index) in getSheets" >
            <div class="tabsheet"
                :class="{active:(tab==index), nonactive:(tab!=index)}"
                @click="setSheetActive(index)"
                >
                {{sheet.caption}}
            </div>
            <div class="tabbreak"></div>
        </slot>
        <div class="tabbreak flex-1"></div>
    </div>
</template>


<script>
export default {
    inheritAttrs: false,
    props: {
            Captions: { //названия вкладок
                type: Array,
                default: function(){
                    return []
                }
            },
            value: {//номер выбранной вкладки (по умолчанию)
                type: Number,
                default: 0
            }
    },
    data: function (){
        return {
            tab: this.value,//беру начальное значение, потом его можифицирую
            tabs: { 
                active: 0,
            }
        }
    },
    methods: {
        setSheetActive(index) {
            this.tab = index
            this.$emit('change-tab-index', this.tab)
        }
    },
    computed: {
        getSheets(){
            //return this.Captions
            let a=[];
            this.Captions.forEach((item,index)=>{
                console.log(item, index);
                let sheet = {}
                    sheet.caption = item;
                a.push(sheet);
            });
            console.log(a);
            return a;
        }
    }
}
</script>

<style scoped>

.tabsheets {
    display: flex;
    align-items: flex-end;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 0px;
    padding-bottom: 12px;
    line-height: 24px;
}

.tabsheets div.tabsheet {
    cursor: pointer;
    user-select: none;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 0px;
    margin-right: 0px;
}

.tabsheets .active  {
    border-top: 2px solid var(--warning-color);
    border-bottom: 1px solid transparent;
    background-color: var(--primary-color);
    color: #fff; /* цвет текста */
    opacity: 0.9;
}

.tabsheets .nonactive  {
    border: 1px solid var(--accent-color);
    opacity: 0.5;
}
.tabsheets div.tabbreak {
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

</style>
