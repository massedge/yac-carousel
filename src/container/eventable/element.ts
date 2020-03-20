import { ComposeConstructor } from "../../types"

export interface ElementEventableOptions {
}

export interface ElementEventable {
  new(options?: ElementEventableOptions): ElementEventableInstance
  readonly eventable: true
}

export interface ElementEventableInstance {
}

export default function ElementEventable<T extends new (o: any) => any>(Base: T) {
  if (!(Base as any).elementable) throw new Error('must be elementable')

  class Mixin extends (Base as new (...a: any[]) => {element: HTMLElement}) implements ElementEventableInstance {
    static readonly eventable = true

    protected on(type: string, listener: (evt: CustomEvent) => void) {
      this.element.addEventListener(
        type,
        // @see https://github.com/Microsoft/TypeScript/issues/28357
        listener as EventListener
      )
    }
  
    protected off(type: string, listener: (evt: CustomEvent) => void) {
      this.element.removeEventListener(
        type,
        // @see https://github.com/Microsoft/TypeScript/issues/28357
        listener as EventListener
      )
    }

    protected _emit(e: CustomEvent) {
      this.element.dispatchEvent(e)
    }
  }
  
  return Mixin as unknown as ComposeConstructor<ElementEventable, typeof Base>
}
