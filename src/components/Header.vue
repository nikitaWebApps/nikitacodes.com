<script setup lang="ts">

import { ref, computed } from 'vue'
import { store } from '../langStore';
import { translation } from '../i18n/translations';


const props = defineProps<{
	currentLocale: 'en' | 'ru',
	currentPath: string
}>()
const pathname = ref(props.currentPath)

store.lang = props.currentLocale

const homepageUrl = computed(() => `/${selectedLanguage.value}`)
const selectedLanguage = ref(store.lang)

function changeSiteLanguage(event: Event) {
	let newLocation = ''
	const currentPath = window.location.pathname
	if (selectedLanguage.value == store.lang) {
		return
	}
	if (store.lang !== selectedLanguage.value) {
		newLocation = currentPath.replace(store.lang, selectedLanguage.value)
		store.lang = selectedLanguage.value
		window.location.assign(newLocation)
		return
	}
}

const resumeLink = `/${store.lang}/resume`
const portfolioLink = `/${store.lang}#cases__front-page`
</script>

<template>
	<header
		class="bg-white grid grid-rows-1 max-h-screen fixed w-full top-0 z-10 overflow-hidden border-b border-slate-200">
		<nav
			class="container max-w-screen-lg mx-auto py-2 px-4 md:px-8 flex flex-row justify-between items-center text-base">
			<div class="relative -left-3">
				<a :href="homepageUrl"
					aria-label="Home Page"
					class="transition duration-500 translate-x-0">
					<svg width="48" height="48"
						viewBox="0 0 48 48" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path class="fill-slate-900"
							:class="pathname == '/' ? 'fill-blue-600' : ''"
							d="M16.0003 33.3333H20.923V25.488H27.0777V33.3333H32.0003V21.3333L24.0003 15.2826L16.0003 21.3333V33.3333ZM14.667 34.6666V20.6666L24.0003 13.616L33.3337 20.6666V34.6666H25.7443V26.8213H22.2563V34.6666H14.667Z" />
					</svg>
				</a>
			</div>
			<div class="flex flex-row gap-2">
				<div class="flex flex-row items-center lg:gap-4 gap-2">
					<a
						class="text-sm md:text-base"
						:href="portfolioLink">{{ translation[store.lang].projects }}</a>
					<a
						class="text-sm md:text-base"
						:href="resumeLink">{{ translation[store.lang].resume }}</a>
					<select @change="changeSiteLanguage" v-model="selectedLanguage"
						class="border border-slate-300 rounded p-1 w-max">
						<option :value="store.lang">{{ store.lang == 'ru' ? 'RU' : 'EN' }}</option>
						<option :value="store.lang == 'en' ? 'ru' : 'en'">
							{{ store.lang == 'en' ? 'RU' : 'EN' }}</option>
					</select>
				</div>
			</div>
		</nav>
	</header>
</template>
