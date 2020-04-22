import { ComposeConstructor } from '../../../types'
import { DraggableCoreMixinEventMap } from '../core'
import {
  DraggablePreventOnDraggableElementMixinBase,
  DraggablePreventOnDraggableElementMixinInstance,
  DraggablePreventOnDraggableElementMixinClass,
  DraggablePreventOnDraggableElementMixinOptions,
} from './types'

export default function DraggablePreventOnDraggableElementMixin<
  T extends new (o: any) => DraggablePreventOnDraggableElementMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DraggablePreventOnDraggableElementMixinOptions
    ) => DraggablePreventOnDraggableElementMixinBase)
    implements DraggablePreventOnDraggableElementMixinInstance {
    #handler: (e: DraggableCoreMixinEventMap['yac:dragging:start']) => void

    constructor(options: DraggablePreventOnDraggableElementMixinOptions) {
      super(options)
      this.#handler = (e) => this.__draggablePreventOnDraggableElement(e)
    }

    private __draggablePreventOnDraggableElement(
      e: DraggableCoreMixinEventMap['yac:dragging:start']
    ) {
      const originalEvent = e.detail.originalEvent
      const target = originalEvent.target
      if (!(target instanceof HTMLElement)) return

      // only applies to mousedown
      if (originalEvent.type !== 'mousedown') return

      // traverse through target and its parents to check if any of them are draggable
      let el: HTMLElement = target
      let isDraggable = false
      do {
        // the target element itself is meant to be dragged
        if (el.draggable) {
          isDraggable = true
          break
        }

        // no need to traverse beyond container element
        if (el === this.element) break

        // go to parent
        if (el.parentNode) {
          el = el.parentNode as HTMLElement
        } else {
          break
        }
      } while (true)

      // prevent dragging
      if (isDraggable) e.preventDefault()
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
    DraggablePreventOnDraggableElementMixinClass,
    typeof Base
  >
}
