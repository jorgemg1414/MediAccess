import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCasesStore = defineStore('cases', () => {
  const cases = ref(JSON.parse(localStorage.getItem('salud-cases') || '[]'))

  const saveToStorage = () => {
    localStorage.setItem('salud-cases', JSON.stringify(cases.value))
  }

  const getSeverity = (painLevel) => {
    if (painLevel <= 3) return 'leve'
    if (painLevel <= 6) return 'moderado'
    return 'urgente'
  }

  const sortedCases = computed(() => {
    return [...cases.value].sort((a, b) => b.painLevel - a.painLevel)
  })

  const addCase = (caseData) => {
    const newCase = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      ...caseData,
      severity: getSeverity(caseData.painLevel),
      status: 'pending',
      notes: '',
      createdAt: new Date().toISOString()
    }
    cases.value.push(newCase)
    saveToStorage()
    return newCase
  }

  const updateCaseSeverity = (caseId, severity) => {
    const caseIndex = cases.value.findIndex(c => c.id === caseId)
    if (caseIndex !== -1) {
      cases.value[caseIndex].severity = severity
      saveToStorage()
    }
  }

  const updateCaseNotes = (caseId, notes) => {
    const caseIndex = cases.value.findIndex(c => c.id === caseId)
    if (caseIndex !== -1) {
      cases.value[caseIndex].notes = notes
      saveToStorage()
    }
  }

  const updateCaseStatus = (caseId, status) => {
    const caseIndex = cases.value.findIndex(c => c.id === caseId)
    if (caseIndex !== -1) {
      cases.value[caseIndex].status = status
      saveToStorage()
    }
  }

  const getCaseById = (caseId) => {
    return cases.value.find(c => c.id === caseId)
  }

  const getCasesByPhone = (phone) => {
    return cases.value
      .filter(c => c.phone === phone)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getCasesByFolio = (folio) => {
    return cases.value.filter(c => c.id.toLowerCase() === folio.toLowerCase())
  }

  return {
    cases,
    sortedCases,
    addCase,
    updateCaseSeverity,
    updateCaseNotes,
    updateCaseStatus,
    getCaseById,
    getCasesByPhone,
    getCasesByFolio,
    getSeverity
  }
})
