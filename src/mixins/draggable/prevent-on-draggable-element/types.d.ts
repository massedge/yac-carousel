import { DraggableCoreMixinInstance } from '../core'

export interface DraggablePreventOnDraggableElementMixinOptions {}

export interface DraggablePreventOnDraggableElementMixinClass {
  new (
    options: DraggablePreventOnDraggableElementMixinOptions
  ): DraggablePreventOnDraggableElementMixinInstance
}

export interface DraggablePreventOnDraggableElementMixinInstance {}

export interface DraggablePreventOnDraggableElementMixinBase
  extends Pick<DraggableCoreMixinInstance, 'on' | 'off'> {
  render(): void
  destroy(): void
  readonly element: HTMLElement
}
