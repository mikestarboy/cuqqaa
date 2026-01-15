<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initGsap } from './lib/gsap'
import { initLenis } from './lib/lenis'

let cleanup: (() => void) | null = null

onMounted(() => {
  const { lenis, destroy } = initLenis()
  const gsapCleanup = initGsap(lenis)
  cleanup = () => {
    gsapCleanup?.()
    destroy()
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <RouterView />
</template>
