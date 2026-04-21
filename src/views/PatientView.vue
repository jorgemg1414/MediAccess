<template>
  <div class="patient-view">
    <header class="app-header">
      <ThemeToggle class="theme-toggle" />
      <div class="header-side">
        <span class="side-icon">🏥</span>
        <p class="side-title">Atención médica</p>
        <p class="side-sub">remota y accesible</p>
      </div>
      <img src="/logo.jpeg" alt="MediAccess" class="logo" />
      <div class="header-side right">
        <span class="side-icon">📍</span>
        <p class="side-title">Tepatitlán</p>
        <p class="side-sub">Jalisco, México</p>
      </div>
    </header>

    <main>
      <div class="body-layout">
        <aside class="side-panel left-panel">
          <h3>¿Cómo funciona?</h3>
          <div class="steps">
            <div class="step">
              <span class="step-num">1</span>
              <div>
                <p class="step-title">Llena el formulario</p>
                <p class="step-desc">Ingresa tus datos y describe tus síntomas</p>
              </div>
            </div>
            <div class="step">
              <span class="step-num">2</span>
              <div>
                <p class="step-title">Médico lo revisa</p>
                <p class="step-desc">Un profesional evalúa tu caso por prioridad</p>
              </div>
            </div>
            <div class="step">
              <span class="step-num">3</span>
              <div>
                <p class="step-title">Te contactamos</p>
                <p class="step-desc">Recibe orientación por WhatsApp</p>
              </div>
            </div>
          </div>
        </aside>

        <div class="form-center">
          <PatientForm />
        </div>

        <aside class="side-panel right-panel">
          <h3>Información</h3>
          <div class="info-cards">
            <div class="info-card">
              <span class="info-icon">✅</span>
              <p class="info-label">Servicio gratuito</p>
            </div>
            <div class="info-card">
              <span class="info-icon">⚡</span>
              <p class="info-label">Respuesta en menos de 24h</p>
            </div>
            <div class="info-card">
              <span class="info-icon">🔒</span>
              <p class="info-label">Datos confidenciales</p>
            </div>
            <div class="info-card">
              <span class="info-icon">📱</span>
              <p class="info-label">Atención por WhatsApp</p>
            </div>
          </div>
        </aside>
      </div>
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
  gap: 40px;
  padding: 32px 48px;
  background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #eff6ff 100%);
  border-bottom: 3px solid #3b82f6;
}

.logo {
  height: 140px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 16px rgba(59, 130, 246, 0.18));
  flex-shrink: 0;
}

.theme-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
}

.header-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 140px;
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
  color: #1e40af;
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
  .app-header { padding: 28px 20px; }
}

main {
  flex: 1;
  padding: 24px 16px;
}

.body-layout {
  display: grid;
  grid-template-columns: 220px 1fr 220px;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: start;
}

.form-center {
  min-width: 0;
}

.side-panel {
  position: sticky;
  top: 24px;
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border-color);
}

.side-panel h3 {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin: 0 0 16px 0;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.step-num {
  width: 28px;
  height: 28px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2px 0;
}

.step-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-primary);
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
}

.info-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.info-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .body-layout {
    grid-template-columns: 1fr;
  }
  .side-panel {
    display: none;
  }
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
