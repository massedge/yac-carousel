import { ElementableInstance } from '../../elementable/core'

export interface DraggableDisableNativeDraggableBehaviorOptions {}

export interface DraggableDisableNativeDraggableBehaviorClass {
  new (
    options: DraggableDisableNativeDraggableBehaviorOptions
  ): DraggableDisableNativeDraggableBehaviorInstance
}

export interface DraggableDisableNativeDraggableBehaviorInstance {}

export interface DraggableDisableNativeDraggableBehaviorBase
  extends Pick<ElementableInstance, 'element'> {
  render(): void
  destroy(): void
}
