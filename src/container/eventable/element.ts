import { ComposeConstructor } from "../../types"

export interface ElementEventableOptions {
}

export interface ElementEventable {
  new(options?: ElementEventableOptions): ElementEventableInstance
}

export interface ElementEventableInstance {
  on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(e: CustomEvent): void
}

export interface ElementEventableBase {
  readonly element: HTMLElement
}

export default function ElementEventable<T extends new (o: any) => ElementEventableBase>(Base: T) {
  class Mixin extends (Base as new (options: ElementEventableOptions) => ElementEventableBase) implements ElementEventableInstance {
    on(type: string, listener: (evt: CustomEvent) => void) {
      this.element.addEventListener(
        type,
        // @see https://github.com/Microsoft/TypeScript/issues/28357
        listener as EventListener
      )
    }
  
    off(type: string, listener: (evt: CustomEvent) => void) {
      this.element.removeEventListener(
        type,
        // @see https://github.com/Microsoft/TypeScript/issues/28357
        listener as EventListener
      )
    }

    _emit(e: CustomEvent) {
      this.element.dispatchEvent(e)
    }
  }
  
  return Mixin as unknown as ComposeConstructor<ElementEventable, typeof Base>
}
