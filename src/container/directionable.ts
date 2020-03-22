import { ComposeConstructor } from '../types'
import Direction from '../enums/direction'

export interface DirectionableOptions {
  direction?: Direction
}

export interface Directionable {
  new (options: DirectionableOptions): DirectionableInstance
}

export interface DirectionableInstance {
  readonly direction: Direction
}

export default function Directionable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => any)
    implements DirectionableInstance {
    #direction: Direction

    constructor({
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: DirectionableOptions) {
      super({ direction, ...otherOptions })

      this.#direction = direction
    }

    get direction() {
      return this.#direction
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Directionable, typeof Base>
}
