import { reactive } from 'vue'

export const store = reactive<{
  lang: 'ru' | 'en'
}>({
  lang: 'ru',
})

