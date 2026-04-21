import { ref, watch, onMounted } from 'vue'

const theme = ref(localStorage.getItem('salud-theme') || 'light')

const applyTheme = (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('salud-theme', newTheme)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  applyTheme(theme.value)
})

watch(theme, (newVal) => {
  applyTheme(newVal)
})

export function useTheme() {
  return { theme, toggleTheme }
}
