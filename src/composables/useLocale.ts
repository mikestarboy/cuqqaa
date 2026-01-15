import { ref } from 'vue'
import type { Locale } from '../content/landing'

const stored = typeof window !== 'undefined' ? window.localStorage.getItem('cuqqaa-locale') : null
const locale = ref<Locale>(stored === 'tr' || stored === 'en' ? stored : 'en')

const setLocale = (next: Locale) => {
  locale.value = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('cuqqaa-locale', next)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = next
  }
}

export const useLocale = () => ({
  locale,
  setLocale,
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
}
