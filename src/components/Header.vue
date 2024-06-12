<script setup>

import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { currentSiteLanguage } from '../langStore';
import { useStore } from '@nanostores/vue';

const pathname = ref()
const scrollY = ref(0)
const isMobile = ref()

const props = defineProps(['currentLocale'])
currentSiteLanguage.set(props.currentLocale)

function isCurrentPath(object) {
	if (pathname.value) {
		return pathname.value == Object.values(object)[0]
	}
}

function setIsMobile() {
	if (window.innerWidth > 1024) {
		isMobile.value = false
	} else {
		isMobile.value = true
	}
}

const paths = computed(() =>
	[
		{
			resume: {
				en: 'Resume',
				ru: "Резюме",
				url: currentSiteLanguage.get() + '/resume'
			}
		},
		{
			potfolio: {
				en: 'Portfolio',
				ru: "Портфолио",
				url: currentSiteLanguage.get() + '/#cases__front-page',
			}
		},
	]
)
const $currentSiteLanguage = useStore(currentSiteLanguage)
function selectSiteLang() {
	if (currentSiteLanguage.get() == 'ru') {
		window.location.href = new String(window.location).replace('ru', 'en')
	} else {
		window.location.href = new String(window.location).replace('en', 'ru')
	}
}

onMounted(() => {
	pathname.value = window.location.pathname.replaceAll('/', '')
	scrollY.value = window.scrollY
	window.addEventListener('scroll', () => {
		scrollY.value = window.scrollY
	})
	setIsMobile()
	window.addEventListener('resize', () => {
		setIsMobile()
	})
});

</script>

<template>
	<header
		class="bg-white grid grid-rows-1 max-h-screen fixed w-full top-0 z-10 overflow-hidden py-2 px-4 md:px-8 border-b border-slate-200">
		<nav
			class="container max-w-screen-lg mx-auto h-12 flex flex-row justify-between items-center text-base">
			<div class="">
				<a :href="'/' + $currentSiteLanguage"
					aria-label="Home Page"
					class="transition duration-500 translate-x-0"><svg width="48" height="48"
						viewBox="0 0 48 48" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path class="fill-slate-900"
							:class="pathname == '/' ? 'fill-blue-600' : ''"
							d="M16.0003 33.3333H20.923V25.488H27.0777V33.3333H32.0003V21.3333L24.0003 15.2826L16.0003 21.3333V33.3333ZM14.667 34.6666V20.6666L24.0003 13.616L33.3337 20.6666V34.6666H25.7443V26.8213H22.2563V34.6666H14.667Z" />
					</svg>
				</a>
			</div>
			<div class="flex flex-row gap-4">
				<div class="flex flex-row items-center lg:gap-6 gap-4">
					<a :class="isCurrentPath(path) ? 'text-blue-600 font-medium' : ''" v-for="(path, index) in paths"
						:key="index"
						:href='"/" + Object.values(path)[0].url'>{{ $currentSiteLanguage == 'ru' ?
							Object.values(path)[0].ru : Object.values(path)[0].en }}</a>
				</div>
				<select @change="selectSiteLang()"
					class="border border-slate-300 rounded p-1 w-max">
					<option :value="$currentSiteLanguage">{{ $currentSiteLanguage == 'ru' ? '🇷🇺' : '🇺🇸' }}</option>
					<option :value="$currentSiteLanguage == 'ru' ? 'en' : 'ru'">
						{{ $currentSiteLanguage == 'ru' ? '🇺🇸' : '🇷🇺' }}</option>
				</select>
			</div>
		</nav>
	</header>
</template>
