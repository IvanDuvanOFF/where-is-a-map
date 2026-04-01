export type NeedForm = 'нужен' | 'нужна' | 'нужно' | 'нужны'

export interface MemeData {
  thing: string
  person: string
  need: NeedForm
}
