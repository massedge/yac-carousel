import { MixinInstance as EventableInstance } from '../../../eventable/types'

export interface VisibleItemElementMixinOptions {}

export interface VisibleItemElementMixinClass {
  new (options: VisibleItemElementMixinOptions): VisibleItemElementMixinInstance
}

export interface VisibleItemElementMixinInstance {
  visible: boolean
  on: <K extends keyof VisibleItemElementMixinEventMap>(
    type: K,
    listener: (ev: VisibleItemElementMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof VisibleItemElementMixinEventMap>(
    type: K,
    listener: (ev: VisibleItemElementMixinEventMap[K]) => void
  ) => void
}

export interface VisibleItemElementMixinBase
  extends Pick<EventableInstance, 'emitter'> {}

export interface VisibleItemElementMixinVisibleEventDetail {
  visible: boolean
}

export interface VisibleItemElementMixinEventMap {
  'yac:item:visible': CustomEvent<VisibleItemElementMixinVisibleEventDetail>
}
