import { ComposeConstructor } from '../../../types'
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
        const target = e.detail.originalEvent.target
        if (!(target instanceof HTMLElement)) return

        if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf(target.nodeName) > -1) {
          e.preventDefault()
        }
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
