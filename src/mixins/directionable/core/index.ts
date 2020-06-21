import { ComposeConstructor } from '../../../types'

import {
  Direction,
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
  MixinEventMap,
} from './types.d'

function DirectionableCore<T extends new (o: any) => MixinBase>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #direction: Direction
    #computedDirection?: Exclude<Direction, 'auto'>

    constructor({ direction = 'auto', ...otherOptions }: MixinOptions) {
      super({ direction, ...otherOptions })
      this.#direction = direction
    }

    get direction() {
      return this.#direction
    }

    set direction(value) {
      if (value === this.#direction) return
      this.#direction = value
      this.refresh()
    }

    get computedDirection() {
      if (this.#computedDirection) return this.#computedDirection

      // trigger computed direction changed event
      const ev: MixinEventMap['yac:computed-direction:compute-auto'] = new CustomEvent(
        'yac:computed-direction:compute-auto',
        {
          cancelable: true,
          bubbles: false,
          detail: {
            computedDirection: 'ltr',
          },
        }
      )
      this.emitter.emit(ev)

      this.#computedDirection = ev.detail.computedDirection
      return this.#computedDirection
    }

    refresh() {
      super.refresh()

      // reset computed direction
      this.#computedDirection =
        this.#direction !== 'auto' ? this.#direction : undefined
    }

    on<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}

export {
  DirectionableCore as default,
  Direction as DirectionableCoreDirection,
  MixinInstance as DirectionableCoreMixinInstance,
}
