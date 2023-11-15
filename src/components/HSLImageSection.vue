<script setup lang="ts">
import { useColorsInfoStore } from '@/stores/colorsinfo'
import { type FragmentBounds, type HSLPoint, type RGBPoint } from '@/types'

import { ref, defineProps, onMounted, watch } from 'vue'

const imageInfoStore = useColorsInfoStore()

const { title, loadButtonText, canvasRedraw, rgbToHsl } = defineProps<{
  title: string
  loadButtonText: string
  canvasRedraw: (
    canvas: HTMLCanvasElement | null,
    colorHue: number | null,
    colorSaturation: number | null,
    fragmentBounds: FragmentBounds | null
  ) => void
  rgbToHsl: (rgbPoint: RGBPoint) => HSLPoint
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const iconClass = ref('fas fa-upload')
const selection = ref<FragmentBounds>({ startX: 0, startY: 0, endX: 0, endY: 0 });
const isSelecting = ref(false)
const imagePathRef = ref('');


const startSelection = (event: MouseEvent) => {
  loadImage(imagePathRef.value)
  isSelecting.value = true
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  selection.value.startX = (event.clientX - rect.left) * scaleX
  selection.value.startY = (event.clientY - rect.top) * scaleY
}

const updateSelection = (event: MouseEvent) => {
  handleMouseMove(event)
  if (!isSelecting.value) return

  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  selection.value.endX = (event.clientX - rect.left) * scaleX
  selection.value.endY = (event.clientY - rect.top) * scaleY
}

const endSelection = () => {
  
  isSelecting.value = false

  // Draw the selection rectangle
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!ctx) return

  ctx.strokeStyle = '#ff0000'
  ctx.lineWidth = 2
  ctx.strokeRect(
    selection.value.startX,
    selection.value.startY,
    selection.value.endX - selection.value.startX,
    selection.value.endY - selection.value.startY
  )
  if(selection.value.startX > selection.value.endX){
    let temp = selection.value.startX
    selection.value.startX = selection.value.endX
    selection.value.endX = temp
  }
  if(selection.value.startY > selection.value.endY){
    let temp = selection.value.startY
    selection.value.startY = selection.value.endY
    selection.value.endY = temp
  }
  console.log(selection.value)
  canvasRedraw(canvasRef.value, imageInfoStore.hue, imageInfoStore.saturation, selection.value)
}

function cancelSelectionDelete(){
    isSelecting.value = false
    loadImage(imagePathRef.value)
    selection.value = { startX: 0, startY: 0, endX: 0, endY: 0 }
}

function cancelSelectionLeave(){
  if(isSelecting.value) {
    isSelecting.value = false
    loadImage(imagePathRef.value)
    selection.value = { startX: 0, startY: 0, endX: 0, endY: 0 }
  }
}


onMounted(() => {
  canvasRedraw(canvasRef.value, null, null, null)
})

const openImageDialog = () => {
  const fileInput = fileInputRef.value
  if (fileInput) {
    fileInput.click()
  }
}

const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files

  if (files && files.length > 0) {
    const imagePath = URL.createObjectURL(files[0])
    imagePathRef.value = imagePath
    loadImage(imagePath)
    canvasRedraw(canvasRef.value, null, null, null)
  }

  if (fileInput) {
    fileInput.value = ''
  }
}

const loadImage = (imagePath: string) => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')

  if (!ctx) {
    console.error('Unable to get 2D context from canvas.')
    return
  }

  const image = new Image()

  image.onload = () => {
    if (canvas) {
      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
  }
  image.src = imagePath
}


watch(canvasRef, (newValue: HTMLCanvasElement | null) => {
  canvasRedraw(newValue, null, null, null)
})
watch(
  () => imageInfoStore.hue,
  (newValue) => {
    console.log('hue: ' + newValue)
    if(selection.value.startX != 0 || selection.value.startY != 0 || selection.value.endX != 0 || selection.value.endY != 0){
      canvasRedraw(canvasRef.value, newValue, imageInfoStore.saturation, selection.value)
    }
    else{
      canvasRedraw(canvasRef.value, newValue, imageInfoStore.saturation, null)
    }
  }
)
watch(
  () => imageInfoStore.saturation,
  (newValue) => {
    console.log('saturation: ' + newValue)
    if(selection.value.startX != 0 || selection.value.startY != 0 || selection.value.endX != 0 || selection.value.endY != 0){
      canvasRedraw(canvasRef.value, imageInfoStore.hue, newValue, selection.value)
    }
    else{
      canvasRedraw(canvasRef.value, imageInfoStore.hue, newValue, null)
    }
  }
)
const handleMouseMove = (event: MouseEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = (event.clientX - rect.left) * scaleX;
  const mouseY = (event.clientY - rect.top) * scaleY;

  const imageData = ctx.getImageData(mouseX, mouseY, 1, 1).data;

  // imageData is a Uint8ClampedArray with RGBA values
  const [red, green, blue, alpha] = imageData;

  imageInfoStore.setHSL(rgbToHsl({ red, green, blue }));
  console.log({ red, green, blue });
};

</script>

<template>
  <div class="image-section"
  @keydown.delete="cancelSelectionDelete">
    <canvas ref="canvasRef"       
      @mousedown="startSelection"
      @mouseup="endSelection"
      @mouseleave="cancelSelectionLeave"
      @mousemove="updateSelection"
      tabindex="0" 
      class="image-form">
    </canvas>
    <h3>{{ title }}</h3>
    <button class="image-button" @click="openImageDialog">
      <i :class="iconClass"></i>{{ loadButtonText }}
    </button>
    <input
      ref="fileInputRef"
      type="file"
      style="display: none"
      @change="handleFileChange"
      accept="image/*"
    />
  </div>
</template>

<style scoped>
.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 36%;
  background-color: rgba(51, 62, 218, 0);
}

.image-form {
  height: 75%;
  width: 100%;
  background-color: #82828231;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.image-button {
  width: 100%;
  margin-top: 2rem;
  border-radius: 1rem;
  background-color: #ed7f1a;
  color: #f4f4f4;
  height: 2.25rem;
}
</style>
