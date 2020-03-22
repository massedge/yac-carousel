import { ComposeConstructor } from '../../types'
import { getBounds } from '../../utils/get-bounds'
import Direction from '../../enums/direction'

export interface BoxModelableOptions {}

export interface BoxModelable {
  new (options: BoxModelableOptions): BoxModelableInstance
}

export interface BoxModelableInstance {
  readonly length: number
}

export interface BoxModelableBase {
  readonly element: HTMLElement
  readonly direction: Direction
  render(): void
  refresh(): void
}

export default function BoxModelable<
  T extends new (o: any) => BoxModelableBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: BoxModelableOptions) => BoxModelableBase)
    implements BoxModelableInstance {
    #length: number = 0

    get length() {
      return this.#length
    }

    render() {
      this.calculate()
      super.render()
    }

    refresh() {
      this.calculate()
      super.refresh()
    }

    private calculate() {
      const bounds = getBounds(this.element)
      this.#length =
        this.direction === Direction.HORIZONTAL
          ? bounds.widthMargin
          : bounds.heightMargin
    }
  }

  return (Mixin as unknown) as ComposeConstructor<BoxModelable, typeof Base>
}
