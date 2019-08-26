import { ComposeConstructor } from "./.types"

export interface ElementEvenabledOptions {
}

export interface ElementEventable {
  new(options?: ElementEvenabledOptions): ElementEventableInstance
  elementEventable: boolean
}

export interface ElementEventableInstance {
  on: (type: string, listener: EventListener) => void
  off: (type: string, listener: EventListener) => void
}

export default function ElementEventable<T extends new (o: any) => any>(Base: T) {
  // ensure not mixed in more than once
  if ((Base as any).elementEventable) return Base as ComposeConstructor<ElementEventable, typeof Base>

  class Mixin extends (Base as new (...a: any[]) => {container: HTMLElement}) implements ElementEventableInstance {
      static readonly elementEventable = true

      on(type: string, listener: EventListener) {
        this.container.addEventListener(type, listener)
      }
    
      off(type: string, listener: EventListener) {
        this.container.removeEventListener(type, listener)
      }

      protected _emit(e: Event) {
        this.container.dispatchEvent(e)
      }
  }
  
  return <unknown>Mixin as ComposeConstructor<ElementEventable, typeof Base>
}
