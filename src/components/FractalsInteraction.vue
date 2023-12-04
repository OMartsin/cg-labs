<script setup lang="ts">
import { ref } from 'vue'

const { updateZoomLevel, updateIterations, iterations, zoomLevel, updateHue, 
  hue, setSaveImage, currentFractal, updateFractalType } =
  defineProps<{
    updateZoomLevel: (newZoomLevel: number) => void
    zoomLevel: number
    updateIterations: (newIterations: number) => void
    iterations: number
    updateHue: (newHue: number) => void
    hue: number
    setSaveImage: (newVal: boolean) => void
    currentFractal: string
    updateFractalType: (newVal: string) => void
  }>()

const zoomSliderRef = ref<HTMLInputElement | null>(null)
const iterationsSliderRef = ref<HTMLInputElement | null>(null)

const tempZoomLevel = ref<number>(zoomLevel)
const tempIterations = ref<number>(iterations)
const tempHue = ref<number>(hue)
const tempFractalType = ref<string>(currentFractal);

// const zoomVisible = ref<boolean>(true)

function setNewHUE() {
  updateHue(tempHue.value)
}

function setNewZoom() {
  updateZoomLevel(tempZoomLevel.value)
}

function setNewIterations() {
  updateIterations(tempIterations.value)
}

function setNewFractalType() {
  //zoomVisible.value = true
  tempZoomLevel.value = 1;
  updateZoomLevel(1);
  iterationsSliderRef.value!.max = "100"
  updateFractalType(tempFractalType.value)
  if(tempFractalType.value == "Ch z"){
    zoomSliderRef.value!.max = "100"
  }
  else if(tempFractalType.value == "sin z * cos z"){
    zoomSliderRef.value!.max = "1000"
  }
  else if(tempFractalType.value == "sin z"){
    zoomSliderRef.value!.max = "100"
  }
  else if(tempFractalType.value == "Cut type"){
    //zoomVisible.value = false
    zoomSliderRef.value!.max = "10"
    iterationsSliderRef.value!.max = "6"
    updateIterations(2)
    tempIterations.value = 2
  }
}

function handleKeyDownZoom(event: Event): void {
  const isKeyboardEvent = event instanceof KeyboardEvent
  console.log('Check if keyboard event')
  if (isKeyboardEvent) {
    console.log('isKeyboardEvent')
    setNewZoom()
  }
}
function handleKeyDownIterations(event: Event): void {
  const isKeyboardEvent = event instanceof KeyboardEvent
  console.log('Check if keyboard event')
  if (isKeyboardEvent) {
    console.log('isKeyboardEvent')
    setNewIterations()
  }
}

function handleKeyDownHue(event: Event): void {
  const isKeyboardEvent = event instanceof KeyboardEvent
  console.log('Check if keyboard event')
  if (isKeyboardEvent) {
    console.log('isKeyboardEvent')
    setNewHUE()
  }
}
</script>

<template>
  <div class="fractal-interaction-section">
    <div class="fractal-settings-form">
      <select class="fractal-type-dropdown" v-model="tempFractalType" v-on:change="setNewFractalType" id="fractal0-type-dropdown">
        <option value="Cut type">Cut type</option>
        <option value="Ch z">Ch z</option>
        <option value="sin z * cos z">sin z * cos z</option>
        <option value="sin z">sin z</option>
      </select>
      <div class="sliders-blue-group">
        <div class="slider-container">
          <div class="slider-container-data">
            <a>Iterations</a>
            <a>{{ tempIterations }}</a>
          </div>
          <input
            v-model="tempIterations"
            ref="iterationsSliderRef"
            v-on:mouseup="setNewIterations"
            @keyup="handleKeyDownIterations"
            type="range"
            min="0"
            max="100"
            class="slider"
            id="mySlider"
          />
        </div>

        <div class="slider-container">
          <div class="slider-container-data">
            <a>Hue</a>
            <a>{{ tempHue }}</a>
          </div>
          <input
            v-model="tempHue"
            v-on:mouseup="setNewHUE"
            @keyup="handleKeyDownHue"
            type="range"
            min="1"
            max="360"
            class="colored slider"
            id="mySlider"
          />
        </div>
      </div>
    </div>

    <div class="slider-container">
      <div class="slider-container-data">
        <a>Zoom</a>
        
      </div>
      <input
        v-model="tempZoomLevel"
        ref="zoomSliderRef"
        v-on:mouseup="setNewZoom"
        @keyup="handleKeyDownZoom"
        type="range"
        min="1"
        max="10"
        class="slider"
        id="mySlider"
      />
    </div>

    <button class="save-button" id="save-button" @click="setSaveImage(true)">
      <i class="fa-solid fa-download"></i>Save image
    </button>
  </div>
</template>

<style scoped>
.fractal-interaction-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 40%;
  background-color: rgba(123, 180, 57, 0);
}

/*blue div*/
.fractal-settings-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
  background-color: #bcdee4;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.sliders-blue-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 95%;
}

/*drop down list*/
.fractal-type-dropdown {
  width: 92%;
  height: 2.25rem;
  border-radius: 1rem;
  background-color: rgba(86, 86, 83, 0.5);
  color: #f4f4f4;
  font-size: 1.375rem;
  margin-bottom: 2rem;
  text-align: center;
}

.fractal-type-dropdown option {
  text-align: center;
  border-radius: 1rem;
}

/*button to save fractal*/
.save-button {
  width: 100%;
  margin-top: auto;
  border-radius: 1rem;
  background-color: #ed7f1a;
  color: #f4f4f4;
  height: 2.25rem;
}

/*slider*/
.slider-container {
  display: flex;
  flex-direction: column;
  width: 92%;
}

.slider {
  width: 80%;
}

#slider-value {
  margin-top: 0.625rem;
}

.slider {
  appearance: none;
  width: 100%;
  height: 0.5rem;
  border-radius: 0.313rem;
  background: #565653cd;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
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

/*text of slider*/
.slider-container-data {
  display: flex;
  justify-content: space-between;
}
</style>
