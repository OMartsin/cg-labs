<script setup lang="ts">

import { ref, watch } from 'vue';

const { updateZoomLevel, updateIterations, iterations, zoomLevel } = defineProps<{
  updateZoomLevel: (newZoomLevel: number) => void;
  zoomLevel: number;
  updateIterations: (newIterations: number) => void;
  iterations: number;
}>();

const tempZoomLevel = ref<number>(zoomLevel);
const tempIterations = ref<number>(iterations);

watch(tempZoomLevel, (newZoomLevel) => {
  updateZoomLevel(newZoomLevel);
});

watch(tempIterations, (newIterations) => {
  updateIterations(newIterations);
});



</script>

<template>
  <div class="fractal-interaction-section">
    <div class="fractal-settings-form">
      <select class="fractal-type-dropdown" id="fractal0-type-dropdown">
        <option value="Cut type">Cut type</option>
        <option value="Ch z">Ch z</option>
        <option value="sin z * cos z">sin z * cos z</option>
      </select>

      <div class="slider-container">
        <div class="slider-container-data">
          <a>Iterations</a>
          <a>{{ tempIterations }}</a>
        </div>
        <input v-model="tempIterations" type="range" min="0" max="100" class="slider" id="mySlider" />
      </div>
    </div>

    <div class="slider-container">
      <div class="slider-container-data">
        <a>Zoom</a>
        <a>{{ zoomLevel }}</a>
      </div>
      <input v-model="tempZoomLevel" type="range" min="1" max="5" class="slider" id="mySlider" />
    </div>
    <button class="save-button" id="save-button">
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
  -webkit-appearance: none;
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
