import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CMYKPoint, HSLPoint } from '@/types';

export const useColorsInfoStore = defineStore('colorsInfo', () => {
    const saturation = ref<number>(100);
    const hue = ref<number>(0);
    const hsl = ref<HSLPoint>({h: 0, s: 0, l: 0});
    const cmyk = ref<CMYKPoint>({cyan: 0, magenta: 0, yellow: 0, black: 0});

    function setSaturation(newVal: number) {
        if(newVal < 0) {
            newVal = 0
        }
        if(newVal > 100) {
            newVal = 100
        }
        saturation.value = newVal / 100
    }

    function setHue(newVal: number) {
        if(newVal < 0) {
            newVal = 0
        }
        if(newVal > 360) {
            newVal = 360
        }
        hue.value = newVal
    }

    function setHSL(newVal: HSLPoint) {
        hsl.value = newVal
    }

    function setCMYK(newVal: any) {
        cmyk.value = newVal
    }

    return { saturation, setSaturation, hue, setHue, hsl, cmyk, setHSL, setCMYK }
});