import { ComposeConstructor } from '../../../types'
import { DraggableCoreMixinEventMap } from '../core'
import {
  DraggablePreventOnInputElementMixinBase,
  DraggablePreventOnInputElementMixinInstance,
  DraggablePreventOnInputElementMixinClass,
  DraggablePreventOnInputElementMixinOptions,
} from './types'

export default function DraggablePreventOnInputElementMixin<
  T extends new (o: any) => DraggablePreventOnInputElementMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DraggablePreventOnInputElementMixinOptions
    ) => DraggablePreventOnInputElementMixinBase)
    implements DraggablePreventOnInputElementMixinInstance {
    #handler: (e: DraggableCoreMixinEventMap['yac:dragging:start']) => void

    constructor(options: DraggablePreventOnInputElementMixinOptions) {
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
    DraggablePreventOnInputElementMixinClass,
    typeof Base
  >
}
