<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MemeModal from './components/MemeModal.vue'
import MemeDisplay from './components/MemeDisplay.vue'
import { useMemeStorage } from './composables/useMemeStorage'
import type { MemeData } from './types'

const { save, load, clear } = useMemeStorage()
const memeData = ref<MemeData | null>(null)
const showModal = computed(() => memeData.value === null)

onMounted(() => {
  memeData.value = load()
})

function onSubmit(data: MemeData) {
  save(data)
  memeData.value = data
}

function onReset() {
  clear()
  memeData.value = null
}
</script>

<template>
  <MemeModal v-if="showModal" @submit="onSubmit" />
  <MemeDisplay v-else :data="memeData!" @reset="onReset" />
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  width: 100%;
  height: 100%;
  background: #111;
}
</style>
