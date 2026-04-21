<template>
  <div class="patient-view">
    <header class="app-header">
      <ThemeToggle class="theme-toggle" />
      <img src="/logo.jpeg" alt="MediAccess" class="logo" />
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
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.app-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 20px;
  background: #f8fafc;
  border-bottom: 3px solid #3b82f6;
}

.logo {
  height: 140px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 16px rgba(59, 130, 246, 0.18));
}

.theme-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
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
