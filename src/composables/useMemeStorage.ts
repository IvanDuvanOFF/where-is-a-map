import type { MemeData, NeedForm } from '../types'

const KEY_THING  = 'meme_thing'
const KEY_PERSON = 'meme_person'
const KEY_NEED   = 'meme_need'

const NEED_VALUES: NeedForm[] = ['нужен', 'нужна', 'нужно', 'нужны']

export function useMemeStorage() {
  function save(data: MemeData) {
    try {
      localStorage.setItem(KEY_THING,  data.thing)
      localStorage.setItem(KEY_PERSON, data.person)
      localStorage.setItem(KEY_NEED,   data.need)
    } catch {}
  }

  function load(): MemeData | null {
    try {
      const thing  = localStorage.getItem(KEY_THING)
      const person = localStorage.getItem(KEY_PERSON)
      if (!thing || !person) return null
      const raw  = localStorage.getItem(KEY_NEED) as NeedForm | null
      const need = raw && NEED_VALUES.includes(raw) ? raw : 'нужна'
      return { thing, person, need }
    } catch {}
    return null
  }

  function clear() {
    try {
      localStorage.removeItem(KEY_THING)
      localStorage.removeItem(KEY_PERSON)
      localStorage.removeItem(KEY_NEED)
    } catch {}
  }

  return { save, load, clear }
}
