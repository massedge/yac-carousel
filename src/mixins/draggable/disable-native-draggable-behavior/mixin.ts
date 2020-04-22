import { ComposeConstructor } from '../../../types'
import {
  DraggableDisableNativeDraggableBehaviorBase,
  DraggableDisableNativeDraggableBehaviorInstance,
  DraggableDisableNativeDraggableBehaviorClass,
  DraggableDisableNativeDraggableBehaviorOptions,
} from './types'

export default function DraggableDisableNativeDraggableBehavior<
  T extends new (o: any) => DraggableDisableNativeDraggableBehaviorBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DraggableDisableNativeDraggableBehaviorOptions
    ) => DraggableDisableNativeDraggableBehaviorBase)
    implements DraggableDisableNativeDraggableBehaviorInstance {
    #handler: (e: DragEvent) => void

    constructor(options: DraggableDisableNativeDraggableBehaviorOptions) {
      super(options)
      this.#handler = (e) => e.preventDefault()
    }

    render() {
      super.render()
      this.element.addEventListener('dragstart', this.#handler)
    }

    destroy() {
      this.element.removeEventListener('dragstart', this.#handler)
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    DraggableDisableNativeDraggableBehaviorClass,
    typeof Base
  >
}
