import { createRouter, createWebHistory } from 'vue-router'
import PatientView from '../views/PatientView.vue'
import DoctorView from '../views/DoctorView.vue'
import PatientProfile from '../views/PatientProfile.vue'

const routes = [
  {
    path: '/',
    name: 'patient',
    component: PatientView
  },
  {
    path: '/medico',
    name: 'doctor',
    component: DoctorView
  },
  {
    path: '/mi-perfil',
    name: 'patient-profile',
    component: PatientProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
