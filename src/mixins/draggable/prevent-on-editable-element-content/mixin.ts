import { ComposeConstructor } from '../../../types'
import { DraggableCoreMixinEventMap } from '../core'
import {
  DraggablePreventOnEditableElementContentMixinBase,
  DraggablePreventOnEditableElementContentMixinInstance,
  DraggablePreventOnEditableElementContentMixinClass,
  DraggablePreventOnEditableElementContentMixinOptions,
} from './types'

export default function DraggablePreventOnEditableElementContentMixin<
  T extends new (o: any) => DraggablePreventOnEditableElementContentMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DraggablePreventOnEditableElementContentMixinOptions
    ) => DraggablePreventOnEditableElementContentMixinBase)
    implements DraggablePreventOnEditableElementContentMixinInstance {
    #handler: (e: DraggableCoreMixinEventMap['yac:dragging:start']) => void

    constructor(options: DraggablePreventOnEditableElementContentMixinOptions) {
      super(options)
      this.#handler = (e) => {
        const target = e.detail.originalEvent.target
        if (!(target instanceof HTMLElement)) return

        if (
          // allow selection within input fields
          ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(target.nodeName) > -1 ||
          // allow selection within editable nodes
          target.isContentEditable
        ) {
          e.preventDefault()
        }
      }
    }

    render() {
      super.render()
      this.on('yac:dragging:start', this.#handler)
    }

    destroy() {
      this.off('yac:dragging:start', this.#handler)
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    DraggablePreventOnEditableElementContentMixinClass,
    typeof Base
  >
}
