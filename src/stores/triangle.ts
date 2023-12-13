import { ref } from 'vue'
import { defineStore } from 'pinia'
import { IsocelesTriangle } from '@/geometry'

export const useTriangleInfoStore = defineStore('triangle', () => {
    const saveTriangle = ref<IsocelesTriangle>(new IsocelesTriangle([[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]]));
    const triangle = ref<IsocelesTriangle>(new IsocelesTriangle([[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]]));
    const zoom = ref(1);
    const isNeedToSave = ref(false);

    function setZoom(newVal: number){
        zoom.value = newVal;
    }

    function setTriangle(newVal: IsocelesTriangle) {
        triangle.value = newVal;
        const newVerticesVal = newVal.vertices.map(innerArray => [...innerArray]);
        saveTriangle.value = new IsocelesTriangle(newVerticesVal);
    }

    function setIsNeedToSave(newVal: boolean) {
        isNeedToSave.value = newVal;
    }

    function getTriangle(): IsocelesTriangle {
        return triangle.value;
    }

    function getSaveTriangle(): IsocelesTriangle {
        return saveTriangle.value;
    }

    function getIsNeedToSave(): boolean {
        return isNeedToSave.value;
    }
    
    return { getTriangle, setTriangle, getSaveTriangle, setIsNeedToSave, getIsNeedToSave, setZoom}
})
