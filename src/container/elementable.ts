import { ComposeConstructor } from '../types'
import Direction from '../enums/direction'

export interface ElementableOptions {
  element: HTMLElement
  direction?: Direction
}

export interface Elementable {
  new (options: ElementableOptions): ElementableInstance
}

export interface ElementableInstance {
  readonly element: HTMLElement
  readonly direction: Direction
}

export default function Elementable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => any)
    implements ElementableInstance {
    #options: Required<Pick<ElementableOptions, 'element' | 'direction'>>

    constructor({
      element,
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: ElementableOptions) {
      super({ element, direction, ...otherOptions })

      this.#options = { element, direction }
    }

    get element() {
      return this.#options.element
    }

    get direction() {
      return this.#options.direction
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Elementable, typeof Base>
}
