<template>
  <div class="doctor-view">
    <header class="doctor-header">
      <div class="header-content">
        <div class="header-left">
          <img src="/logo.jpeg" alt="MediAccess" class="logo" />
          <div>
            <h1>Panel Médico</h1>
            <span class="subtitle">Centro de Salud Tepatitlán</span>
          </div>
        </div>
        <div class="header-actions">
          <ThemeToggle />
          <router-link to="/" class="btn-home">
            🏠 Paciente
          </router-link>
        </div>
      </div>
    </header>

    <main class="doctor-main">
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
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  padding: 16px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 44px;
  width: auto;
  object-fit: contain;
}

.header-left h1 {
  font-size: 20px;
  margin: 0;
}

.subtitle {
  font-size: 12px;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-home {
  padding: 10px 16px;
  background: rgba(255,255,255,0.2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-home:hover {
  background: rgba(255,255,255,0.3);
}

.doctor-main {
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .btn-home {
    flex: 1;
    text-align: center;
  }
}
</style>
