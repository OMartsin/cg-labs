import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIteratiosStore = defineStore('iterations', () => {
  const iterations = ref(50)
  function setIterations(newVal: number) {
    iterations.value = newVal
  }

  return { iterations, setIterations }
})
