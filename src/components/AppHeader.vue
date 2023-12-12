<script setup lang="ts">
import router from '@/router';
import ActivityDropdown from './ActivityDropdown.vue'
import { ref } from 'vue'
const dropdown = ref(false)

function toggleDropdown() {
  console.log('toggleDropdown')
  dropdown.value = !dropdown.value
}

function setShowValue(val: boolean) {
  dropdown.value = val
}
</script>

<template>
  <header class="header-item">
    <div class="header-item-content-div">
      <router-link to="/" class="header-button" id="home-button"><i class="fa-solid fa-house"></i>Home</router-link>
      <button class="header-button" @click="toggleDropdown" id="activity-button">
        <i class="fa-solid fa-bars"></i>Activity
      </button>
      <button class="header-button" id="contact-us-button">
        <i class="fa-solid fa-phone-volume"></i>Contact us
      </button>
      <ActivityDropdown 
        :show="dropdown" 
        :setShowValue="setShowValue"
      v-if="dropdown" />
    </div>
  </header>
</template>

<style scoped>
.header-item {
  display: flex;
  justify-content: end;
  padding: 0.75rem;
  padding-left: 1rem;
  padding-right: 2rem;
  height: var(--header-height);
  z-index: 100;
}

.header-item-content-div {
  display: flex;
  gap: 1.75rem;
  width: 30rem;
  justify-content: end;
}

.header-button {
  background-color: rgba(201, 140, 80, 0);
  border-radius: 1rem;
  height: 2.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  text-decoration: none ;
}

button {
  border: none;
  cursor: pointer;
  font: inherit;
}

#activity-button {
  background-color: #ed7f1a;
  color: #f4f4f4;
}

/*імпортований клас іконок*/
.fa-solid {
  padding-right: 0.75rem;
}
</style>
