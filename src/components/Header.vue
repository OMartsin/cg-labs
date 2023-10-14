<template>
  <header class="header-item">
    <div class="header-item-content-div">
      <button class="header-button" id="home-button"><i class="fa-solid fa-house"></i>Home</button>
      <button class="header-button" id="activity-button">
        <i class="fa-solid fa-bars"></i>Activity
      </button>
      <button class="header-button" id="contact-us-button">
        <i class="fa-solid fa-phone-volume"></i>Contact us
      </button>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'MainHeader'
}
</script>

<style scoped>
.header-item {
  display: flex;
  justify-content: end;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
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
