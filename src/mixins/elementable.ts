import { ComposeConstructor } from '../types'

export interface ElementableOptions {
  element: HTMLElement
}

export interface Elementable {
  new (options: ElementableOptions): ElementableInstance
}

export interface ElementableInstance {
  readonly element: HTMLElement
}

export default function Elementable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => any)
    implements ElementableInstance {
    #element: HTMLElement

    constructor({ element, ...otherOptions }: ElementableOptions) {
      super({ element, ...otherOptions })

      this.#element = element
    }

    get element() {
      return this.#element
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Elementable, typeof Base>
}
