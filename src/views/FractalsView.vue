<script setup lang="ts">
import FractalCanvas from '@/components/FractalCanvas.vue';
import FractalsInteraction from '../components/FractalsInteraction.vue'
import { useFractalsInfoStore } from '@/stores/fractalsinfo';

const fractalsInfoStore = useFractalsInfoStore();
fractalsInfoStore.setZoom(1);
fractalsInfoStore.setIterations(20);
fractalsInfoStore.setHue(0);
fractalsInfoStore.setCurrentFractal("Ch z");


</script>

<template>
  <div class="main-item">
    <div class="main-content-form">
      <div class="main-form-top-text">
        <h1>FRACTALS</h1>
        <a>Experiment with the iterations to create fractal</a>
      </div>
      <div class="main-form-fractals-content">
        <FractalsInteraction
        :updateZoomLevel = fractalsInfoStore.setZoom
        :zoomLevel = fractalsInfoStore.zoom 
        :updateIterations = fractalsInfoStore.setIterations
        :iterations = fractalsInfoStore.iterations
        :updateHue = fractalsInfoStore.setHue
        :hue = fractalsInfoStore.hue
        :setSaveImage="fractalsInfoStore.setSaveImage"
        :currentFractal="fractalsInfoStore.currentFractal"
        :updateFractalType="fractalsInfoStore.setCurrentFractal"
         />
        <FractalCanvas />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88vh;
}

.main-content-form{
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    background-color: rgba(54, 63, 70, 0);
}

.main-form-fractals-content {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: rgba(26, 100, 123, 0);
}

/*____________top text___________*/
.main-form-top-text{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-end;
    margin-bottom: 1rem;
}

.main-form-top-text a{
    margin-bottom: 0.375rem;
    margin-left: 1rem;
}
</style>
