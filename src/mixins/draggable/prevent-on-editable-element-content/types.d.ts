import { DraggableCoreMixinInstance } from '../core'

export interface DraggablePreventOnEditableElementContentMixinOptions {}

export interface DraggablePreventOnEditableElementContentMixinClass {
  new (
    options: DraggablePreventOnEditableElementContentMixinOptions
  ): DraggablePreventOnEditableElementContentMixinInstance
}

export interface DraggablePreventOnEditableElementContentMixinInstance {}

export interface DraggablePreventOnEditableElementContentMixinBase
  extends Pick<DraggableCoreMixinInstance, 'on' | 'off'> {
  render(): void
  destroy(): void
}
