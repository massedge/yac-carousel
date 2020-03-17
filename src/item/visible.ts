import { ComposeConstructor } from "../types"

export interface VisibleOptions {
}

export interface Visible {
  new(options: VisibleOptions): VisibleInstance
}

export interface VisibleInstance {
  visible: boolean
  render: () => void
}

export interface VisibleEventDetail {
  visible: boolean
}

export default function Visible<T extends new (o: any) => any>(Base: T) {
  if (!(Base as any).eventable) throw new Error('must be eventable')

  class Mixin extends (Base as new (...a: any[]) => any) implements VisibleInstance {
    #visible: boolean = false
    
    render() {
      super.render()
    }

    get visible() {
      return this.#visible
    }
  
    set visible(value: boolean) {
      this.#visible = value

      // trigger event
      const event = new CustomEvent<VisibleEventDetail>('yacc:item:visible', {
        detail: {
          visible: this.#visible
        }
      });
      this._emit(event);
    }
  }
  
  return Mixin as unknown as ComposeConstructor<Visible, typeof Base>
}

