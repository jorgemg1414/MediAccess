<template>
  <span :class="['severity-badge', `severity-${severity}`]">
    <span class="icon">{{ icons[severity] }}</span>
    {{ labels[severity] }}
  </span>
</template>

<script setup>
defineProps({
  severity: {
    type: String,
    required: true,
    validator: (v) => ['leve', 'moderado', 'urgente'].includes(v)
  }
})

const labels = {
  leve: 'Leve',
  moderado: 'Moderado',
  urgente: 'Urgente'
}

const icons = {
  leve: '✓',
  moderado: '⚠',
  urgente: '🚨'
}
</script>

<style scoped>
.severity-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  animation: popIn 0.4s ease both;
  transition: transform 0.2s;
}

.severity-badge:hover {
  transform: scale(1.05);
}

.severity-leve {
  background: #d1fae5;
  color: #065f46;
}

.severity-moderado {
  background: #fef3c7;
  color: #92400e;
}

.severity-urgente {
  background: #fee2e2;
  color: #991b1b;
  animation: pulse 1.5s infinite;
}

.icon {
  font-size: 16px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
