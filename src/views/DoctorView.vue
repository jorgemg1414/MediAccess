<template>
  <div class="doctor-view">
    <header class="doctor-header">
      <div class="header-actions">
        <ThemeToggle />
        <router-link to="/" class="btn-home">🏠 Paciente</router-link>
      </div>
      <div class="header-side">
        <span class="side-icon">👨‍⚕️</span>
        <p class="side-title">Panel Médico</p>
        <p class="side-sub">Centro de Salud</p>
      </div>
      <img src="/logo.jpeg" alt="MediAccess" class="logo" />
      <div class="header-side right">
        <span class="side-icon">📍</span>
        <p class="side-title">Tepatitlán</p>
        <p class="side-sub">Jalisco, México</p>
      </div>
    </header>

    <main class="doctor-main">
      <div class="body-layout">
        <aside class="side-panel left-panel">
          <h3>Resumen</h3>
          <div class="stat-cards">
            <div class="stat-card urgent">
              <span class="stat-num">{{ urgentCount }}</span>
              <p class="stat-label">Urgentes</p>
            </div>
            <div class="stat-card moderate">
              <span class="stat-num">{{ moderateCount }}</span>
              <p class="stat-label">Moderados</p>
            </div>
            <div class="stat-card mild">
              <span class="stat-num">{{ mildCount }}</span>
              <p class="stat-label">Leves</p>
            </div>
          </div>
        </aside>

        <div class="cases-center">
          <CaseList
            v-if="!selectedCase"
            :cases="sortedCases"
            @select="selectCase"
          />
          <CaseDetail
            v-else
            :case-data="selectedCase"
            @close="selectedCase = null"
            @update="handleUpdate"
          />
        </div>

        <aside class="side-panel right-panel">
          <h3>Guía de severidad</h3>
          <div class="severity-guide">
            <div class="sev-item urgent">
              <span class="sev-dot"></span>
              <div>
                <p class="sev-title">Urgente</p>
                <p class="sev-desc">Atención inmediata requerida</p>
              </div>
            </div>
            <div class="sev-item moderate">
              <span class="sev-dot"></span>
              <div>
                <p class="sev-title">Moderado</p>
                <p class="sev-desc">Atender en las próximas horas</p>
              </div>
            </div>
            <div class="sev-item mild">
              <span class="sev-dot"></span>
              <div>
                <p class="sev-title">Leve</p>
                <p class="sev-desc">Puede esperar consulta regular</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCasesStore } from '../stores/cases'
import CaseList from '../components/doctor/CaseList.vue'
import CaseDetail from '../components/doctor/CaseDetail.vue'
import ThemeToggle from '../components/shared/ThemeToggle.vue'

const store = useCasesStore()

const sortedCases = computed(() => store.sortedCases)
const selectedCase = ref(null)

const urgentCount = computed(() => store.sortedCases.filter(c => c.severity === 'urgente').length)
const moderateCount = computed(() => store.sortedCases.filter(c => c.severity === 'moderado').length)
const mildCount = computed(() => store.sortedCases.filter(c => c.severity === 'leve').length)

const selectCase = (caseId) => {
  selectedCase.value = store.getCaseById(caseId)
}

const handleUpdate = (data) => {
  if (data.type === 'severity') {
    store.updateCaseSeverity(selectedCase.value.id, data.value)
  } else if (data.type === 'status') {
    store.updateCaseStatus(selectedCase.value.id, data.value)
  } else if (data.type === 'notes') {
    store.updateCaseNotes(selectedCase.value.id, data.value)
  }
  selectedCase.value = store.getCaseById(selectedCase.value.id)
}
</script>

<style scoped>
.doctor-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-tertiary);
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.doctor-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 28px 48px;
  background: linear-gradient(135deg, #ecfdf5 0%, #f8fafc 50%, #ecfdf5 100%);
  border-bottom: 3px solid #059669;
}

.logo {
  height: 130px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 16px rgba(5, 150, 105, 0.18));
  flex-shrink: 0;
}

.header-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 130px;
}

.header-side.right {
  align-items: flex-start;
}

.side-icon {
  font-size: 28px;
  line-height: 1;
}

.side-title {
  font-size: 16px;
  font-weight: 700;
  color: #065f46;
  margin: 0;
  letter-spacing: -0.3px;
}

.side-sub {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

@media (max-width: 560px) {
  .header-side { display: none; }
  .doctor-header { padding: 24px 20px; }
}

.btn-home {
  padding: 8px 14px;
  background: #059669;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 13px;
  transition: background 0.2s;
}

.btn-home:hover {
  background: #047857;
}

.doctor-main {
  flex: 1;
  padding: 24px 16px;
}

.body-layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}

.cases-center {
  min-width: 0;
}

.side-panel {
  position: sticky;
  top: 24px;
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.side-panel h3 {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin: 0 0 16px 0;
}

.stat-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-card {
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-card.urgent  { background: #fef2f2; }
.stat-card.moderate { background: #fef3c7; }
.stat-card.mild    { background: #d1fae5; }

.stat-num {
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
}

.stat-card.urgent  .stat-num { color: #ef4444; }
.stat-card.moderate .stat-num { color: #f59e0b; }
.stat-card.mild    .stat-num { color: #10b981; }

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0;
}

.severity-guide {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sev-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.sev-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 3px;
}

.sev-item.urgent  .sev-dot { background: #ef4444; }
.sev-item.moderate .sev-dot { background: #f59e0b; }
.sev-item.mild    .sev-dot { background: #10b981; }

.sev-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2px 0;
}

.sev-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 1000px) {
  .body-layout {
    grid-template-columns: 1fr;
  }
  .side-panel {
    display: none;
  }
}
</style>
