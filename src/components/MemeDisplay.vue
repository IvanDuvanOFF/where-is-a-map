<script setup lang="ts">
import type { MemeData } from '../types'

defineProps<{ data: MemeData }>()
defineEmits<{ reset: [] }>()
</script>

<template>
  <div class="meme">
    <div class="text-block text-top">Где {{ data.thing }}, {{ data.person }}?</div>
    <img src="/map.png" class="meme-img" alt="" />
    <div class="text-block text-bottom">Нам нужна {{ data.thing }}!</div>
  </div>
  <button class="reset-btn" @click="$emit('reset')">Сбросить</button>
</template>

<style scoped>
/* ---- Mobile-first (portrait / narrow) ---- */

.meme {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
}

.meme-img {
  width: 100%;
  height: auto;
  display: block;
  flex-shrink: 0;
}

.text-block {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  width: 100%;
  text-align: center;
  background: #111;

  font-family: 'Anton', Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(1.5rem, 6vw, 4rem);
  color: #fff;
  text-transform: uppercase;
  word-break: break-word;
  line-height: 1.2;

  -webkit-text-stroke: 2px #000;
  paint-order: stroke fill;
  text-shadow:
    2px  2px 4px #000,
    -2px -2px 4px #000,
    2px -2px 4px #000,
    -2px  2px 4px #000;
}

/* position text blocks above and below the image via flex order */
.text-top    { order: -1; }
.text-bottom { order:  1; }

.reset-btn {
  position: fixed;
  top: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;

  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0.35rem 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  white-space: nowrap;
  transition: background 0.2s;
  font-family: sans-serif;
}

.reset-btn:hover {
  background: rgba(200, 0, 0, 0.65);
}

/* ---- Desktop / landscape overlay ---- */

@media (min-aspect-ratio: 16/10) {
  .meme {
    position: fixed;
    inset: 0;
    display: block;
    overflow: hidden;
  }

  .meme-img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: center;
  }

  .text-block {
    position: absolute;
    background: transparent;
    max-width: 60%;
    flex: unset;
    width: auto;
    padding: 0;
  }

  .text-top {
    top: 6%;
    left: 3%;
    text-align: left;
  }

  .text-bottom {
    bottom: 6%;
    right: 3%;
    text-align: right;
  }

  .reset-btn {
    left: auto;
    transform: none;
    right: 1rem;
    top: 0.75rem;
  }
}
</style>
