<template>
  <div class="patient-form">
    <form @submit.prevent="handleSubmit" v-if="!submitted">
      <div class="form-header">
        <span class="icon">🏥</span>
        <h1>Registro de atención médica</h1>
        <p>Complete sus datos para ser atendido</p>
      </div>

      <div class="form-group">
        <label for="name">Nombre completo *</label>
        <input 
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Ej: María García López"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="age">Edad *</label>
          <input 
            id="age"
            v-model.number="form.age"
            type="number"
            min="1"
            max="120"
            required
            placeholder="Ej: 65"
          />
        </div>

        <div class="form-group">
          <label for="sex">Sexo *</label>
          <select id="sex" v-model="form.sex" required>
            <option value="">Seleccionar</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="colony">Colonia *</label>
        <input 
          id="colony"
          v-model="form.colony"
          type="text"
          required
          placeholder="Ej: Cerrito de la Cruz"
        />
      </div>

      <div class="form-group">
        <label for="phone">Número de WhatsApp *</label>
        <input 
          id="phone"
          v-model="form.phone"
          type="tel"
          required
          placeholder="Ej: 3312345678"
        />
        <span class="hint">Sin el prefijo +52</span>
      </div>

      <div class="form-group">
        <label for="chronic">Enfermedades crónicas (opcional)</label>
        <input 
          id="chronic"
          v-model="form.chronicDiseases"
          type="text"
          placeholder="Ej: Diabetes, hipertensión"
        />
        <span class="hint">Separe con comas si hay varias</span>
      </div>

      <div class="form-group">
        <label for="symptoms">Síntomas actuales *</label>
        <textarea 
          id="symptoms"
          v-model="form.symptoms"
          required
          rows="3"
          placeholder="Describa los síntomas que presenta..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="symptomDuration">¿Desde cuándo presenta los síntomas?</label>
        <select id="symptomDuration" v-model="form.symptomDuration">
          <option value="horas">Algunas horas</option>
          <option value="dia">Un día</option>
          <option value="dias">2-3 días</option>
          <option value="semana">Una semana o más</option>
        </select>
      </div>

      <div class="form-group">
        <PainScale v-model="form.painLevel" />
      </div>

      <button type="submit" class="btn-submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Enviar caso' }}
      </button>
    </form>

    <PatientConfirmation v-else :case-data="submittedCase" @new-case="resetForm" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCasesStore } from '../../stores/cases'
import PainScale from '../shared/PainScale.vue'
import PatientConfirmation from './PatientConfirmation.vue'

const store = useCasesStore()

const form = reactive({
  name: '',
  age: null,
  sex: '',
  colony: '',
  phone: '',
  chronicDiseases: '',
  symptoms: '',
  symptomDuration: 'dia',
  painLevel: 1
})

const submitted = ref(false)
const isSubmitting = ref(false)
const submittedCase = ref(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  await new Promise(resolve => setTimeout(resolve, 800))
  
  submittedCase.value = store.addCase({ ...form })
  submitted.value = true
  isSubmitting.value = false
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    age: null,
    sex: '',
    colony: '',
    phone: '',
    chronicDiseases: '',
    symptoms: '',
    symptomDuration: 'dia',
    painLevel: 1
  })
  submitted.value = false
  submittedCase.value = null
}
</script>

<style scoped>
.patient-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header .icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.form-header h1 {
  font-size: 28px;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.form-header p {
  color: #6b7280;
  font-size: 16px;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

input, select, textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: 18px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  transition: border-color 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.hint {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

.btn-submit {
  width: 100%;
  padding: 18px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  input, select, textarea {
    font-size: 16px;
  }
}
</style>
