<template>
  <div class="pain-scale">
    <div class="scale-header">
      <span class="label">Nivel de dolor</span>
      <span class="value">{{ modelValue }}</span>
    </div>
    <div class="faces">
      <button
        v-for="n in 10"
        :key="n"
        :class="['face-btn', { active: modelValue === n }]"
        @click="$emit('update:modelValue', n)"
        :aria-label="`Nivel ${n} de dolor`"
        :aria-pressed="modelValue === n"
      >
        {{ getFace(n) }}
      </button>
    </div>
    <div class="scale-labels">
      <span>Sin dolor</span>
      <span>Dolor máximo</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

defineEmits(['update:modelValue'])

const getFace = (level) => {
  if (level <= 2) return '😊'
  if (level <= 4) return '😐'
  if (level <= 6) return '😟'
  if (level <= 8) return '😣'
  return '😖'
}
</script>

<style scoped>
.pain-scale {
  background: #f3f4f6;
  padding: 20px;
  border-radius: 12px;
}

.scale-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.label {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
}

.faces {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  margin-bottom: 12px;
}

.face-btn {
  aspect-ratio: 1;
  font-size: 24px;
  border: 3px solid transparent;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  padding: 4px;
}

.face-btn:hover {
  transform: scale(1.1);
  background: #e5e7eb;
}

.face-btn.active {
  border-color: #3b82f6;
  background: #dbeafe;
  transform: scale(1.15);
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

@media (max-width: 600px) {
  .faces {
    grid-template-columns: repeat(5, 1fr);
  }
  
  .face-btn {
    font-size: 20px;
  }
}
</style>
