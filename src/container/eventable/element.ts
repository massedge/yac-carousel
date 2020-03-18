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

    protected on(type: string, listener: EventListener) {
      this.element.addEventListener(type, listener)
    }
  
    protected off(type: string, listener: EventListener) {
      this.element.removeEventListener(type, listener)
    }

    protected _emit(e: Event) {
      this.element.dispatchEvent(e)
    }
  }
  
  return Mixin as unknown as ComposeConstructor<ElementEventable, typeof Base>
}
