<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme"
    :aria-label="theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
    :title="theme === 'light' ? 'Modo oscuro' : 'Modo claro'"
  >
    <span class="icon">{{ theme === 'light' ? '🌙' : '☀️' }}</span>
  </button>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

[data-theme="dark"] .theme-toggle {
  background: rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.3);
}

.icon {
  font-size: 20px;
}
</style>
