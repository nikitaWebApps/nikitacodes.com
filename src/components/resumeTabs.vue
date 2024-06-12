<script setup>
import { onMounted, ref } from 'vue'
import { currentSiteLanguage } from '../langStore';
import { useStore } from '@nanostores/vue';

const $currentSiteLanguage = useStore(currentSiteLanguage)

const tabsRu = [
    'Опыт работы',
    'Навыки',
    'Образование',
    'Обо мне'
]

const tabsEng = [
    'Work Experience',
    'Skills',
    'Education',
    'About'
]

const screenWidth = ref()
onMounted(() => {
    if (currentSiteLanguage.get() == 'ru') {
        activeTab.value['Опыт работы'] = true
    } else {
        activeTab.value['Work Experience'] = true
    }
    screenWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
})

const activeTab = ref({})
function handleTabClick(tab, event) {
    activeTab.value = {}
    activeTab.value[tab] = true
    event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}


</script>

<template>
    <div v-if="$currentSiteLanguage == 'ru'" class="">
        <nav v-if="screenWidth < 1024"
            class='flex flex-row gap-3 px-4 sm:px-8 overflow-auto snap-x snap-proximity mb-6'>
            <button v-for="(tab, index) in tabsRu"
                :class="activeTab[tab] ? ['transition-colors duration-500 text-blue-600 border-blue-600 border-b-2'] : [' border-slate-500 text-slate-500']"
                :data-tab="index + 1"
                class="flex flex-row grow justify-center text-center text-nowrap py-2 px-2 text-lg snap-center transition-colors"
                role="button"
                @click="handleTabClick(tab, $event)"
                :key="tab">{{ tab }}</button>
        </nav>
        <div :class="screenWidth >= 1024 ? ['grid grid-cols-2 gap-x-8 gap-y-16'] : ''" class="px-4 sm:px-8">
            <slot v-if="activeTab['Опыт работы'] || screenWidth >= 1024" name="ru-work-exp-tab"> </slot>
            <slot v-if="activeTab['Навыки'] || screenWidth >= 1024" name="ru-skills-tab"> </slot>
            <slot v-if="activeTab['Образование'] || screenWidth >= 1024" name="ru-education-tab"> </slot>
            <slot v-if="activeTab['Обо мне'] || screenWidth >= 1024" name="ru-about-tab"> </slot>
        </div>
    </div>

    <div v-else class="">
        <nav v-if="screenWidth < 1024"
            class='flex flex-row gap-3 px-4 sm:px-8 overflow-auto snap-x snap-proximity mb-6'>
            <button v-for="(tab, index) in tabsEng"
                :class="activeTab[tab] ? ['transition-colors duration-500 text-blue-600 border-blue-600 border-b-2'] : [' border-slate-500 text-slate-500']"
                :data-tab="index + 1"
                class="flex flex-row grow justify-center text-center text-nowrap py-2 px-2 text-lg snap-center transition-colors"
                role="button"
                @click="handleTabClick(tab, $event)"
                :key="tab">{{ tab }}</button>
        </nav>
        <div :class="screenWidth >= 1024 ? ['grid grid-cols-2 gap-x-8 gap-y-16'] : ''" class="px-4 sm:px-8">
            <slot v-if="activeTab['Work Experience'] || screenWidth >= 1024" name="en-work-exp-tab"> </slot>
            <slot v-if="activeTab['Skills'] || screenWidth >= 1024" name="en-skills-tab"> </slot>
            <slot v-if="activeTab['Education'] || screenWidth >= 1024" name="en-education-tab"> </slot>
            <slot v-if="activeTab['About'] || screenWidth >= 1024" name="en-about-tab"> </slot>
        </div>
    </div>
</template>