import { ComposeConstructor } from "../.types"
import Direction from  '../../enums/direction'

import Item from './item'
import { getBounds } from "./helper";
import ElementEventable from "../element-eventable";
import { EVENT_TYPE_INDEX_CHANGE_AFTER, EVENT_TYPE_INDEX_CHANGE_BEFORE } from "../../event-types";

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
    private animationFrameRequested = false;

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

      if (!this.animationFrameRequested) {
        window.requestAnimationFrame(() => {
          this.items.forEach((item) => {
            const translate = (this.options.direction === Direction.HORIZONTAL) ? 'translateX' : 'translateY'
            item.element.style.transform = `${translate}(${this.position}px)`;
            
            if (!ease) {
              item.element.style.removeProperty('transition')
            } else {
              item.element.style.transition = `${300 + 'ms'} transform`
            }
            this.animationFrameRequested = false;
          });
        });
        this.animationFrameRequested = true;
      }

      return true;
    }

    settle(ease: boolean = true) {
      this._warn('settle');
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

