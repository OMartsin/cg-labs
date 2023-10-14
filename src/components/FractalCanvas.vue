<template>
  <div class="fractal-image" ref="containerRef">
    <canvas ref="canvasRef" class="fractal-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useZoomStore } from '@/stores/zoom';
import { useIteratiosStore } from '@/stores/iterations';

const iterationsStore = useIteratiosStore();
const zoomLevelStore = useZoomStore();


const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const drawFractal = (zoomLevel: number, iterations: number) => {
  if (canvasRef.value && containerRef.value) {
    const containerWidth = containerRef.value.clientWidth
    const containerHeight = containerRef.value.clientHeight

    canvasRef.value.width = containerWidth
    canvasRef.value.height = containerHeight

    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      for (let x = 0; x < containerWidth; x++) {
        for (let y = 0; y < containerHeight; y++) {
          const zx = ((x / containerWidth) * 5 - 2) / zoomLevel
          const zy = ((y / containerHeight) * 5 - 2) / zoomLevel

          let a = zx
          let b = zy
          let iteration = 0
          while (iteration < iterations) {
            const aSquared = a * a
            const bSquared = b * b
            if (aSquared + bSquared > 100) {
              break
            }

            // Алгебраїчний фрактал cosh(z)
            const newA = Math.cosh(a) * Math.cos(b) + zx
            const newB = Math.sinh(a) * Math.sin(b) + zy

            a = newA
            b = newB
            iteration++
          }

          const bright = Math.floor((iteration / 100) * 255)
          const color = `rgb(${bright}, ${bright}, ${bright})`

          ctx.fillStyle = color
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }
}

onMounted(() => {
  drawFractal(zoomLevelStore.zoom, iterationsStore.iterations)
})

watch(() => zoomLevelStore.zoom, (newZoomLevel) => {
  drawFractal(newZoomLevel, iterationsStore.iterations);
});

watch(() => iterationsStore.iterations, (newIterations) => {
  drawFractal(zoomLevelStore.zoom, newIterations);
});


</script>

<style scoped>
.fractal-image {
  height: 100%;
  width: 55%;
  background-color: #82828231;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fractal-canvas {
  width: 97%;
  height: 97%;
  border-radius: 1rem;
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
