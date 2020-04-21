import { NudgeableMixinInstance } from '../../nudgeable'
import { ElementableInstance } from '../../elementable/core'
import { DraggableCoreMixinInstance } from '../core'

export interface DraggableMouseMixinOptions {}

export interface DraggableMouseMixinClass {
  new (options: DraggableMouseMixinOptions): DraggableMouseMixinInstance
}

export interface DraggableMouseMixinInstance {
  render: () => void
  destroy: () => void
}

export interface DraggableMouseMixinBase
  extends Pick<ElementableInstance, 'element'>,
    Pick<NudgeableMixinInstance, 'nudge' | 'settle'>,
    Pick<DraggableCoreMixinInstance, '_dragging' | '_preventDragging'> {
  render(): void
  destroy(): void
}
