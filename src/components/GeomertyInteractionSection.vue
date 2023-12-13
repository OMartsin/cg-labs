<script setup lang="ts">
import { ref } from 'vue'
import { Parallelogram, type Matrix } from '@/geometry'
import { useRectangleInfoStore } from '@/stores/parallelogram'
import { toast } from 'vue3-toastify'

const store = useRectangleInfoStore()

const vertices = ref<Matrix>([
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1]
])

vertices.value = store.getParalelogram().vertices.map((innerArray) => [...innerArray])
const rotation = ref(0)
const zoom = ref(1)
const xMoveVal = ref(0)
const yMoveVal = ref(0)
const zoomChecked = ref(false)
const rotateChecked = ref(false)
const moveChecked = ref(false)

const updatePoints = () => {
  const A = [+vertices.value[0][0], +vertices.value[0][1], 1]
  const B = [+vertices.value[1][0], +vertices.value[1][1], 1]
  const C = [+vertices.value[2][0], +vertices.value[2][1], 1]
  const D = calculateFourthPoint([A, B, C])
  vertices.value = [A, B, C, D]
  if (isParallelogram(vertices.value) === false) {
    toast.error('Please enter another coordinates', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    return
  }
  store.setRectangle(new Parallelogram(vertices.value))
  vertices.value = store.getParalelogram().vertices.map((innerArray) => [...innerArray])
}

const isParallelogram = (vertices: Matrix) => {
  const A = vertices[0]
  const B = vertices[1]
  const C = vertices[2]
  const D = vertices[3]

  const AB = [B[0] - A[0], B[1] - A[1]]
  const BC = [C[0] - B[0], C[1] - B[1]]
  const CD = [D[0] - C[0], D[1] - C[1]]
  const DA = [A[0] - D[0], A[1] - D[1]]

  const sidesEqual = (vec1: number[], vec2: number[]) =>
    Math.sqrt(vec1[0] ** 2 + vec1[1] ** 2) === Math.sqrt(vec2[0] ** 2 + vec2[1] ** 2)
  if (!sidesEqual(AB, CD) || !sidesEqual(BC, DA)) {
    return false
  }

  const areParallel = (vec1: number[], vec2: number[]) =>
    vec1[0] * vec2[1] - vec1[1] * vec2[0] === 0
  if (!areParallel(AB, CD) || !areParallel(BC, DA)) {
    return false
  }

  const angleBetweenLines = (vec1: number[], vec2: number[]) => {
    const dotProduct = vec1[0] * vec2[0] + vec1[1] * vec2[1]
    const magnitudeProduct =
      Math.sqrt(vec1[0] ** 2 + vec1[1] ** 2) * Math.sqrt(vec2[0] ** 2 + vec2[1] ** 2)
    const cosTheta = dotProduct / magnitudeProduct
    return Math.acos(cosTheta) * (180 / Math.PI)
  }

  const angle1 = angleBetweenLines(AB, BC)
  const angle2 = angleBetweenLines(BC, CD)
  const angle3 = angleBetweenLines(CD, DA)
  const angle4 = angleBetweenLines(DA, AB)
  console.log(angle1, angle2, angle3, angle4)

  if (
    (angle1 > 179 && angle1 < 181) ||
    (angle2 > 179 && angle2 < 181) ||
    (angle3 > 179 && angle3 < 181) ||
    (angle4 > 179 && angle4 < 181) || 
    Number.isNaN(angle1) || Number.isNaN(angle2) || Number.isNaN(angle3) || Number.isNaN(angle4) ) {
    return false
  }

  return true
}

function startTrasnformation() {
  if (store.getIsDrawing() === false) {
    store.setIsDrawing(true)
    const center = store.getParalelogram().getCenter()
    store.setRotate(rotateChecked.value ? rotation.value : 0)
    store.setZoom(zoomChecked.value ? zoom.value : 1)
    store.setX(moveChecked.value ? xMoveVal.value : center[0])
    store.setY(moveChecked.value ? yMoveVal.value : center[1])
  } else {
    toast.error('Please wait until the previous movement ends', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}

function calculateFourthPoint(vertices: Matrix) {
  const A = vertices[0]
  const B = vertices[1]
  const C = vertices[2]

  console.log(A, B, C)

  const D = [+A[0] + +C[0] - B[0], +A[1] + +C[1] - B[1], 1]
  return D
}

function saveImage() {
  store.setIsNeedToSave(true)
}
</script>

<template>
  <div class="shapetransform-interaction-section">
    <div class="shapetransform-settings-form">
      <a class="shape-name">Parallelogram</a>
      <div class="coordinates-pair-container">
        <div class="coordinates-section">
          <div>
            <label for="x_value" class="coordinate-label">X:</label>
            <input
              type="number"
              class="coordinate-input"
              id="x_value"
              v-model="vertices[0][0]"
              placeholder="0"
            />
          </div>
          <div>
            <label for="y_value" class="coordinate-label">Y:</label>
            <input
              type="number"
              class="coordinate-input"
              id="y_value"
              v-model="vertices[0][1]"
              placeholder="0"
            />
          </div>
        </div>
        <div class="coordinates-section">
          <div>
            <label for="x_value" class="coordinate-label">X:</label>
            <input
              type="number"
              class="coordinate-input"
              id="x_value"
              v-model="vertices[1][0]"
              placeholder="0"
            />
          </div>
          <div>
            <label for="y_value" class="coordinate-label">Y:</label>
            <input
              type="number"
              class="coordinate-input"
              id="y_value"
              v-model="vertices[1][1]"
              placeholder="0"
            />
          </div>
        </div>
      </div>
      <div class="coordinates-pair-container">
        <div class="coordinates-section">
          <div>
            <label for="x_value" class="coordinate-label">X:</label>
            <input
              type="number"
              class="coordinate-input"
              id="x_value"
              v-model="vertices[2][0]"
              placeholder="0"
            />
          </div>
          <div>
            <label for="y_value" class="coordinate-label">Y:</label>
            <input
              type="number"
              class="coordinate-input"
              id="y_value"
              v-model="vertices[2][1]"
              placeholder="0"
            />
          </div>
        </div>
        <div class="coordinates-section">
          <div>
            <label for="x_value" class="coordinate-label">X:</label>
            <input
              type="number"
              class="coordinate-input readonly"
              id="x_value"
              v-model="vertices[3][0]"
              placeholder="0"
              readonly
            />
          </div>
          <div>
            <label for="y_value" class="coordinate-label">Y:</label>
            <input
              type="number"
              class="coordinate-input readonly"
              id="y_value"
              v-model="vertices[3][1]"
              placeholder="0"
              readonly
            />
          </div>
        </div>
      </div>

      <button class="draw-button" id="draw-button" @click="updatePoints">Draw paralelogram</button>

      <div class="slider-container">
        <div class="slider-container-data">
          <a><input type="checkbox" id="rotateCheckbox" v-model="rotateChecked" />Rotation</a>
          <a>{{ rotation }}</a>
        </div>
        <input type="range" v-model="rotation" min="-90" max="90" class="slider" id="mySlider" />
      </div>

      <div class="slider-container">
        <div class="slider-container-data">
          <a><input type="checkbox" id="zoomCheckbox" v-model="zoomChecked" />Scale</a>
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
      <div class="slider-container">
        <div>
          <input type="checkbox" id="moveCheckbox" v-model="moveChecked" /> Move rectangle by center
          to
        </div>
        <div class="move-coordinates">
          <div>
            <label for="x_value" class="coordinate-label">X:</label>
            <input
              type="number"
              class="coordinate-input"
              id="x_value"
              v-model="xMoveVal"
              placeholder="0"
            />
          </div>

          <div>
            <label for="y_value" class="coordinate-label">Y:</label>
            <input
              type="number"
              class="coordinate-input"
              id="y_value"
              v-model="yMoveVal"
              placeholder="0"
            />
          </div>
        </div>
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
