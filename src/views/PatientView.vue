<template>
  <div class="patient-view">
    <header class="app-header">
      <img src="/logo.jpeg" alt="MediAccess" class="logo" />
      <h1>Salud Comunitaria Tepatitlán</h1>
      <ThemeToggle />
    </header>
    
    <main>
      <PatientForm />
    </main>

    <footer class="app-footer">
      <router-link to="/mi-perfil">📋 Consultar mis casos</router-link>
      <span class="divider">|</span>
      <router-link to="/medico">Acceso médico</router-link>
    </footer>
  </div>
</template>

<script setup>
import PatientForm from '../components/patient/PatientForm.vue'
import ThemeToggle from '../components/shared/ThemeToggle.vue'
</script>

<style scoped>
.patient-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.logo {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.app-header h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

main {
  flex: 1;
  padding: 24px 16px;
}

.app-footer {
  padding: 20px;
  text-align: center;
  background: var(--bg-secondary);
}

.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.app-footer a {
  color: var(--text-muted);
  text-decoration: underline;
  font-size: 14px;
}

.divider {
  color: var(--text-muted);
}

@media (max-width: 480px) {
  .app-header h1 {
    font-size: 16px;
  }
}
</style>
