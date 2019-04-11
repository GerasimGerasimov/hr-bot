/*https://monsterlessons.com/project/lessons/peredaem-dannye-iz-child-v-parent-v-vue*/
<template>
    <div class="tabsheets">
        <slot v-for="(sheet, index) in Captions">
            <div class="tabsheet" :key="sheet"
                :class="{active:(tab==index), nonactive:(tab!=index)}"
                @click="setSheetActive(index)"
                >
                {{sheet}}
            </div>
            <div class="tabbreak" :key="index"></div>
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
            },
            onChangeTabIndex: {//Функция переданная из Родителя для вызова при клике на заголовок элемента TabSheet
                type: Function,//в параметре TabIndex в Родитель передаётся номер заголовка
                default: function(TabIndex) {console.log('default:onChangeTabIndex:',TabIndex)}
            }
    },
    data: function (){
        return {
            tab: this.value,//выбранная вкладка. беру начальное значение, потом его модифицирую
        }
    },
    methods: {
        setSheetActive(index) {
            this.tab = index
            this.onChangeTabIndex(this.tab)
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

.tabsheet {
    cursor: pointer;
    user-select: none;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 0px;
    margin-right: 0px;
}

.active  {
    border-top: 2px solid var(--warning-color);
    border-bottom: 1px solid transparent;
    background-color: var(--primary-color);
    color: #fff; /* цвет текста */
    opacity: 0.9;
}

.nonactive  {
    border: 1px solid var(--accent-color);
    opacity: 0.5;
}

.tabbreak {
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
