<script setup lang="ts">
import FractalCanvas from '@/components/FractalCanvas.vue';
import FractalsInteraction from '../components/FractalsInteraction.vue'
import { useZoomStore } from '@/stores/zoom';
import { useIteratiosStore } from '@/stores/iterations';

const zoomLevelStore = useZoomStore();
zoomLevelStore.setZoomLevel(1);

const iterationsStore = useIteratiosStore();
iterationsStore.setIterations(50);

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
        :updateZoomLevel = zoomLevelStore.setZoomLevel
        :zoomLevel = zoomLevelStore.zoom 
        :updateIterations = iterationsStore.setIterations
        :iterations = iterationsStore.iterations />
        <FractalCanvas />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-item{
  margin-top: var(--header-height);
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
