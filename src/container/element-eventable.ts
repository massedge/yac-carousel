import { ComposeConstructor } from "../types"

export interface ElementEventabledOptions {
}

export interface ElementEventable {
  new(options?: ElementEventabledOptions): ElementEventableInstance
  elementEventable: boolean
}

export interface ElementEventableInstance {
  on: (type: string, listener: EventListener) => void
  off: (type: string, listener: EventListener) => void
}

export default function ElementEventable<T extends new (o: any) => any>(Base: T) {
  // ensure not mixed in more than once
  if ((Base as any).elementEventable) return Base as ComposeConstructor<ElementEventable, typeof Base>

  class Mixin extends (Base as new (...a: any[]) => {element: HTMLElement}) implements ElementEventableInstance {
      static readonly elementEventable = true

      on(type: string, listener: EventListener) {
        this.element.addEventListener(type, listener)
      }
    
      off(type: string, listener: EventListener) {
        this.element.removeEventListener(type, listener)
      }

      protected _emit(e: Event) {
        this.element.dispatchEvent(e)
      }
  }
  
  return Mixin as unknown as ComposeConstructor<ElementEventable, typeof Base>
}
