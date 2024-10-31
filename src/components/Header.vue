<script setup>

import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { currentSiteLanguage } from '../langStore';
import { useStore } from '@nanostores/vue';


const props = defineProps(['currentLocale'])
const pathname = ref()

const paths = [
	{
		resume: {
			en: 'Resume',
			ru: "Резюме",
			url: '/resume'
		}
	},
	{
		potfolio: {
			en: 'Portfolio',
			ru: "Портфолио",
			url: '/#cases__front-page',
		}
	},
]

const $currentSiteLanguage = useStore(currentSiteLanguage)
currentSiteLanguage.set(props.currentLocale)
const setLocaleUrl = (path) => {
	return $currentSiteLanguage.value == 'ru' ? path : '/en' + path
}

function selectSiteLang() {
	let newLocation
	if (currentSiteLanguage.get() == 'ru' && window.location.pathname.includes('cases/')) {
		newLocation = new String(window.location.pathname).replace('ru/', 'en/')
		currentSiteLanguage.set('en')
	} else if (currentSiteLanguage.get() == 'en' && window.location.pathname.includes('cases/')) {
		newLocation = new String(window.location.pathname).replace('en/', 'ru/')
		currentSiteLanguage.set('ru')
	} else if (currentSiteLanguage.get() == 'en') {
		newLocation = new String(window.location.pathname).replace('en/', '')
		currentSiteLanguage.set('ru')
	} else {
		newLocation = '/en' + window.location.pathname
		currentSiteLanguage.set('en')
	}
	window.location.assign(newLocation)
}

onMounted(() => {
	pathname.value = window.location.pathname.replaceAll('/en', '')
});

</script>

<template>
	<header
		class="bg-white grid grid-rows-1 max-h-screen fixed w-full top-0 z-10 overflow-hidden border-b border-slate-200">
		<nav
			class="container max-w-screen-lg mx-auto py-2 px-4 md:px-8 flex flex-row justify-between items-center text-base">
			<div class="relative -left-3">
				<a :href="setLocaleUrl('/')"
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
					<a v-for="(path, index) in paths"
						:key="index"
						class="text-sm md:text-base"
						:href="setLocaleUrl(Object.values(path)[0].url)">{{ $currentSiteLanguage == 'ru' ?
							Object.values(path)[0].ru : Object.values(path)[0].en }}</a>
				</div>
				<select @change="selectSiteLang()"
					class="border border-slate-300 rounded p-1 w-max">
					<option :value="$currentSiteLanguage">{{ $currentSiteLanguage == 'ru' ? 'RU' : 'EN' }}</option>
					<option :value="$currentSiteLanguage == 'en' ? 'ru' : 'en'">
						{{ $currentSiteLanguage == 'en' ? 'RU' : 'EN' }}</option>
				</select>
			</div>
		</nav>
	</header>
</template>
