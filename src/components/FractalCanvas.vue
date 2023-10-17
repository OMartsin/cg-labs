<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useFractalsInfoStore } from '@/stores/fractalsinfo'

const fractalsInfoStore = useFractalsInfoStore()

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const axiom = 'F'
const rule = 'F=F+F--F+F'
const anglePlus = 85
const angleMinus = 85
let currentSentence = axiom
let currentLength = 0

function applyRules(sentence: string) {
  const rulesArray = rule.split(';')
  for (const r of rulesArray) {
    const [predecessor, successor] = r.split('=')
    const regex = new RegExp(predecessor, 'g')
    sentence = sentence.replace(regex, successor)
  }
  return sentence
}

function draw(width: number, height: number, rotationAngle = 0) {
  const ctx = canvasRef.value?.getContext('2d')
  if (ctx) {
    ctx.beginPath()
    ctx.save()
    ctx.translate(width, height) // Start drawing from the bottom center
    ctx.rotate((rotationAngle * Math.PI) / 180)

    for (const char of currentSentence) {
      if (char === 'F') {
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -currentLength)
        ctx.translate(0, -currentLength)
      } else if (char === '+') {
        ctx.rotate((anglePlus * Math.PI) / 180)
      } else if (char === '-') {
        ctx.rotate((-angleMinus * Math.PI) / 180)
      }
    }

    ctx.stroke()
    ctx.restore()
  }
}

function drawCezaroFractal(zoomLevel: number, iterations: number, hue: number) {
  if (iterations > 6) {
    iterations = 6
  }
  currentSentence = axiom
  if (containerRef.value === null) {
    return
  }
  const initialLength = (Math.min(containerRef.value.clientWidth, containerRef.value.clientHeight)) * zoomLevel
  * Math.pow(0.725, -iterations)
  const a = initialLength * Math.pow(0.725, iterations)
  currentLength = initialLength

  if (canvasRef.value && containerRef.value) {
    const containerWidth = containerRef.value.clientWidth
    const containerHeight = containerRef.value.clientHeight

    canvasRef.value.width = containerWidth
    canvasRef.value.height = containerHeight

    for (let i = 0; i < iterations; i++) {
      currentSentence = applyRules(currentSentence)
      currentLength /= 3 // Reduce the length for each iteration
    }

    const color = `hsl(${hue}, ${100}%, 50%)`
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      ctx.strokeStyle  = color
    }

    const centerDelta = (Math.abs(containerRef.value.clientWidth - containerRef.value.clientHeight) / 2) / zoomLevel

    draw(canvasRef.value.width - centerDelta, canvasRef.value.height, -90)
    draw(canvasRef.value.width - centerDelta, canvasRef.value.height - a, 180)
    draw(canvasRef.value.width - a - centerDelta, canvasRef.value.height, 0)
    draw(canvasRef.value.width - a - centerDelta, canvasRef.value.height - a, 90)
  }
}

const drawSinCosFractal = (zoomLevel: number, iterations: number, hue: number) => {
  console.log('drawSinCosFractal')
  if (canvasRef.value && containerRef.value) {
    const containerWidth = containerRef.value.clientWidth
    const containerHeight = containerRef.value.clientHeight

    canvasRef.value.width = containerWidth
    canvasRef.value.height = containerHeight

    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      for (let x = 0; x < containerWidth; x++) {
        for (let y = 0; y < containerHeight; y++) {
          const zx = ((x / containerWidth) * 4 - 2) / zoomLevel
          const zy = ((y / containerHeight) * 4 - 2) / zoomLevel

          let a = zx
          let b = zy
          let iteration = 0

          while (iteration < iterations) {
            const aSquared = a * a
            const bSquared = b * b
            if (aSquared + bSquared > 10) {
              ctx.fillStyle = '#000000'
              ctx.fillRect(x, y, 1, 1)
              break 
            }

            // Fractal sin(z) * cos(z)
            const newA = Math.sin(a) * Math.cos(a) - Math.sinh(b) * Math.cosh(b) + zx
            const newB = Math.sin(a) * Math.cosh(b) + Math.cos(a) * Math.sinh(b) + zy

            a = newA
            b = newB
            iteration++
          }

          const saturation = ((iterations - iteration) / iterations) * 100
          const color = `hsl(${hue - iteration * 5}, ${saturation}%, 50%)`

          ctx.fillStyle = color
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }
}

const drawSinFractal = (zoomLevel: number, iterations: number, hue: number) => {
  console.log('drawSinFractal')
  if (canvasRef.value && containerRef.value) {
    const containerWidth = containerRef.value.clientWidth
    const containerHeight = containerRef.value.clientHeight

    canvasRef.value.width = containerWidth
    canvasRef.value.height = containerHeight

    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      for (let x = 0; x < containerWidth; x++) {
        for (let y = 0; y < containerHeight; y++) {
          const zx = ((x / containerWidth) * 4 - 2) / zoomLevel
          const zy = ((y / containerHeight) * 4 - 2) / zoomLevel

          let a = zx
          let b = zy
          let iteration = 0

          while (iteration < iterations) {
            const aSquared = a * a
            const bSquared = b * b
            if (aSquared + bSquared > 100) {
              ctx.fillStyle = '#000000'
              ctx.fillRect(x, y, 1, 1)
              break 
            }

            const newA = Math.sin(a) * Math.cosh(b) + zx
            const newB = Math.cos(a) * Math.sinh(b) + zy

            a = newA
            b = newB
            iteration++
          }
          const saturation = ((iterations - iteration) / iterations) * 100
          const color = `hsl(${hue - iteration * 5}, ${saturation}%, 50%)`
          ctx.fillStyle = color
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }
}

const drawChFractal = (zoomLevel: number, iterations: number, hue: number) => {
  if (canvasRef.value && containerRef.value) {
    const containerWidth = containerRef.value.clientWidth
    const containerHeight = containerRef.value.clientHeight

    canvasRef.value.width = containerWidth
    canvasRef.value.height = containerHeight

    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      for (let x = 0; x < containerWidth; x++) {
        for (let y = 0; y < containerHeight; y++) {
          const zx = ((x / containerWidth) * 4 - 2) / zoomLevel
          const zy = ((y / containerHeight) * 4 - 2) / zoomLevel

          let a = zx
          let b = zy
          let iteration = 0

          while (iteration < iterations) {
            const aSquared = a * a
            const bSquared = b * b
            if (aSquared + bSquared > 100) {
              ctx.fillStyle = '#000000'
              ctx.fillRect(x, y, 1, 1)
              break 
            }

            // Fractal cosh(z)
            const newA = Math.cosh(a) * Math.cos(b) + zx
            const newB = Math.sinh(a) * Math.sin(b) + zy

            a = newA
            b = newB
            iteration++
          }

          const saturation = ((iterations - iteration) / iterations) * 100
          const color = `hsl(${hue - iteration * 5}, ${saturation}%, 50%)`
          ctx.fillStyle = color
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }
}

onMounted(() => {
  choiseFractalType(
    fractalsInfoStore.zoom,
    fractalsInfoStore.iterations,
    fractalsInfoStore.hue,
    fractalsInfoStore.currentFractal
  )
})

watch(
  () => fractalsInfoStore.zoom,
  (newZoomLevel) => {
    choiseFractalType(
      newZoomLevel,
      fractalsInfoStore.iterations,
      fractalsInfoStore.hue,
      fractalsInfoStore.currentFractal
    )
  }
)

watch(
  () => fractalsInfoStore.iterations,
  (newIterations) => {
    choiseFractalType(
      fractalsInfoStore.zoom,
      newIterations,
      fractalsInfoStore.hue,
      fractalsInfoStore.currentFractal
    )
  }
)

watch(
  () => fractalsInfoStore.hue,
  (newHue) => {
    choiseFractalType(
      fractalsInfoStore.zoom,
      fractalsInfoStore.iterations,
      newHue,
      fractalsInfoStore.currentFractal
    )
  }
)

watch(
  () => fractalsInfoStore.currentFractal,
  (newFractalType) => {
    choiseFractalType(
      fractalsInfoStore.zoom,
      fractalsInfoStore.iterations,
      fractalsInfoStore.hue,
      newFractalType
    )
  }
)

function choiseFractalType(
  zoomLevel: number,
  iterations: number,
  hue: number,
  fractalType: string
) {
  if (fractalType === 'Cut type') {
    console.log('Cut type')
    drawCezaroFractal(zoomLevel, iterations, hue)
  }
  if (fractalType === 'Ch z') {
    console.log('Ch z')
    drawChFractal(zoomLevel, iterations, hue)
  }
  if (fractalType === 'sin z * cos z') {
    console.log('sin z * cos z')
    drawSinCosFractal(zoomLevel, iterations, hue)
  }
  if (fractalType === 'sin z') {
    console.log('sin z')
    drawSinFractal(zoomLevel, iterations, hue)
  }
}

function saveCanvasImage() {
  const canvas = canvasRef
  if (!canvas.value) return
  const dataURL = canvas.value.toDataURL() // Convert canvas content to data URL

  // Create a download link
  const downloadLink = document.createElement('a')
  downloadLink.href = dataURL
  downloadLink.download = 'canvas_image.png' // Specify the download file name
  downloadLink.click() // Simulate a click on the download link
}

watch(
  () => fractalsInfoStore.saveImage,
  (newSaveImageFn) => {
    if (newSaveImageFn) {
      saveCanvasImage()
      fractalsInfoStore.setSaveImage(false)
    }
  }
)
</script>

<template>
  <div class="fractal-image" ref="containerRef">
    <canvas ref="canvasRef" class="fractal-canvas"></canvas>
  </div>
</template>

<style scoped>
.fractal-image {
  height: 100%;
  width: 50%;
  background-color: #000000;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fractal-canvas {
  border-radius: 1rem;
}

.hue-slider {
  width: 100px;
  margin-left: 20px;
}

.zoom-slider {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
</style>
