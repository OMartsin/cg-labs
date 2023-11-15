<script setup lang="ts">
import { useColorsInfoStore } from '@/stores/colorsinfo'
import { type CMYKPoint, type HSLPoint } from '@/types'
import { ref, watch } from 'vue'

const colorsinfo = useColorsInfoStore()

const saturationRef = ref(50)
const hueRef = ref(50)

const hsl = ref<HSLPoint>({ h: 0, s: 0, l: 0 })
const cmyk = ref<CMYKPoint>({ cyan: 0, magenta: 0, yellow: 0, black: 0 })

function handleKeyDownHue(event: Event): void {
  const isKeyboardEvent = event instanceof KeyboardEvent
  console.log('Check if keyboard event')
  if (isKeyboardEvent) {
    console.log('isKeyboardEvent')
    setNewHUE()
  }
}

function handleKeyDownSaturation(event: Event): void {
  const isKeyboardEvent = event instanceof KeyboardEvent
  console.log('Check if keyboard event')
  if (isKeyboardEvent) {
    console.log('isKeyboardEvent')
    setNewSaturation()
  }
}

function setNewHUE() {
  colorsinfo.setHue(hueRef.value)
}

function setNewSaturation() {
  colorsinfo.setSaturation(saturationRef.value)
}
watch(
  () => colorsinfo.hsl,
  (newHsl) => {
    hsl.value = newHsl
    hsl.value.h = Math.round(hsl.value.h)
    hsl.value.l *= 100
    hsl.value.s *= 100
    hsl.value.s = Math.round(hsl.value.s)
    hsl.value.l = Math.round(hsl.value.l)
  }
)
watch(
  () => colorsinfo.cmyk,
  (newCmyk) => {
    cmyk.value = newCmyk
  }
)

</script>

<template>
  <div class="image-interaction-section">
    <div class="hsl-settings-form">
      <h3>HSL</h3>
      <div class="slider-container">
        <div class="slider-container-data">
          <a>Hue</a>
          <a>{{ hsl.h }}</a>
        </div>
        <input
          v-model="hsl.h"
          type="range"
          min="0"
          max="360"
          class="slider colored"
          id="hue-value-slider"
          disabled
        />
        <div class="slider-container-data">
          <a>Saturation</a>
          <a>{{ hsl.s }}</a>
        </div>
        <input
          v-model="hsl.s"
          type="range"
          min="0"
          max="100"
          class="slider"
          id="saturation-value-slider"
          disabled
        />
        <div class="slider-container-data">
          <a>Lightness</a>
          <a>{{ hsl.l }}</a>
        </div>
        <input
          v-model="hsl.l"
          type="range"
          min="0"
          max="100"
          class="slider"
          id="lightness-value-slider"
          disabled
        />
      </div>
    </div>

    <div class="cmyk-settings-form">
      <h3>CMYK</h3>
      <div class="slider-container">
        <div class="slider-container-data">
          <a>Cayn</a>
          <a>{{cmyk.cyan}}</a>
        </div>
        <input v-model="cmyk.cyan" type="range" min="0" max="100" class="slider cyan" id="cyan-value-slider" disabled/>
        <div class="slider-container-data">
          <a>Magenta</a>
          <a>{{ cmyk.magenta }}</a>
        </div>
        <input v-model="cmyk.magenta" type="range" min="0" max="100" class="slider magenta" id="magenta-value-slider" disabled/>
        <div class="slider-container-data">
          <a>Yellow</a>
          <a>{{cmyk.yellow}}</a>
        </div>
        <input v-model="cmyk.yellow" type="range" min="0" max="100" class="slider yellow" id="yellow-value-slider" disabled/>
        <div class="slider-container-data">
          <a>Black</a>
          <a>{{cmyk.black}}</a>
        </div>
        <input v-model="cmyk.black" type="range" min="0" max="100" class="slider black" id="black-value-slider" disabled/>
      </div>
    </div>

    <div class="saturation-settings-form">
      <h3>Saturation</h3>
      <div class="slider-container">
        <div class="slider-container-data">
          <a>Hue</a>
          <a>{{ hueRef }}</a>
        </div>
        <input
          v-model="hueRef"
          v-on:mouseup="setNewHUE"
          @keyup="handleKeyDownHue"
          type="range"
          min="0"
          max="360"
          class="colored slider"
          id="hue-value-slider"
        />
      </div>
      <div class="slider-container">
        <div class="slider-container-data">
          <a>Saturation</a>
          <a>{{ saturationRef }}</a>
        </div>
        <input
          v-model="saturationRef"
          v-on:mouseup="setNewSaturation"
          @keyup="handleKeyDownSaturation"
          type="range"
          min="1"
          max="100"
          class="slider"
          id="saturation-value-slider"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-interaction-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 25%;
  background-color: rgba(181, 199, 65, 0);
}

.black{
  background-image: linear-gradient(
    to right,
    white,
    gray,
    black
  ) !important;
}

.cyan{
  background-image: linear-gradient(
    to right,
    white,
    cyan
  ) !important;
}

.magenta{
  background-image: linear-gradient(
    to right,
    white,
    magenta
  ) !important;
}

.yellow{
  background-image: linear-gradient(
    to right,
    white,
    yellow
  ) !important;
}
.hsl-settings-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #bcdee4;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

.cmyk-settings-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #bcdee4;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
}

.saturation-settings-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #bcdee4;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  padding-bottom: 1.25rem;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
}

.slider-container-data {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

/*slider*/
.slider-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 92%;
}

.slider {
  width: 80%;
}

#slider-value {
  margin-top: 0.625rem;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 0.375rem;
  border-radius: 0.313rem;
  background: #72858fcd;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.875rem;
  height: 0.875rem;
  background: #f4f4f4;
  border-radius: 50%;
  cursor: pointer;
  border: 0.125rem solid rgba(15, 3, 3, 0.549);
}

.slider::-webkit-slider-thumb:hover {
  background: #45a049;
}

.slider::-webkit-slider-thumb::before {
  content: attr(value);
  position: absolute;
  bottom: -1.563rem;
  left: 50%;
  transform: translateX(-50%);
  background: #4caf50;
  padding: 0.313rem;
  border-radius: 0.313rem;
  color: white;
}
</style>
