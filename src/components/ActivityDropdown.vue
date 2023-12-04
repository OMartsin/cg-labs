<template>
    <transition name="fade">
        <div v-if="show" class="dropdown-menu">
            <ul>
                <li @click="navigateTo('fractals')">Creating fractals</li>
                <li @click="navigateTo('colors')">Work with color schemes</li>
                <li @click="navigateTo('geometry')">Affine transformation</li>
                <li @click="navigateTo('definitions')">Definitions of terms</li>
                <li @click="navigateTo('test')">Test</li>
            </ul>
        </div>
    </transition>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const { show, setShowValue } = defineProps<{
    show: Boolean
    setShowValue: (val: boolean) => void
}>();

function navigateTo(routeName: string) {
    router.push({ name: routeName });
    setShowValue(false);
}

</script>
  
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.dropdown-menu {
    position: absolute;
    /* ... additional styling ... */
    top: 100%;
    /* Position below the button */
    right: 0;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.dropdown-menu li {
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: #f0f0f0;
}</style>
  