import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFractalsInfoStore = defineStore('fractalsInfo', () => {
    const iterations = ref(50)
    const zoom = ref(1);
    const hue = ref(0);
    const saveImage = ref(false);

    function setIterations(newVal: number) {
        iterations.value = newVal
    }

    function setZoom(newVal: number) {
        zoom.value = newVal
    }

    function setHue(newVal: number) {
        hue.value = newVal
    }

    function setSaveImage(newVal: boolean) {
        saveImage.value = newVal
    }

    return { iterations, setIterations, zoom, setZoom, hue, setHue, saveImage, setSaveImage }
})
