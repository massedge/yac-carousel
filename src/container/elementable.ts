import { ComposeConstructor } from "../types"
import Direction from  '../enums/direction'

import ElementEventable from "./element-eventable";

export interface ElementableOptions {
  element: HTMLElement
  direction?: Direction
}

export interface Elementable {
  new(options: ElementableOptions): ElementableInstance
  elementable: boolean
}

export interface ElementableInstance {
}


export default function Elementable<T extends new (o: any) => any>(Base: T) {
  const Base2 = ElementEventable(Base)

  if (!(Base as any).nudgeable) throw new Error('must be nudgeable')

  // ensure not mixed in more than once
  if ((Base as any).elementable) return Base as ComposeConstructor<Elementable, typeof Base2>

  class Mixin extends (Base2 as new (...a: any[]) => any) implements ElementableInstance {
    static elementable = true

    #options: Required<ElementableOptions>

    constructor({
      element,
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: ElementableOptions) {
      super({element, direction, ...otherOptions})

      this.#options = {element, direction}
    }

    get element() {
      return this.#options.element;
    }

    protected get direction() {
      return this.#options.direction
    }
  }
  
  return Mixin as unknown as ComposeConstructor<Elementable, typeof Base2>
}

