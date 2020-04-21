import { NudgeableMixinInstance } from '../../nudgeable'
import { ElementableInstance } from '../../elementable/core'
import { DraggableCoreMixinInstance } from '../core'

export interface DraggableTouchMixinOptions {}

export interface DraggableTouchMixinClass {
  new (options: DraggableTouchMixinOptions): DraggableTouchMixinInstance
}

export interface DraggableTouchMixinInstance {
  render: () => void
  destroy: () => void
}

export interface DraggableTouchMixinBase
  extends Pick<ElementableInstance, 'element'>,
    Pick<NudgeableMixinInstance, 'nudge' | 'settle'>,
    Pick<DraggableCoreMixinInstance, '_dragging' | '_preventDragging'> {
  render(): void
  destroy(): void
}
