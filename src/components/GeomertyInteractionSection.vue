<script setup lang="ts">
import { ref } from 'vue'
import { IsocelesTriangle, type Matrix } from '@/geometry'
import { useTriangleInfoStore } from '@/stores/triangle';
import { toast } from 'vue3-toastify'

const store = useTriangleInfoStore()

const vertices = ref<Matrix>([
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1]
])

const baseA = ref([2, 3 ,1])
const baseB = ref([5, 4, 1])
const height = ref(3)

vertices.value = store.getTriangle().vertices.map((innerArray) => [...innerArray])
const zoom = ref(1)

function startTrasnformation() {
  store.getTriangle().scaleAndMirror(zoom.value,zoom.value);
}

function saveImage() {
  store.setIsNeedToSave(true)
}

const drawTriangle = () => {
  if (height.value <= 0) {
    alert('Please enter a valid height.')
    return
  }

  // Обчислення координат вершини трикутника
  const midpointBase = [
    (baseA.value[0] + baseB.value[0]) / 2,
    (baseA.value[1] + baseB.value[1]) / 2
  ]
  const direction = [baseB.value[0] - baseA.value[0], baseB.value[1] - baseA.value[1]]
  const perpendicular = [-direction[1], direction[0]] // Перпендикуляр до основи
  const length = Math.sqrt(perpendicular[0] ** 2 + perpendicular[1] ** 2)
  const unitPerpendicular = [perpendicular[0] / length, perpendicular[1] / length]
  const apex = [
    midpointBase[0] + unitPerpendicular[0] * height.value,
    midpointBase[1] + unitPerpendicular[1] * height.value
  ]

  console.log('Apex of Triangle:', apex)
  apex.push(1)
  const vertices = [baseA.value, baseB.value, apex]
  console.log('Vertices of Triangle:', vertices)
  store.setTriangle(new IsocelesTriangle(vertices))
  baseA.value = store.getTriangle().vertices[0].map((value) => value);
  baseB.value = store.getTriangle().vertices[1].map((value) => value);
}
</script>

<template>
  <div class="shapetransform-interaction-section">
    <div class="shapetransform-settings-form">
      <a class="shape-name">Isosceles Triangle</a>

      <div class="coordinates-section">
        <div>
          <label for="x_value_base_a" class="coordinate-label">Base A - X:</label>
          <input
            type="number"
            class="coordinate-input"
            id="x_value_base_a"
            v-model="baseA[0]"
            placeholder="0"
          />
        </div>
        <div>
          <label for="y_value_base_a" class="coordinate-label">Base A - Y:</label>
          <input
            type="number"
            class="coordinate-input"
            id="y_value_base_a"
            v-model="baseA[1]"
            placeholder="0"
          />
        </div>
      </div>

      <div class="coordinates-section">
        <div>
          <label for="x_value_base_b" class="coordinate-label">Base B - X:</label>
          <input
            type="number"
            class="coordinate-input"
            id="x_value_base_b"
            v-model="baseB[0]"
            placeholder="0"
          />
        </div>
        <div>
          <label for="y_value_base_b" class="coordinate-label">Base B - Y:</label>
          <input
            type="number"
            class="coordinate-input"
            id="y_value_base_b"
            v-model="baseB[1]"
            placeholder="0"
          />
        </div>
      </div>

      <div class="coordinates-section">
        <div>
          <label for="height_value" class="coordinate-label">Height:</label>
          <input
            type="number"
            class="coordinate-input"
            id="height_value"
            v-model="height"
            placeholder="0"
          />
        </div>
      </div>

      <button class="draw-button" id="draw-button" @click="drawTriangle">Draw Triangle</button>

      <div class="slider-container">
        <div class="slider-container-data">
          <a>Scale</a>
          <a>{{ zoom }}</a>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          v-model="zoom"
          class="slider"
          id="mySlider"
        />
      </div>

      <button class="start-button" id="start-button" @click="startTrasnformation">Start</button>
    </div>

    <button class="save-button" id="save-button" @click="saveImage">
      <i class="fa-solid fa-download"></i>Save image
    </button>
  </div>
</template>

<style scoped>
.shapetransform-interaction-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50%;
  background-color: rgba(123, 180, 57, 0);
}

/*blue div*/
.shapetransform-settings-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 85%;
  width: 100%;
  background-color: #bcdee4;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin-bottom: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

/*rectangle text*/
.shape-name {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

/*drop down list*/
.shapetransform-type-dropdown {
  width: 92%;
  height: 2.25rem;
  border-radius: 1rem;
  background-color: rgba(86, 86, 83, 0.5);
  color: #f4f4f4;
  font-size: 1.375rem;
  margin-bottom: 1rem;
  text-align: center;
}

.shapetransform-type-dropdown option {
  text-align: center;
  border-radius: 1rem;
}

/*coordinates-section*/
.coordinates-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  width: 92%;
  height: 20%;
}

.coordinates-pair-container {
  display: flex;
  flex-direction: row;
  width: 92%;
  height: 20%;
}

.move-coordinates {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 92%;
}

/*label*/
.coordinate-input {
  margin-left: 1rem;
  height: 2.25rem;
  width: 20%;
  border-radius: 1rem;
  text-align: center;
  appearance: textfield;
}

.readonly {
  background-color: lightgrey;
}

/*button to start move of shape*/
.start-button {
  width: 92%;
  border-radius: 1rem;
  background-color: rgb(86, 86, 83);
  color: #f4f4f4;
  height: 2.25rem;
  margin-top: 1rem;
}

/*button to save shape transform*/
.save-button {
  width: 100%;
  margin-top: auto;
  border-radius: 1rem;
  background-color: #ed7f1a;
  color: #f4f4f4;
  height: 2.25rem;
}

.draw-button {
  width: 92%;
  border-radius: 1rem;
  background-color: #ed7f1a;
  color: #f4f4f4;
  height: 2.25rem;
  margin-bottom: 0.75rem;
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
