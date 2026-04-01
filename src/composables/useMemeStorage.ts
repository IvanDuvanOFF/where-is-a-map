import type { MemeData } from '../types'

const KEY_THING  = 'meme_thing'
const KEY_PERSON = 'meme_person'

export function useMemeStorage() {
  function save(data: MemeData) {
    try {
      localStorage.setItem(KEY_THING,  data.thing)
      localStorage.setItem(KEY_PERSON, data.person)
    } catch {}
  }

  function load(): MemeData | null {
    try {
      const thing  = localStorage.getItem(KEY_THING)
      const person = localStorage.getItem(KEY_PERSON)
      if (thing && person) return { thing, person }
    } catch {}
    return null
  }

  function clear() {
    try {
      localStorage.removeItem(KEY_THING)
      localStorage.removeItem(KEY_PERSON)
    } catch {}
  }

  return { save, load, clear }
}
