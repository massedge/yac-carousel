import { ComposeConstructor } from '../../../types'
import { DraggableCoreMixinEventMap } from '../core'
import { MixinBase, MixinInstance, MixinClass, MixinOptions } from './types'

export default function DraggablePreventOnInputElement<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #handler: (e: DraggableCoreMixinEventMap['yac:dragging:start']) => void

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
      this.on('yac:dragging:start', this.#handler)
    }

    destroy() {
      this.off('yac:dragging:start', this.#handler)
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
