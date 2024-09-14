<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { currentSiteLanguage } from '../langStore';
import { useStore } from '@nanostores/vue';

const $currentSiteLanguage = useStore(currentSiteLanguage)

const tabs = {
    ru: [
        'Опыт работы',
        'Навыки',
        'Образование',
        'Обо мне'
    ],
    en: [
        'Work Experience',
        'Skills',
        'Education',
        'About'
    ]
}

const screenWidth = ref<number>(0)
onMounted(() => {
    activeTab.value[tabs[currentSiteLanguage.get()][0]] = true
    screenWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
})

const activeTab = ref<{ [key: string]: boolean }>({})

function handleTabClick(tabIndex: number, event: Event) {
    activeTab.value = {}
    activeTab.value[tabs[currentSiteLanguage.get()][tabIndex]] = true
    const targetElement = event.target as HTMLButtonElement
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}


</script>

<template>
    <nav v-if="screenWidth! < 1024"
        class='flex flex-row gap-3 overflow-auto snap-x snap-proximity mb-6'>
        <button v-for="(tab, index) in tabs[$currentSiteLanguage]"
            :class="activeTab[tab] ? ['transition-colors duration-500 text-blue-600 border-blue-600 border-b-2'] : [' border-slate-500 text-slate-500']"
            :data-tab="index + 1"
            class="flex flex-row grow justify-center text-center text-nowrap py-2 px-2 text-lg snap-center transition-colors"
            role="button"
            @click="handleTabClick(index, $event)"
            :key="tab">{{ tab }}</button>
    </nav>
    <div :class="screenWidth! >= 1024 ? ['grid grid-cols-2 gap-x-8 gap-y-16'] : ''">
        <slot v-if="activeTab[tabs[$currentSiteLanguage][0]] || screenWidth >= 1024" name="work-exp-tab"> </slot>
        <slot v-if="activeTab[tabs[$currentSiteLanguage][1]] || screenWidth >= 1024" name="skills-tab"> </slot>
        <slot v-if="activeTab[tabs[$currentSiteLanguage][2]] || screenWidth >= 1024" name="education-tab"> </slot>
        <slot v-if="activeTab[tabs[$currentSiteLanguage][3]] || screenWidth >= 1024" name="about-tab"> </slot>
    </div>
</template>