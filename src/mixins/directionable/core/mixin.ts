import { ComposeConstructor } from '../../../types'

import {
  Direction,
  DirectionableCoreMixinBase,
  DirectionableCoreMixinClass,
  DirectionableCoreMixinInstance,
  DirectionableCoreMixinOptions,
  DirectionableCoreMixinEventMap,
} from './types'

/**
 * Adds `direction` and `computedDirection` properties. `computedDirection` property
 * should be used to determine what is the actual direction when `direction` is `auto`.
 * Other mixins can use the `yac:computed-direction:compute-auto` event
 * to override the `computedDirection` value when `direction` is `auto`.
 * @param Base
 */
export default function DirectionableCoreMixin<
  T extends new (o: any) => DirectionableCoreMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DirectionableCoreMixinOptions
    ) => DirectionableCoreMixinBase)
    implements DirectionableCoreMixinInstance {
    #direction: Direction
    #computedDirection?: Exclude<Direction, 'auto'>

    constructor({
      direction = 'auto',
      ...otherOptions
    }: DirectionableCoreMixinOptions) {
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
      const ev: DirectionableCoreMixinEventMap['yac:computed-direction:compute-auto'] = new CustomEvent(
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

    on<K extends keyof DirectionableCoreMixinEventMap>(
      type: K,
      listener: (ev: DirectionableCoreMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof DirectionableCoreMixinEventMap>(
      type: K,
      listener: (ev: DirectionableCoreMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    DirectionableCoreMixinClass,
    typeof Base
  >
}
