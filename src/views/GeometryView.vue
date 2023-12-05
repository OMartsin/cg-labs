<script setup lang="ts">
import GeometryInteractionSection from '@/components/GeomertyInteractionSection.vue'
import GeometryImage from '@/components/GeometryImage.vue'
import { Rectangle, type Matrix } from '@/geometry';
import { useRectangleInfoStore } from '@/stores/rectangle';

const geometryStore = useRectangleInfoStore();

const vertices: Matrix = [
    [1, 1, 1],
    [1, 3, 1],
    [3, 3, 1],
    [3, 1, 1],
];

geometryStore.setRectangle(new Rectangle(vertices));

</script>

<template>
  <div class="main-item">
    <div class="main-content-form">
      <div class="main-form-top-text">
        <h1>Geometry</h1>
        <a class>Experiment with the transformation of shape</a>
      </div>
      <div class="main-form-shapetransform-content">
        <GeometryInteractionSection />
        <GeometryImage />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88vh;
}
.main-content-form {
  margin-top: var(--header-height);
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 92%;
  background-color: rgba(54, 63, 70, 0);
}
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
.main-form-shapetransform-content {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: rgba(26, 100, 123, 0);
}
</style>
