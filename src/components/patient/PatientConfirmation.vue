<template>
  <div class="confirmation">
    <div class="success-icon">✅</div>
    
    <h1>¡Caso enviado exitosamente!</h1>
    
    <div class="folio-box">
      <span class="folio-label">Número de folio</span>
      <span class="folio-number">{{ caseData.id.toUpperCase() }}</span>
    </div>

    <div class="info">
      <p>Su caso ha sido registrado y será revisado por un médico.</p>
      <p>Le contactaremos pronto según la gravedad de sus síntomas.</p>
    </div>

    <div class="severity-info" :class="`severity-${caseData.severity}`">
      <span class="severity-label">Clasificación detectada:</span>
      <SeverityBadge :severity="caseData.severity" />
    </div>

    <div class="next-steps">
      <h2>¿Qué sigue?</h2>
      <ul>
        <li v-if="caseData.severity === 'leve'">
          📋 Recibirá indicaciones por escrito en esta misma plataforma
        </li>
        <li v-if="caseData.severity === 'moderado'">
          📞 Un médico le contactará por WhatsApp para una llamada
        </li>
        <li v-if="caseData.severity === 'urgente'">
          🚨 Se le estará contactando de inmediato para atención prioritaria
        </li>
      </ul>
    </div>

    <button class="btn-new-case" @click="$emit('new-case')">
      Registrar otro caso
    </button>

    <router-link to="/mi-perfil" class="btn-profile">
      📋 Consultar mis casos
    </router-link>
  </div>
</template>

<script setup>
import SeverityBadge from '../shared/SeverityBadge.vue'

defineProps({
  caseData: {
    type: Object,
    required: true
  }
})

defineEmits(['new-case'])
</script>

<style scoped>
.confirmation {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.success-icon {
  font-size: 80px;
  margin-bottom: 24px;
  animation: bounce 0.6s ease-out;
}

@keyframes bounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

h1 {
  font-size: 28px;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.folio-box {
  background: var(--bg-secondary);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
}

.folio-label {
  display: block;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.folio-number {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 2px;
}

.info {
  margin-bottom: 24px;
}

.info p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 8px 0;
}

.severity-info {
  background: var(--bg-tertiary);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.severity-label {
  display: block;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.next-steps {
  text-align: left;
  background: var(--accent-color);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.next-steps h2 {
  font-size: 18px;
  color: var(--accent-color);
  margin: 0 0 12px 0;
}

.next-steps ul {
  margin: 0;
  padding-left: 20px;
}

.next-steps li {
  color: var(--text-primary);
  font-size: 15px;
  margin: 8px 0;
}

.btn-new-case {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: var(--accent-color);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 12px;
}

.btn-new-case:hover {
  background: var(--accent-hover);
}

.btn-profile {
  display: block;
  padding: 14px;
  font-size: 16px;
  color: var(--accent-color);
  text-decoration: none;
  border: 2px solid var(--accent-color);
  border-radius: 10px;
}

.btn-profile:hover {
  background: rgba(59, 130, 246, 0.1);
}
</style>
