import { DraggableEventMap, DRAGGING_START_EVENT } from '../types'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase {
  render(): void
  destroy(): void
  readonly element: HTMLElement
  on: (
    type: typeof DRAGGING_START_EVENT,
    listener: (ev: DraggableEventMap[typeof DRAGGING_START_EVENT]) => void
  ) => void
  off: (
    type: typeof DRAGGING_START_EVENT,
    listener: (ev: DraggableEventMap[typeof DRAGGING_START_EVENT]) => void
  ) => void
}
