import { ComposeConstructor } from "../helpers/.types"
import Direction from  '../enums/direction'

import Item from '../item/elementable'
import { getBounds } from "../helpers/get-bounds";
import ElementEventable from "./element-eventable";
import { EVENT_TYPE_INDEX_CHANGE_AFTER, EVENT_TYPE_INDEX_CHANGE_BEFORE } from "./event-map";

export interface ElementableOptions {
  container: HTMLElement
  direction?: Direction
}

export interface Elementable {
  new(options: ElementableOptions): ElementableInstance
  elementable: boolean
}

export interface ElementableInstance {
  render: () => void
  nudge: (offset: number, ease: boolean) => boolean
  settle: () => void
  refresh: () => void
}

interface UnsettledNudge {
  offset: number
  time: number
}

export default function Elementable<T extends new (o: any) => any>(Base: T) {
  const Base2 = ElementEventable(Base)

  // ensure elementable is not mixed in more than once
  if ((Base as any).elementable) return Base as ComposeConstructor<Elementable, typeof Base2>

  class Mixin extends (Base2 as new (...a: any[]) => any) implements ElementableInstance {
    static elementable = true

    private _container: HTMLElement
    private _items: Item[] = []
    private position = 0
    private length = 0
    private itemsLength = 0

    private _unsettledNudges: UnsettledNudge[] = []

    constructor({
      container,
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: ElementableOptions) {
      super({container, direction, ...otherOptions})

      this._container = container
    }

    get container() {
      return this._container;
    }

    get items() {
      return this._items.slice(0)
    }

    render() {
      super.render();

      this._items = Array.from(this.container.children)
        .filter((elItem) => elItem.nodeType == 1)
        .map((child) => {
          return new Item(child as HTMLElement, this.options.direction)
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
    }

    /**
     * @return returns true if nudge resulted in shifting of items, false otherwise.
     */
    nudge(offset: number, ease: boolean = false): boolean {
      //this._warn(`nudge: ${offset}`);
      
      this._unsettledNudges.push({
        offset,
        time: Date.now(),
      })

      if (offset === 0) {
        // nothing moved
        return false
      } else if (this.itemsLength <= this.length) {
        // length of all items is less than the length of the container
        return false
      } else if (this.position + offset > 0) {
        // ensure don't go beyond first item
        offset = 0 - this.position;
        if (offset === 0) return false;
      } else if (this.position + offset < this.length - this.itemsLength) {
        // ensure don't go beyond last item
        offset = this.length - this.itemsLength - this.position
        if (offset === 0) return false;
      }

      this.position += offset;
      this._animateToPosition(this.position, ease)

      return true
    }

    private _animateToPosition(position: number, ease: boolean = false) {
      this.items.forEach((item) => {
        const translate = (this.options.direction === Direction.HORIZONTAL) ? 'translateX' : 'translateY'
        item.element.style.transform = `${translate}(${position}px)`;
        
        if (!ease) {
          item.element.style.removeProperty('transition')
        } else {
          item.element.style.transition = `${300 + 'ms'} transform`
        }
      });
    }

    settle(ease: boolean = true) {
      this._warn('settle');

      // console.log(this._unsettledNudges)
      const nudges = this._unsettledNudges
      if (nudges.length > 1) {
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
      }
      this._unsettledNudges = []
    }

    refresh() {
      super.refresh()
      this.items.forEach((item) => item.refresh())
      this._calculate()
    }

    _calculate() {
      const bounds = getBounds(this._container)
      this.length = (this.options.direction === Direction.HORIZONTAL) ? bounds.width : bounds.height
      this.itemsLength = this.items.reduce((length, item) => length + item.length, 0)
    }
  }
  
  return <unknown>Mixin as ComposeConstructor<Elementable, typeof Base2>
}

