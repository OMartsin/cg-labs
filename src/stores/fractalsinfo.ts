import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFractalsInfoStore = defineStore('fractalsInfo', () => {
    const iterations = ref(50)
    const zoom = ref(1);
    const hue = ref(0);
    const currentFractal = ref('Ch z');
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

    function setCurrentFractal(newVal: string) {
        currentFractal.value = newVal
    }   

    return { iterations, setIterations, zoom, setZoom, hue, 
        setHue, saveImage, setSaveImage, currentFractal, setCurrentFractal }
})
