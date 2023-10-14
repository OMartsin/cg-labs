import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useZoomStore = defineStore('zoom', () => {
  const zoom = ref(0)
  function setZoomLevel(newVal: number) {
    zoom.value = newVal
  }

  return { zoom, setZoomLevel }
})
