<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '../langStore';

const props = defineProps<{
    currentLocale: 'ru' | 'en'
}>()

store.lang = props.currentLocale

const tabs = [
    {
        slug: 'about-tab',
        ru: 'Обо мне',
        en: 'About'
    },
    {
        slug: 'work-exp-tab',
        ru: 'Опыт работы',
        en: 'Work Experience'
    },
    {
        slug: 'skills-tab',
        ru: 'Навыки',
        en: 'Skills'
    },
    {
        slug: 'education-tab',
        ru: 'Образование',
        en: 'Education'
    }
]

const screenWidth = ref<number>(0)
const activeTab = ref<typeof tabs[0]>(tabs[0])
onMounted(() => {
    screenWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
})

function handleTabClick(tabToSelect: typeof tabs[0], event: Event) {
    activeTab.value = tabToSelect
    const targetElement = event.target as HTMLButtonElement
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}
</script>

<template>
    <div class="px-4 sm:px-8">
        <nav v-if="screenWidth! < 1024"
            class='flex flex-row gap-3 overflow-auto snap-x snap-proximity mb-8'>
            <button v-for="(tab, index) in tabs"
                :class="tab.slug == activeTab?.slug ? ['transition-colors duration-500 text-blue-600 border-blue-600 border-b-2'] : ['border-b-1  border-slate-500 text-slate-500']"
                :data-tab="index + 1"
                class="flex flex-row grow justify-center text-center text-nowrap py-2 px-2 snap-center transition-colors"
                role="button"
                @click="handleTabClick(tab, $event)"
                :key="tab.slug">{{ tab[store.lang!] }}</button>
        </nav>
        <div :class="screenWidth! >= 1024 ? 'grid grid-cols-2 gap-16' : ''">
            <div v-for="tab in tabs">
                <slot
                    v-if="activeTab[store.lang!] == tab[store.lang!] || screenWidth >= 1024"
                    :name="tab.slug"></slot>
            </div>
        </div>
    </div>
</template>