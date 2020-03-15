import { ComposeConstructor } from "../types"

export interface VisibleOptions {
  element: HTMLElement
}

export interface Visible {
  new(options: VisibleOptions): VisibleInstance
}

export interface VisibleInstance {
  render: () => void
  destroy: () => void
}

export interface VisibleItem {
  readonly element: HTMLElement
  visible: boolean
}


export default function Visible<Item extends VisibleItem, T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => any) implements VisibleInstance {
    static itemizable = true

    #io: IntersectionObserver

    constructor({
      element,
      ...otherOptions
    }: VisibleOptions) {
      super({element, ...otherOptions})

      this.#io = new IntersectionObserver((entries) => {
        entries
          .map(entry => {
            this.items
              .filter((item: Item) => item.element === entry.target)
              .forEach((item: Item) => item.visible = entry.isIntersecting)
          })
      }, {
        root: element,
      })
    }

    render() {
      super.render();
      this.items.map((item: Item) => this.#io.observe(item.element))
    }

    destroy() {
      super.destroy();
      this.items.map((item: Item) => this.#io.unobserve(item.element))
    }
  }
  
  return Mixin as unknown as ComposeConstructor<Visible, typeof Base>
}

