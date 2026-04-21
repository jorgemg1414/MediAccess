<template>
  <div class="case-detail">
    <button class="btn-back" @click="$emit('close')">
      ← Volver a la lista
    </button>

    <div class="detail-header">
      <div>
        <h1>{{ caseData.name }}</h1>
        <span class="folio">Folio: {{ caseData.id.toUpperCase() }}</span>
      </div>
      <SeverityBadge :severity="caseData.severity" />
    </div>

    <div class="detail-grid">
      <div class="info-card">
        <h3>Datos del paciente</h3>
        <div class="info-row">
          <span class="icon">📅</span>
          <span>{{ caseData.age }} años, {{ caseData.sex === 'F' ? 'Mujer' : 'Hombre' }}</span>
        </div>
        <div class="info-row">
          <span class="icon">📍</span>
          <span>{{ caseData.colony }}</span>
        </div>
        <div class="info-row">
          <span class="icon">📱</span>
          <a :href="`https://wa.me/52${caseData.phone}`" target="_blank">
            {{ caseData.phone }}
          </a>
        </div>
      </div>

      <div class="info-card">
        <h3>Estado de salud</h3>
        <div class="pain-display">
          <span class="pain-label">Nivel de dolor:</span>
          <span class="pain-value">{{ caseData.painLevel }}/10</span>
          <span class="pain-face">{{ getPainFace(caseData.painLevel) }}</span>
        </div>
        <div v-if="caseData.chronicDiseases" class="chronic">
          <span class="chronic-label">Enfermedades crónicas:</span>
          <span class="chronic-value">{{ caseData.chronicDiseases }}</span>
        </div>
        <div class="info-row">
          <span class="icon">⏱</span>
          <span>Síntomas desde: {{ durationLabels[caseData.symptomDuration] }}</span>
        </div>
      </div>

      <div class="info-card symptoms-card">
        <h3>Síntomas reportados</h3>
        <p class="symptoms-text">{{ caseData.symptoms }}</p>
      </div>
    </div>

    <div class="severity-section">
      <h3>Clasificación de gravedad</h3>
      <div class="severity-buttons">
        <button 
          v-for="s in severities" 
          :key="s.value"
          :class="['severity-btn', s.value, { active: caseData.severity === s.value }]"
          @click="updateSeverity(s.value)"
        >
          <span class="sev-icon">{{ s.icon }}</span>
          <span class="sev-label">{{ s.label }}</span>
          <span class="sev-desc">{{ s.desc }}</span>
        </button>
      </div>
    </div>

    <div class="actions-section">
      <ActionButtons 
        :severity="caseData.severity"
        :initial-notes="caseData.notes"
        :show-notes="true"
        @save-notes="saveNotes"
      />
    </div>

    <div class="status-section">
      <h3>Estado del caso</h3>
      <div class="status-buttons">
        <button 
          v-for="s in statusOptions" 
          :key="s.value"
          :class="['status-btn', { active: caseData.status === s.value }]"
          @click="updateStatus(s.value)"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div v-if="caseData.severity === 'urgente'" class="urgent-alert">
      <span class="alert-icon">🚨</span>
      <div class="alert-content">
        <strong>Caso urgente requiere atención inmediata</strong>
        <p>Contacte al paciente lo antes posible para coordinar atención presencial.</p>
        <a 
          :href="`https://wa.me/52${caseData.phone}?text=URGENTE: Necesitamos contactarlo para atenderle de inmediato.`"
          target="_blank"
          class="btn-urgent-contact"
        >
          📞 Contactar urgentemente por WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import SeverityBadge from '../shared/SeverityBadge.vue'
import ActionButtons from '../shared/ActionButtons.vue'

const props = defineProps({
  caseData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update'])

const severities = [
  { value: 'leve', icon: '✓', label: 'Leve', desc: 'Seguimiento normal' },
  { value: 'moderado', icon: '⚠', label: 'Moderado', desc: 'Requiere contacto' },
  { value: 'urgente', icon: '🚨', label: 'Urgente', desc: 'Atención inmediata' }
]

const statusOptions = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'reviewed', label: 'Revisado' },
  { value: 'contacted', label: 'Contactado' },
  { value: 'resolved', label: 'Atendido' }
]

const durationLabels = {
  horas: 'Algunas horas',
  dia: 'Un día',
  dias: '2-3 días',
  semana: 'Una semana o más'
}

const getPainFace = (level) => {
  if (level <= 2) return '😊'
  if (level <= 4) return '😐'
  if (level <= 6) return '😟'
  if (level <= 8) return '😣'
  return '😖'
}

const updateSeverity = (severity) => {
  emit('update', { type: 'severity', value: severity })
}

const updateStatus = (status) => {
  emit('update', { type: 'status', value: status })
}

const saveNotes = (notes) => {
  emit('update', { type: 'notes', value: notes })
}
</script>

<style scoped>
.case-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #4b5563;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn-back:hover {
  background: #e5e7eb;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.detail-header h1 {
  font-size: 28px;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.folio {
  font-size: 14px;
  color: #6b7280;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.info-card {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
}

.info-card h3 {
  font-size: 16px;
  color: #374151;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 15px;
  color: #4b5563;
}

.info-row .icon {
  font-size: 16px;
}

.info-row a {
  color: #3b82f6;
  text-decoration: none;
}

.info-row a:hover {
  text-decoration: underline;
}

.pain-display {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.pain-label {
  font-size: 14px;
  color: #6b7280;
}

.pain-value {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
}

.pain-face {
  font-size: 28px;
}

.chronic {
  background: #fef3c7;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.chronic-label {
  display: block;
  font-size: 12px;
  color: #92400e;
  margin-bottom: 4px;
}

.chronic-value {
  font-size: 14px;
  font-weight: 600;
  color: #78350f;
}

.symptoms-card {
  grid-column: 1 / -1;
}

.symptoms-text {
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
}

.severity-section, .actions-section, .status-section {
  margin-bottom: 24px;
}

.severity-section h3, .status-section h3 {
  font-size: 18px;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.severity-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.severity-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
  border: 3px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f3f4f6;
}

.severity-btn.leve { color: #065f46; }
.severity-btn.moderado { color: #92400e; }
.severity-btn.urgente { color: #991b1b; }

.severity-btn.active {
  border-color: currentColor;
}

.severity-btn.active.leve { background: #d1fae5; }
.severity-btn.active.moderado { background: #fef3c7; }
.severity-btn.active.urgente { background: #fee2e2; }

.sev-icon {
  font-size: 24px;
}

.sev-label {
  font-size: 16px;
  font-weight: 700;
}

.sev-desc {
  font-size: 11px;
  opacity: 0.8;
}

.status-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.status-btn {
  padding: 10px 20px;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.status-btn:hover {
  background: #e5e7eb;
}

.status-btn.active {
  background: #3b82f6;
  color: white;
}

.urgent-alert {
  display: flex;
  gap: 16px;
  background: #fef2f2;
  border: 2px solid #ef4444;
  border-radius: 12px;
  padding: 20px;
  animation: urgentPulse 2s infinite;
}

@keyframes urgentPulse {
  0%, 100% { border-color: #ef4444; }
  50% { border-color: #fca5a5; }
}

.alert-icon {
  font-size: 40px;
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.alert-content strong {
  display: block;
  font-size: 18px;
  color: #991b1b;
  margin-bottom: 8px;
}

.alert-content p {
  font-size: 14px;
  color: #7f1d1d;
  margin: 0 0 16px 0;
}

.btn-urgent-contact {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: #ef4444;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.btn-urgent-contact:hover {
  background: #dc2626;
}

@media (max-width: 600px) {
  .severity-buttons {
    grid-template-columns: 1fr;
  }
  
  .detail-header {
    flex-direction: column;
  }
}
</style>
