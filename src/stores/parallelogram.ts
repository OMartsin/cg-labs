import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Parallelogram } from '@/geometry'

export const useRectangleInfoStore = defineStore('rectangle', () => {
    const saveRectangle = ref<Parallelogram>(new Parallelogram([[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]]));
    const rectangle = ref<Parallelogram>(new Parallelogram([[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]]));
    const rotate = ref(0);
    const zoom = ref(1);
    const x = ref(0);
    const y = ref(0);
    const isDrawing = ref(false);
    const isNeedToSave = ref(false);

    function setZoom(newVal: number){
        zoom.value = newVal;
    }

    function setRotate(newVal: number){
        rotate.value = newVal;
    }

    function setX(newVal: number){
        x.value = newVal;
    }

    function setY(newVal: number){
        y.value = newVal;
    }

    function setRectangle(newVal: Parallelogram) {
        rectangle.value = newVal;
        const newVerticesVal = newVal.vertices.map(innerArray => [...innerArray]);
        saveRectangle.value = new Parallelogram(newVerticesVal);
    }

    function setIsDrawing(newVal: boolean) {
        isDrawing.value = newVal;
    }
    
    function setIsNeedToSave(newVal: boolean) {
        isNeedToSave.value = newVal;
    }

    function getZoom() : number{
        return zoom.value;
    }

    function getRotate() : number {
        return rotate.value;
    }

    function getX() : number {
        return x.value;
    }

    function getY() : number {
        return y.value;
    }

    function getParalelogram(): Parallelogram {
        return rectangle.value;
    }

    function getSaveParalelogram(): Parallelogram {
        return saveRectangle.value;
    }

    function getIsDrawing(): boolean {
        return isDrawing.value;
    }

    function getIsNeedToSave(): boolean {
        return isNeedToSave.value;
    }
    
    return { rectangle, setZoom, setRotate, setRectangle, setIsNeedToSave, setX, setY,
        getZoom, getRotate, getX, getY, getParalelogram, getSaveParalelogram, setIsDrawing, getIsDrawing, getIsNeedToSave }
})
