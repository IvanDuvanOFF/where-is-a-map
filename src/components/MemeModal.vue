<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { MemeData, NeedForm } from '../types'

const emit = defineEmits<{
  submit: [data: MemeData]
}>()

const thing  = ref('')
const person = ref('')
const need   = ref<NeedForm>('нужна')
const inputThingRef  = ref<HTMLInputElement | null>(null)
const inputPersonRef = ref<HTMLInputElement | null>(null)

const needOptions: NeedForm[] = ['нужен', 'нужна', 'нужно', 'нужны']

onMounted(async () => {
  await nextTick()
  const target = thing.value ? inputPersonRef.value : inputThingRef.value
  target?.focus()
})

function handleSubmit() {
  const t = thing.value.trim()
  const p = person.value.trim()
  if (!t || !p) return
  emit('submit', { thing: t, person: p, need: need.value })
}
</script>

<template>
  <Teleport to="body">
    <div class="overlay">
      <div class="modal">
        <h1 class="title">Где карта, Билли?</h1>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="input-thing">Что ищем?</label>
            <input
              id="input-thing"
              ref="inputThingRef"
              v-model="thing"
              type="text"
              placeholder="карта"
              required
              maxlength="40"
              autocomplete="off"
            />
          </div>
          <div class="field">
            <label>Нам...</label>
            <div class="need-group">
              <button
                v-for="opt in needOptions"
                :key="opt"
                type="button"
                class="need-btn"
                :class="{ active: need === opt }"
                @click="need = opt"
              >{{ opt }}</button>
            </div>
          </div>

          <div class="field">
            <label for="input-person">У кого?</label>
            <input
              id="input-person"
              ref="inputPersonRef"
              v-model="person"
              type="text"
              placeholder="Билли"
              required
              maxlength="40"
              autocomplete="off"
            />
          </div>
          <button type="submit" class="submit-btn">Показать!</button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 2rem;
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
}

.title {
  font-family: 'Anton', Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

label {
  color: #aaa;
  font-size: 0.85rem;
  font-family: sans-serif;
}

input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 6px;
  color: #fff;
  font-size: 1.05rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #e8c42a;
}

input::placeholder {
  color: #555;
}

.submit-btn {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #e8c42a;
  color: #111;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: sans-serif;
  transition: background 0.2s, transform 0.1s;
}

.submit-btn:hover {
  background: #f5d445;
}

.submit-btn:active {
  transform: scale(0.97);
}

.need-group {
  display: flex;
  gap: 0.5rem;
}

.need-btn {
  flex: 1;
  padding: 0.5rem 0.25rem;
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 6px;
  color: #aaa;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
  font-family: sans-serif;
}

.need-btn:hover {
  border-color: #888;
  color: #fff;
}

.need-btn.active {
  border-color: #e8c42a;
  color: #e8c42a;
  background: #2e2a14;
}
</style>
