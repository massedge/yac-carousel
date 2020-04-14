import { MixinInstance as EventableInstance } from '../eventable/types'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  readonly focused: boolean
  focus(): boolean
  blur(): boolean
  on: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
  off: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
}

export interface MixinBase extends Pick<EventableInstance, 'emitter'> {}

export interface MixinEventMap {
  'yac:focus': CustomEvent<FocusEventDetail>
  'yac:blur': CustomEvent<BlurEventDetail>
  'yac:focus:changed': CustomEvent<FocusedChangedEventDetail>
}

export interface FocusEventDetail {}
export interface BlurEventDetail {}
export interface FocusedChangedEventDetail {
  focused: boolean
}
