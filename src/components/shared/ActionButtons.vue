<template>
  <div class="action-buttons">
    <button 
      v-if="severity === 'leve'"
      class="btn btn-indications"
      @click="$emit('action', 'indications')"
    >
      <span class="icon">📋</span>
      Ver indicaciones
    </button>

    <button 
      v-if="severity === 'moderado'"
      class="btn btn-whatsapp"
      @click="$emit('action', 'whatsapp')"
    >
      <span class="icon">📞</span>
      Contactar por WhatsApp
    </button>

    <button 
      v-if="severity === 'urgente'"
      class="btn btn-urgent"
      @click="$emit('action', 'urgent')"
    >
      <span class="icon">🚨</span>
      Atención inmediata
    </button>

    <div v-if="showNotes" class="notes-section">
      <label for="notes">Notas e indicaciones:</label>
      <textarea 
        id="notes"
        v-model="localNotes"
        placeholder="Escribe las indicaciones para el paciente..."
        rows="4"
      ></textarea>
      <button class="btn btn-save" @click="saveNotes">
        Guardar indicaciones
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  severity: {
    type: String,
    required: true
  },
  initialNotes: {
    type: String,
    default: ''
  },
  showNotes: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['action', 'save-notes'])

const localNotes = ref(props.initialNotes)

watch(() => props.initialNotes, (newVal) => {
  localNotes.value = newVal
})

const saveNotes = () => {
  emit('save-notes', localNotes.value)
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn .icon {
  font-size: 24px;
}

.btn-indications {
  background: #10b981;
  color: white;
}

.btn-indications:hover {
  background: #059669;
}

.btn-whatsapp {
  background: #25d366;
  color: white;
}

.btn-whatsapp:hover {
  background: #1fb855;
}

.btn-urgent {
  background: #ef4444;
  color: white;
  animation: urgentPulse 1s infinite;
}

.btn-urgent:hover {
  background: #dc2626;
}

@keyframes urgentPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.notes-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.notes-section label {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.notes-section textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
}

.notes-section textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.btn-save {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
}

.btn-save:hover {
  background: #2563eb;
}
</style>
