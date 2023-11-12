<script setup lang="ts">
import { useColorsInfoStore } from '@/stores/colorsinfo';
import type { CMYKPoint, RGBPoint } from '@/types';
import { onMounted, ref } from 'vue';

const {title, loadButtonText, canvasRedraw, rgbToCmyk} = defineProps<{
  title: string
  canvasRedraw: (canvas:HTMLCanvasElement|null) => void
  loadButtonText: string
  rgbToCmyk: (rgbPoint: RGBPoint) => CMYKPoint
}>()

const iconClass = ref("fas fa-upload");
const imageInfoStore = useColorsInfoStore();

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  canvasRedraw(canvasRef.value);
})

const fileInputRef = ref<HTMLInputElement | null>(null);

const openImageDialog = () => {
  const fileInput = fileInputRef.value;
  if (fileInput) {
    fileInput.click();
  }
};

const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const files = fileInput.files;

  if (files && files.length > 0) {
    const imagePath = URL.createObjectURL(files[0]);
    loadImage(imagePath);
    canvasRedraw(canvasRef.value);
  }

  if (fileInput) {
    fileInput.value = '';
  }
};

const loadImage = (imagePath: string) => {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");

  if (!ctx) {
    console.error("Unable to get 2D context from canvas.");
    return;
  }

  const image = new Image();
  image.onload = () => {
    if (canvas) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  };
  image.src = imagePath;
};

const handleMouseMove = (event: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  let pos = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  }
  const mouseX = event.pageX - pos.x
  const mouseY = event.pageY - pos.y
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const imageData = ctx.getImageData(mouseX, mouseY, 1, 1).data

  const [red, green, blue, alpha] = imageData

  imageInfoStore.setCMYK(rgbToCmyk({ red, green, blue }))
  console.log({ red, green, blue })
}

</script>

<template>
  <div class="image-section">
    <canvas ref = "canvasRef" class="image-form" @mousemove="handleMouseMove"></canvas>
    <h3>{{ title }}</h3>
    <button class="image-button" @click="openImageDialog"><i :class="iconClass"></i>{{ loadButtonText }}</button>
    <input ref="fileInputRef" type="file" style="display: none" @change="handleFileChange" accept="image/*">
  </div>

</template>

<style scoped>
.image-section{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 36%;
    background-color: rgba(51, 62, 218, 0);
}

.image-form{
    height: 75%;
    width: 100%;
    background-color: #82828231;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
    margin-bottom: 1rem;
}

.image-button{
    width: 100%;
    margin-top: 2rem;
    border-radius: 1rem;
    background-color: #ED7F1A;
    color: #F4F4F4;
    height: 2.25rem;
}

</style>