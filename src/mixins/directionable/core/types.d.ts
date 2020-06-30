import { MixinInstance as EventableInstance } from '../../eventable/types'

export type Direction = 'ltr' | 'rtl' | 'auto'

export interface DirectionableCoreMixinOptions {
  direction?: Direction
}

export interface DirectionableCoreMixinClass {
  new (options: DirectionableCoreMixinOptions): DirectionableCoreMixinInstance
}

export interface DirectionableCoreMixinInstance {
  direction: Direction
  readonly computedDirection: Exclude<Direction, 'auto'>

  on: <K extends keyof DirectionableCoreMixinEventMap>(
    type: K,
    listener: (ev: DirectionableCoreMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof DirectionableCoreMixinEventMap>(
    type: K,
    listener: (ev: DirectionableCoreMixinEventMap[K]) => void
  ) => void
}

export interface DirectionableCoreMixinBase
  extends Pick<EventableInstance, 'emitter'> {
  render(): void
  refresh(): void
  readonly rendered: boolean
}

export interface DirectionableCoreMixinEventMap {
  ['yac:computed-direction:compute-auto']: CustomEvent<
    ComputedDirectionComputeAutoEventDetail
  >
}

interface ComputedDirectionComputeAutoEventDetail {
  computedDirection: DirectionableCoreMixinInstance['computedDirection']
}
