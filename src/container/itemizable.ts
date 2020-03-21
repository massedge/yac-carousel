import { ComposeConstructor } from '../types'
import Direction from '../enums/direction'

import { getBounds } from '../utils/get-bounds'
import { NudgeableEventMap, NUDGE_EVENT, SETTLE_EVENT } from './nudgeable'
import { SELECT_BEFORE_EVENT, SELECT_AFTER_EVENT } from './indexable/select'
import { IndexableSelectEventDetail } from './indexable/select/types'

export interface ItemizableOptions<Item extends ElementableItem> {
  element: HTMLElement
  itemConstructor?: new (options: {
    element: HTMLElement
    direction?: Direction
  }) => Item
  direction?: Direction
}

export interface Itemizable<Item extends ElementableItem> {
  new (options: ItemizableOptions<Item>): ItemizableInstance<Item>
}

export interface ItemizableInstance<Item extends ElementableItem> {
  render: () => void
  refresh: () => void
  items: readonly Item[]
}

export interface ItemizableBase {
  readonly element: HTMLElement
  render(): void
  refresh(): void
  nudge: (offset: number, ease: boolean) => boolean
  on: (type: string, listener: (ev: CustomEvent) => void) => void
  off: (type: string, listener: (ev: CustomEvent) => void) => void
}

export interface ElementableItem {
  active: boolean
  readonly length: number
  readonly element: HTMLElement
  render: () => void
  destroy: () => void
  refresh: () => void
}

export default function Itemizable<
  T extends new (o: any) => ItemizableBase,
  Item extends ElementableItem
>(
  Base: T,
  defaultItemConstructor: NonNullable<
    ItemizableOptions<Item>['itemConstructor']
  >
) {
  class Mixin
    extends (Base as new (options: ItemizableOptions<Item>) => ItemizableBase)
    implements ItemizableInstance<Item> {
    #options: Required<ItemizableOptions<Item>>
    #items: Item[] = []
    private position = 0
    private length = 0
    private itemsLength = 0

    constructor({
      element,
      itemConstructor = defaultItemConstructor,
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: ItemizableOptions<Item>) {
      super({ element, direction, ...otherOptions })

      this.#options = { element, direction, itemConstructor }
    }

    get element() {
      return this.#options.element
    }

    protected get direction() {
      return this.#options.direction
    }

    get items(): readonly Item[] {
      return this.#items
    }

    render() {
      super.render()

      this.#items = Array.from(this.element.children)
        .filter((elItem) => elItem.nodeType === 1)
        .map((child) => {
          return new this.#options.itemConstructor({
            element: child as HTMLElement,
            direction: this.#options.direction,
          })
        })

      this.items.forEach((item) => item.render())
      this._calculate()

      this.on(
        SELECT_BEFORE_EVENT,
        (e: CustomEvent<IndexableSelectEventDetail>) => {
          if (e.detail.from === e.detail.to) return e.preventDefault()
          if (e.detail.to < 0) return e.preventDefault()
          if (e.detail.to >= this.items.length) return e.preventDefault()
        }
      )

      this.on(
        SELECT_AFTER_EVENT,
        (e: CustomEvent<IndexableSelectEventDetail>) => {
          const fromItem = this.items[e.detail.from]
          const targetItem = this.items[e.detail.to]

          // update active
          fromItem.active = false
          targetItem.active = true

          // new position
          const targetPosition = this.items
            .slice(0, e.detail.to)
            .reduce((position, item) => (position -= item.length), 0)

          this.nudge(targetPosition - this.position, true)
        }
      )

      this.on(NUDGE_EVENT, (e: NudgeableEventMap[typeof NUDGE_EVENT]) => {
        // console.log('nudge');

        if (e.defaultPrevented) return

        let offset = e.detail.offset
        const ease = e.detail.ease
        let shifted = false

        do {
          // console.log(this.position, offset, this.length, this.itemsLength)

          if (offset === 0) {
            // nothing moved
            break
          } else if (this.itemsLength <= this.length) {
            // length of all items is less than the length of the container
            break
          } else if (this.position + offset > 0) {
            // ensure don't go beyond first item
            offset = 0 - this.position
            if (offset === 0) break
          } else if (this.position + offset < this.length - this.itemsLength) {
            // ensure don't go beyond last item
            offset = this.length - this.itemsLength - this.position
            if (offset === 0) break
          }

          this.position += offset
          this._animateToPosition(this.position, ease)

          shifted = true
        } while (false)

        e.detail.shifted = shifted
      })

      this.on(SETTLE_EVENT, (e: NudgeableEventMap[typeof SETTLE_EVENT]) => {
        // console.log('settle');

        const nudges = e.detail.unsettledNudges
        // console.log(nudges)

        if (nudges.length <= 1) return

        const nudge1 = nudges[nudges.length - 2]
        const nudge2 = nudges[nudges.length - 1]
        // console.log(nudge1, nudge2)
        const interval = nudge2.time - nudge1.time
        const distance = nudge2.offset + nudge2.offset
        // console.log(distance)
        const velocity = distance / interval

        const momentumDistance = velocity * 40
        let newPosition = this.position + momentumDistance
        // console.log(this.position, newPosition, this.itemsLength - this.length)
        if (newPosition > 0) newPosition = 0
        else if (newPosition < this.length - this.itemsLength)
          newPosition = this.length - this.itemsLength
        this.position = newPosition
        this._animateToPosition(this.position, true)
        // console.log(newPosition)
      })
    }

    private _animateToPosition(position: number, ease: boolean = false) {
      this.items.forEach((item) => {
        const translate =
          this.#options.direction === Direction.HORIZONTAL
            ? 'translateX'
            : 'translateY'
        item.element.style.transform = `${translate}(${position}px)`

        if (!ease) {
          item.element.style.removeProperty('transition')
        } else {
          item.element.style.transition = `${300 + 'ms'} transform`
        }
      })
    }

    refresh() {
      super.refresh()
      this.items.forEach((item) => item.refresh())
      this._calculate()
    }

    _calculate() {
      const bounds = getBounds(this.#options.element)
      this.length =
        this.#options.direction === Direction.HORIZONTAL
          ? bounds.width
          : bounds.height
      this.itemsLength = this.items.reduce(
        (length, item) => length + item.length,
        0
      )
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Itemizable<Item>, typeof Base>
}
