import { DraggableCoreMixinInstance } from '../core'

export interface DraggablePreventOnInputElementMixinOptions {}

export interface DraggablePreventOnInputElementMixinClass {
  new (
    options: DraggablePreventOnInputElementMixinOptions
  ): DraggablePreventOnInputElementMixinInstance
}

export interface DraggablePreventOnInputElementMixinInstance {}

export interface DraggablePreventOnInputElementMixinBase
  extends Pick<DraggableCoreMixinInstance, 'on' | 'off'> {
  render(): void
  destroy(): void
}
