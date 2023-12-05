<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Rectangle } from '@/geometry'
import { useRectangleInfoStore } from '@/stores/rectangle'

const canvas = ref<HTMLCanvasElement | null>(null)
const {
  getRectangle,
  getSaveRectangle,
  getIsDrawing,
  getRotate,
  getZoom,
  setIsDrawing,
  getIsNeedToSave,
  setIsNeedToSave,
  getX,
  getY
} = useRectangleInfoStore()

const gridSize = ref<number>(15)
const margin = 0

function gridToCanvas(x: number, y: number) {
  const gridStep = (canvas.value ? canvas.value.width : 600) / (gridSize.value * 2)
  const canvasX = (x + +gridSize.value) * +gridStep
  const canvasY = (-y + +gridSize.value) * +gridStep
  return [canvasX, canvasY]
}

function drawRectangle(rectangle: Rectangle, ctx: CanvasRenderingContext2D) {
  const vertices = rectangle.vertices.map((v) => gridToCanvas(v[0], v[1]))
  ctx.beginPath()
  ctx.moveTo(vertices[0][0], vertices[0][1])
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i][0], vertices[i][1])
  }
  ctx.closePath()
  ctx.strokeStyle = 'red' // Change color as needed
  ctx.stroke()
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const effectiveWidth = width - 2 * margin
  const effectiveHeight = height - 2 * margin
  const step = effectiveWidth / (gridSize.value * 2)

  // Draw the grid lines
  ctx.beginPath()
  for (let x = margin; x <= effectiveWidth + margin; x += step) {
    ctx.moveTo(x, margin)
    ctx.lineTo(x, effectiveHeight + margin)
  }
  for (let y = margin; y <= effectiveHeight + margin; y += step) {
    ctx.moveTo(margin, y)
    ctx.lineTo(effectiveWidth + margin, y)
  }
  ctx.strokeStyle = '#b0e0e6' // Light blue color
  ctx.stroke()

  // Draw the axes
  ctx.beginPath()
  ctx.strokeStyle = 'black' // Black color for axes
  const centerX = width / 2
  const centerY = height / 2
  ctx.moveTo(centerX, margin)
  ctx.lineTo(centerX, effectiveHeight + margin)
  ctx.moveTo(margin, centerY)
  ctx.lineTo(effectiveWidth + margin, centerY)
  ctx.stroke()

  // Arrowheads for axes
  const arrowLength = 10
  const arrowWidth = 10
  ctx.beginPath()
  ctx.moveTo(effectiveWidth + margin, centerY)
  ctx.lineTo(effectiveWidth + margin - arrowLength, centerY - arrowWidth / 2)
  ctx.lineTo(effectiveWidth + margin - arrowLength, centerY + arrowWidth / 2)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(centerX, margin)
  ctx.lineTo(centerX - arrowWidth / 2, margin + arrowLength)
  ctx.lineTo(centerX + arrowWidth / 2, margin + arrowLength)
  ctx.closePath()
  ctx.fill()

  // Label the axes
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = -gridSize.value; i <= gridSize.value; i++) {
    if (i !== 0) {
      if (gridSize.value > 10 && i % 2 !== 0) {
        continue
      }
      if (gridSize.value > 20 && i % 5 !== 0) {
        continue
      }
      ctx.fillText(i.toString(), centerX + i * step, centerY + step)
      ctx.fillText(i.toString(), centerX - step, centerY - i * step)
    }
  }
}

onMounted(() => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d')
    if (ctx) {
      drawGrid(ctx, canvas.value.width, canvas.value.height)
      console.log(getRectangle())
      drawRectangle(getRectangle(), ctx)
    }
  }
})

watch(
  getRectangle,
  (newRectangle: Rectangle) => {
    if (canvas.value) {
      const ctx = canvas.value.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height) // Clear the canvas
        drawGrid(ctx, canvas.value.width, canvas.value.height) // Redraw the grid
        drawRectangle(newRectangle, ctx) // Redraw the rectangle
      }
    }
  },
  { deep: true }
)

const totalFrames = 200
let currentFrame = 0
let rotate = getRotate()
let zoom = getZoom()
let x = getX()
let y = getY()

watch(getRotate, (newRotate: number) => {
  startAnimation()
})

watch(getZoom, (newRotate: number) => {
  startAnimation()
})

watch(getIsDrawing, (newVal: boolean) => {
  if (!newVal) return
  startAnimation()
})

function startAnimation() {
  currentFrame = 0
  rotate = getRotate()
  zoom = getZoom()
  const center = getRectangle().getCenter()
  x = getX() - center[0]
  y = getY() - center[1]
  console.log(x, y)
  animate()
}

function animate() {
  if (currentFrame < totalFrames) {
    const incrementalRotation = rotate / totalFrames
    const incrementalScale = Math.pow(zoom, 1 / totalFrames)
    const incrementalX = x / totalFrames
    const incrementalY = y / totalFrames

    getRectangle().scaleRotateAndMove(
      incrementalScale,
      incrementalScale,
      incrementalRotation,
      incrementalX,
      incrementalY
    )

    if (canvas.value) {
      currentFrame++
      requestAnimationFrame(animate)
    }
  } else {
    setIsDrawing(false)
  }
}

watch(gridSize, () => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
      drawGrid(ctx, canvas.value.width, canvas.value.height)
      drawRectangle(getRectangle(), ctx)
    }
  }
})

watch(getIsNeedToSave, () => {
  setIsNeedToSave(false)
  if (!canvas.value) return
  console.log(getSaveRectangle())
  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    drawGrid(ctx, canvas.value.width, canvas.value.height)
    drawRectangle(getSaveRectangle(), ctx)
  }

  const dataURL = canvas.value.toDataURL()

  const downloadLink = document.createElement('a')
  downloadLink.href = dataURL
  downloadLink.download = 'rectangle_image.jpg'
  downloadLink.click()
  if (ctx) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    drawGrid(ctx, canvas.value.width, canvas.value.height)
    drawRectangle(getRectangle(), ctx)
  }
})
</script>

<template>
  <div class="image-container">
    <canvas ref="canvas" width="600" height="600"></canvas>
    <input type="range" class="slider" v-model="gridSize" min="2" max="100" step="1" />
  </div>
</template>

<style scoped>
canvas {
  height: 100%;
  border: 1px solid #000;
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
.image-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 55%;
}
.slider {
  appearance: none;
  width: 75%;
  height: 0.5rem;
  border-radius: 0.313rem;
  background: #565653cd;
  outline: none;
}
</style>
