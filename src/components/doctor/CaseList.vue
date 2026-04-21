<template>
  <div class="case-list">
    <div class="list-header">
      <h1>Pacientes registrados</h1>
      <span class="count">{{ cases.length }} caso{{ cases.length !== 1 ? 's' : '' }}</span>
    </div>

    <div class="filters">
      <button 
        v-for="f in filters" 
        :key="f.value"
        :class="['filter-btn', { active: activeFilter === f.value }]"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
        <span class="badge">{{ getCount(f.value) }}</span>
      </button>
    </div>

    <div v-if="filteredCases.length === 0" class="empty-state">
      <span class="empty-icon">📋</span>
      <p>No hay casos en esta categoría</p>
    </div>

    <div class="cases-grid">
      <div 
        v-for="c in filteredCases" 
        :key="c.id"
        :class="['case-card', `severity-${c.severity}`, { urgent: c.severity === 'urgente' }]"
        @click="$emit('select', c.id)"
      >
        <div class="case-header">
          <span class="patient-name">{{ c.name }}</span>
          <SeverityBadge :severity="c.severity" />
        </div>
        
        <div class="case-info">
          <span class="info-item">
            <span class="icon">📅</span>
            {{ formatAge(c) }}
          </span>
          <span class="info-item">
            <span class="icon">📍</span>
            {{ c.colony }}
          </span>
        </div>

        <div class="case-pain">
          <span class="pain-label">Dolor:</span>
          <span class="pain-value">{{ c.painLevel }}/10</span>
          <span class="pain-face">{{ getPainFace(c.painLevel) }}</span>
        </div>

        <p class="case-symptoms">{{ truncate(c.symptoms, 80) }}</p>

        <div class="case-footer">
          <span class="time">{{ formatTime(c.createdAt) }}</span>
          <span :class="['status', `status-${c.status}`]">
            {{ statusLabels[c.status] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SeverityBadge from '../shared/SeverityBadge.vue'

const props = defineProps({
  cases: {
    type: Array,
    required: true
  }
})

defineEmits(['select'])

const activeFilter = ref('all')

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Urgentes', value: 'urgente' },
  { label: 'Moderados', value: 'moderado' },
  { label: 'Leves', value: 'leve' }
]

const statusLabels = {
  pending: 'Pendiente',
  reviewed: 'Revisado',
  contacted: 'Contactado',
  resolved: 'Atendido'
}

const filteredCases = computed(() => {
  if (activeFilter.value === 'all') return props.cases
  return props.cases.filter(c => c.severity === activeFilter.value)
})

const getCount = (filter) => {
  if (filter === 'all') return props.cases.length
  return props.cases.filter(c => c.severity === filter).length
}

const formatAge = (c) => `${c.age} años, ${c.sex === 'F' ? 'Mujer' : 'Hombre'}`

const formatTime = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - date) / 60000)
  
  if (diff < 1) return 'Ahora'
  if (diff < 60) return `Hace ${diff} min`
  if (diff < 1440) return `Hace ${Math.floor(diff / 60)}h`
  return date.toLocaleDateString('es-MX')
}

const getPainFace = (level) => {
  if (level <= 2) return '😊'
  if (level <= 4) return '😐'
  if (level <= 6) return '😟'
  if (level <= 8) return '😣'
  return '😖'
}

const truncate = (text, len) => {
  if (text.length <= len) return text
  return text.substring(0, len) + '...'
}
</script>

<style scoped>
.case-list {
  padding: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.list-header h1 {
  font-size: 24px;
  color: #1f2937;
  margin: 0;
}

.count {
  background: #e5e7eb;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #4b5563;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
  animation: popIn 0.35s ease both;
}

.filter-btn:nth-child(1) { animation-delay: 0.05s; }
.filter-btn:nth-child(2) { animation-delay: 0.12s; }
.filter-btn:nth-child(3) { animation-delay: 0.19s; }
.filter-btn:nth-child(4) { animation-delay: 0.26s; }

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59,130,246,0.35);
}

.filter-btn .badge {
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.filter-btn.active .badge {
  background: rgba(255,255,255,0.2);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.cases-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.25s ease;
  border-left: 4px solid transparent;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  animation: slideInUp 0.4s ease both;
}

.case-card:nth-child(1) { animation-delay: 0.05s; }
.case-card:nth-child(2) { animation-delay: 0.12s; }
.case-card:nth-child(3) { animation-delay: 0.19s; }
.case-card:nth-child(4) { animation-delay: 0.26s; }
.case-card:nth-child(5) { animation-delay: 0.33s; }
.case-card:nth-child(n+6) { animation-delay: 0.4s; }

.case-card:hover {
  transform: translateX(4px) translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.case-card.severity-leve {
  border-left-color: #10b981;
}

.case-card.severity-moderado {
  border-left-color: #f59e0b;
}

.case-card.severity-urgente {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.case-card.urgent {
  animation: urgentGlow 2s infinite;
}

@keyframes urgentGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.patient-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.case-info {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6b7280;
}

.info-item .icon {
  font-size: 14px;
}

.case-pain {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.pain-label {
  color: #6b7280;
}

.pain-value {
  font-weight: 600;
  color: #1f2937;
}

.pain-face {
  font-size: 20px;
}

.case-symptoms {
  font-size: 14px;
  color: #4b5563;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.case-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.time {
  font-size: 12px;
  color: #9ca3af;
}

.status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-reviewed {
  background: #dbeafe;
  color: #1e40af;
}

.status-contacted {
  background: #d1fae5;
  color: #065f46;
}

.status-resolved {
  background: #e5e7eb;
  color: #374151;
}
</style>
