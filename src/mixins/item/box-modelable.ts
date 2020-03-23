import { ComposeConstructor } from '../../types'
import { getBounds } from '../../utils/get-bounds'

export interface BoxModelableOptions {}

export interface BoxModelable {
  new (options: BoxModelableOptions): BoxModelableInstance
}

export interface BoxModelableInstance {
  readonly width: number
  readonly height: number
}

export interface BoxModelableBase {
  readonly element: HTMLElement
  render(): void
  refresh(): void
}

export default function BoxModelable<
  T extends new (o: any) => BoxModelableBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: BoxModelableOptions) => BoxModelableBase)
    implements BoxModelableInstance {
    #bounds?: ReturnType<typeof getBounds>

    render() {
      this.calculate()
      super.render()
    }

    refresh() {
      this.calculate()
      super.refresh()
    }

    get width() {
      return this.#bounds?.widthMargin || 0
    }

    get height() {
      return this.#bounds?.heightMargin || 0
    }

    private calculate() {
      this.#bounds = getBounds(this.element)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<BoxModelable, typeof Base>
}
