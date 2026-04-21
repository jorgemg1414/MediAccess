<template>
  <div class="patient-profile">
    <header class="profile-header">
      <span class="logo">🏥</span>
      <h1>Salud Comunitaria Tepatitlán</h1>
      <ThemeToggle />
    </header>

    <main class="profile-main">
      <div class="search-section" v-if="!foundCases.length">
        <h2>📋 Consultar mis casos</h2>
        <p class="search-desc">Ingresa tu número de WhatsApp o folio para ver tus casos registrados</p>

        <div class="search-tabs">
          <button 
            :class="['tab-btn', { active: searchType === 'phone' }]"
            @click="searchType = 'phone'"
          >
            📱 Por WhatsApp
          </button>
          <button 
            :class="['tab-btn', { active: searchType === 'folio' }]"
            @click="searchType = 'folio'"
          >
            🔢 Por folio
          </button>
        </div>

        <div class="search-input" v-if="searchType === 'phone'">
          <label for="phone">Número de WhatsApp</label>
          <input 
            id="phone"
            v-model="searchPhone"
            type="tel"
            placeholder="Ej: 3312345678"
            @keyup.enter="searchByPhone"
          />
          <button class="btn-search" @click="searchByPhone">
            Buscar mis casos
          </button>
        </div>

        <div class="search-input" v-else>
          <label for="folio">Número de folio</label>
          <input 
            id="folio"
            v-model="searchFolio"
            type="text"
            placeholder="Ej: m1abc2def3"
            @keyup.enter="searchByFolio"
          />
          <button class="btn-search" @click="searchByFolio">
            Buscar caso
          </button>
        </div>

        <p v-if="searchError" class="error-msg">{{ searchError }}</p>
      </div>

      <div class="results-section" v-else>
        <div class="results-header">
          <button class="btn-back" @click="resetSearch">
            ← Nueva búsqueda
          </button>
          <h2>Mis casos encontrados</h2>
          <span class="count">{{ foundCases.length }} caso{{ foundCases.length !== 1 ? 's' : '' }}</span>
        </div>

        <div class="cases-list">
          <div 
            v-for="c in foundCases" 
            :key="c.id"
            :class="['case-card', `severity-${c.severity}`]"
          >
            <div class="case-top">
              <div>
                <span class="case-date">{{ formatDate(c.createdAt) }}</span>
                <span class="case-folio">Folio: {{ c.id.toUpperCase() }}</span>
              </div>
              <SeverityBadge :severity="c.severity" />
            </div>

            <div class="case-pain">
              <span class="pain-label">Dolor reportado:</span>
              <span class="pain-value">{{ c.painLevel }}/10 {{ getPainFace(c.painLevel) }}</span>
            </div>

            <div class="case-symptoms">
              <strong>Síntomas:</strong>
              <p>{{ c.symptoms }}</p>
            </div>

            <div v-if="c.notes" class="case-notes">
              <strong>📝 Indicaciones del médico:</strong>
              <p>{{ c.notes }}</p>
            </div>

            <div class="case-status">
              <span :class="['status-badge', `status-${c.status}`]">
                {{ statusLabels[c.status] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="profile-footer">
      <router-link to="/">Registrar nuevo caso</router-link>
      <span class="divider">|</span>
      <router-link to="/medico">Acceso médico</router-link>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCasesStore } from '../stores/cases'
import SeverityBadge from '../components/shared/SeverityBadge.vue'
import ThemeToggle from '../components/shared/ThemeToggle.vue'

const store = useCasesStore()

const searchType = ref('phone')
const searchPhone = ref('')
const searchFolio = ref('')
const foundCases = ref([])
const searchError = ref('')

const statusLabels = {
  pending: 'Pendiente de revisión',
  reviewed: 'En revisión',
  contacted: 'Médico te contactó',
  resolved: 'Caso atendido'
}

const searchByPhone = () => {
  searchError.value = ''
  if (!searchPhone.value.trim()) {
    searchError.value = 'Por favor ingresa tu número de WhatsApp'
    return
  }
  
  const results = store.getCasesByPhone(searchPhone.value.trim())
  if (results.length === 0) {
    searchError.value = 'No se encontraron casos con este número'
  }
  foundCases.value = results
}

const searchByFolio = () => {
  searchError.value = ''
  if (!searchFolio.value.trim()) {
    searchError.value = 'Por favor ingresa tu número de folio'
    return
  }
  
  const results = store.getCasesByFolio(searchFolio.value.trim())
  if (results.length === 0) {
    searchError.value = 'No se encontró ningún caso con este folio'
  }
  foundCases.value = results
}

const resetSearch = () => {
  foundCases.value = []
  searchPhone.value = ''
  searchFolio.value = ''
  searchError.value = ''
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPainFace = (level) => {
  if (level <= 2) return '😊'
  if (level <= 4) return '😐'
  if (level <= 6) return '😟'
  if (level <= 8) return '😣'
  return '😖'
}
</script>

<style scoped>
.patient-profile {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.logo {
  font-size: 36px;
}

.profile-header h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.profile-main {
  flex: 1;
  padding: 24px 16px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.search-section {
  text-align: center;
}

.search-section h2 {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.search-desc {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.search-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-btn {
  flex: 1;
  padding: 14px;
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 15px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--bg-primary);
  border-color: var(--accent-color);
  color: var(--accent-color);
  font-weight: 600;
}

.search-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: left;
}

.search-input input {
  padding: 16px;
  font-size: 18px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.search-input input:focus {
  border-color: var(--accent-color);
  outline: none;
}

.btn-search {
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-search:hover {
  transform: translateY(-2px);
}

.error-msg {
  color: #ef4444;
  font-size: 14px;
  margin-top: 16px;
}

.results-header {
  text-align: center;
  margin-bottom: 24px;
}

.btn-back {
  padding: 10px 16px;
  background: var(--bg-secondary);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  margin-bottom: 16px;
}

.results-header h2 {
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.count {
  background: var(--bg-secondary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-muted);
}

.cases-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid;
}

.case-card.severity-leve { border-left-color: #10b981; }
.case-card.severity-moderado { border-left-color: #f59e0b; }
.case-card.severity-urgente { border-left-color: #ef4444; }

.case-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.case-date {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
}

.case-folio {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.case-pain {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.pain-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.pain-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.case-symptoms {
  margin-bottom: 16px;
}

.case-symptoms strong {
  font-size: 14px;
  color: var(--text-secondary);
}

.case-symptoms p {
  font-size: 15px;
  color: var(--text-primary);
  margin-top: 4px;
  line-height: 1.5;
}

.case-notes {
  background: var(--success-bg);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.case-notes strong {
  font-size: 14px;
  color: var(--success-text);
}

.case-notes p {
  font-size: 15px;
  color: var(--text-primary);
  margin-top: 8px;
  line-height: 1.5;
}

.case-status {
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.status-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.status-pending {
  background: var(--warning-bg);
  color: var(--warning-text);
}

.status-reviewed {
  background: #dbeafe;
  color: #1e40af;
}

.status-contacted {
  background: var(--success-bg);
  color: var(--success-text);
}

.status-resolved {
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.profile-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--bg-secondary);
}

.profile-footer a {
  color: var(--text-muted);
  text-decoration: underline;
  font-size: 14px;
}

.divider {
  color: var(--text-muted);
}
</style>
