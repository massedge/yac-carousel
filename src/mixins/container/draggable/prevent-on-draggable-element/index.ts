import { ComposeConstructor } from '../../../../types'
import { DRAGGING_START_EVENT, DraggingStartEventDetail } from '../types'
import { MixinBase, MixinInstance, MixinClass, MixinOptions } from './types'

export default function DraggablePreventOnInputElement<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #handler: (e: CustomEvent<DraggingStartEventDetail>) => void

    constructor(options: MixinOptions) {
      super(options)
      this.#handler = (e) => {
        const originalEvent = e.detail.originalEvent
        const target = originalEvent.target
        if (!(target instanceof HTMLElement)) return

        // only applies to mousedown
        if (originalEvent.type !== 'mousedown') return

        // traverse through target and its parents to check if any of them are draggable
        let el: HTMLElement = target
        do {
          // prevent dragging from starting, since the target element itself is meant to be dragged
          if (el.draggable) {
            e.preventDefault()
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
      }
    }

    render() {
      super.render()
      this.on(DRAGGING_START_EVENT, this.#handler)
    }

    destroy() {
      this.off(DRAGGING_START_EVENT, this.#handler)
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
