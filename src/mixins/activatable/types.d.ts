import { MixinInstance as EventableInstance } from '../eventable/types'

export interface ActivatableMixinOptions {}

export interface ActivatableMixinClass {
  new (options: ActivatableMixinOptions): ActivatableMixinInstance
}

export interface ActivatableMixinInstance {
  active: boolean
  on: <K extends keyof ActivatableMixinEventMap>(
    type: K,
    listener: (ev: ActivatableMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof ActivatableMixinEventMap>(
    type: K,
    listener: (ev: ActivatableMixinEventMap[K]) => void
  ) => void
}

export interface ActivatableMixinBase
  extends Pick<EventableInstance, 'emitter'> {}

export interface ActivatableMixinEventDetail {
  active: boolean
}

export interface ActivatableMixinEventMap {
  'yac:active': CustomEvent<ActivatableMixinEventDetail>
}
