import { ComposeConstructor } from '../../../types'

import {
  Direction,
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
} from './types'

export default function DirectionableCoreMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #auto: boolean
    #direction: Direction = 'ltr'

    constructor({ direction, ...otherOptions }: MixinOptions) {
      super({ direction, ...otherOptions })
      this.#auto = !direction
      if (direction) this.#direction = direction
    }

    render() {
      super.render()
      if (this.#auto) this.directionAutoUpdate()
    }

    refresh() {
      super.refresh()
      if (this.#auto) this.directionAutoUpdate()
    }

    get direction() {
      return this.#direction
    }

    set direction(value) {
      this.#auto = false
      if (value === this.#direction) return
      this.#direction = value
      this.refresh()
    }

    directionAutoUpdate(defaultDirection?: Direction) {
      this.#auto = true

      if (defaultDirection && this.#direction !== defaultDirection) {
        this.#direction = defaultDirection
        this.refresh()
      }

      return defaultDirection
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
