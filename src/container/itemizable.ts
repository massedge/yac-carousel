import { ComposeConstructor } from "../helpers/.types"
import Direction from  '../enums/direction'

import Item from '../item/elementable'
import { getBounds } from "../helpers/get-bounds";
import Elementable, { NudgeEventDetail, SettleEventDetail } from "./elementable";
import { EVENT_TYPE_INDEX_CHANGE_AFTER, EVENT_TYPE_INDEX_CHANGE_BEFORE } from "./event-map";

export interface ItemizableOptions {
  container: HTMLElement
  direction?: Direction
}

export interface Itemizable {
  new(options: ItemizableOptions): ItemizableInstance
  itemizable: boolean
}

export interface ItemizableInstance {
  render: () => void
  refresh: () => void
  items: readonly Item[]
}

interface UnsettledNudge {
  offset: number
  time: number
}

export default function Itemizable<T extends new (o: any) => any>(Base: T) {
  const Base2 = Elementable(Base)

  // singleton mixin
  if ((Base as any).itemizable) return Base as ComposeConstructor<Itemizable, typeof Base2>

  class Mixin extends (Base2 as new (...a: any[]) => any) implements ItemizableInstance {
    static itemizable = true

    #options: Required<ItemizableOptions>
    #items: Item[] = []
    private position = 0
    private length = 0
    private itemsLength = 0

    private _unsettledNudges: UnsettledNudge[] = []

    constructor({
      container,
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: ItemizableOptions) {
      super({container, direction, ...otherOptions})

      this.#options = {container, direction}
    }

    get container() {
      return this.#options.container;
    }

    protected get direction() {
      return this.#options.direction
    }

    get items(): readonly Item[] {
      return this.#items
    }

    render() {
      super.render();

      this.#items = Array.from(this.container.children)
        .filter((elItem) => elItem.nodeType == 1)
        .map((child) => {
          return new Item(child as HTMLElement, this.#options.direction)
        })

      this.items.forEach((item) => item.render())
      this._calculate()

      this.on(EVENT_TYPE_INDEX_CHANGE_BEFORE, (e: CustomEvent) => {
        if (e.detail.from === e.detail.to) return e.preventDefault()
        if (e.detail.to < 0) return e.preventDefault()
        if (e.detail.to >= this.items.length) return e.preventDefault()
      })

      this.on(EVENT_TYPE_INDEX_CHANGE_AFTER, (e: CustomEvent) => {
        const fromItem = this.items[e.detail.from]
        const targetItem = this.items[e.detail.to]

        // update active
        fromItem.active = false
        targetItem.active = true

        // new position
        const targetPosition = this.items.slice(0, e.detail.to)
          .reduce((position, item) => position -= item.length, 0)

        this.nudge(targetPosition - this.position, true)
      })

      this.on('yacc:elementable:nudge', (e: CustomEvent<NudgeEventDetail>) => {
        // this._warn('nudge');

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
            offset = 0 - this.position;
            if (offset === 0) break;
          } else if (this.position + offset < this.length - this.itemsLength) {
            // ensure don't go beyond last item
            offset = this.length - this.itemsLength - this.position
            if (offset === 0) break;
          }
    
          this.position += offset;
          this._animateToPosition(this.position, ease)

          shifted = true
        } while (false)

        e.detail.shifted = shifted
      })

      this.on('yacc:elementable:settle', (e: CustomEvent<SettleEventDetail>) => {
        // this._warn('settle');

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
        else if (newPosition < this.length - this.itemsLength) newPosition = this.length - this.itemsLength
        this.position = newPosition
        this._animateToPosition(this.position, true)
        // console.log(newPosition)
      })
    }

    private _animateToPosition(position: number, ease: boolean = false) {
      this.items.forEach((item) => {
        const translate = (this.#options.direction === Direction.HORIZONTAL) ? 'translateX' : 'translateY'
        item.element.style.transform = `${translate}(${position}px)`;
        
        if (!ease) {
          item.element.style.removeProperty('transition')
        } else {
          item.element.style.transition = `${300 + 'ms'} transform`
        }
      });
    }

    refresh() {
      super.refresh()
      this.items.forEach((item) => item.refresh())
      this._calculate()
    }

    _calculate() {
      const bounds = getBounds(this.#options.container)
      this.length = (this.#options.direction === Direction.HORIZONTAL) ? bounds.width : bounds.height
      this.itemsLength = this.items.reduce((length, item) => length + item.length, 0)
    }
  }
  
  return <unknown>Mixin as ComposeConstructor<Itemizable, typeof Base2>
}

