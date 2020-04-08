import Core from '../core'
import Nudge from '../nudge'

import { Action, State } from './types'

export default class Controller extends Core {
  #align: NonNullable<State['align']> = ['start', 'start']
  #direction: NonNullable<State['direction']> = 'ltr'
  #container: State['container'] = {
    width: 0,
    height: 0,
  }
  #items: State['items'] = []

  private position: { x: number; y: number } = { x: 0, y: 0 }
  private itemsWidth = 0
  private itemsHeight = 0

  setState({ align, direction, container, items }: State) {
    if (align) this.#align = align
    if (direction) this.#direction = direction
    this.#container = container
    this.#items = items
  }

  private length(axis: 'horizontal' | 'vertical') {
    return axis === 'horizontal'
      ? this.#container.width
      : this.#container.height
  }

  private itemsLength(axis: 'horizontal' | 'vertical') {
    return axis === 'horizontal' ? this.itemsWidth : this.itemsHeight
  }

  render() {
    super.render()
    this._calculate()
  }

  private _calculate() {
    this.itemsWidth = this.#items.reduce(
      (length, item) => length + item.width,
      0
    )

    this.itemsHeight = this.#items.reduce(
      (length, item) => length + item.height,
      0
    )
  }

  set alignment(value: NonNullable<State['align']>) {
    if (this.#align === value) return
    this.#align = value
  }

  select(index: number, axis: 'horizontal' | 'vertical'): Action[] {
    const targetPosition = this.#items
      .slice(0, index)
      .reduce(
        (position, item) =>
          (position -= axis === 'horizontal' ? item.width : item.height),
        0
      )

    const distance =
      targetPosition -
      (axis === 'horizontal' ? this.position.x : this.position.y)

    return this.nudge({
      nudge: new Nudge({
        x: axis === 'horizontal' ? distance : 0,
        y: axis === 'vertical' ? distance : 0,
      }),
      ease: true,
      axis,
    })
  }

  nudge({
    nudge,
    ease = false,
    axis,
  }: {
    nudge: Nudge
    axis: 'horizontal' | 'vertical'
    ease?: boolean
  }): Action[] {
    // console.log('nudge', nudge, ease, axis)

    const actions: Action[] = []
    let offset = axis === 'horizontal' ? nudge.x : nudge.y

    do {
      // console.log(this.position, offset, this.length, this.itemsLength)

      if (offset === 0) {
        // nothing moved
        break
      } else if (this.itemsLength(axis) <= this.length(axis)) {
        // length of all items is less than the length of the container
        break
      } else if (
        this.position[axis === 'horizontal' ? 'x' : 'y'] + offset >
        0
      ) {
        // ensure don't go beyond first item
        offset = 0 - this.position[axis === 'horizontal' ? 'x' : 'y']
        if (offset === 0) break
      } else if (
        this.position[axis === 'horizontal' ? 'x' : 'y'] + offset <
        this.length(axis) - this.itemsLength(axis)
      ) {
        // ensure don't go beyond last item
        offset =
          this.length(axis) -
          this.itemsLength(axis) -
          this.position[axis === 'horizontal' ? 'x' : 'y']
        if (offset === 0) break
      }

      this.position[axis === 'horizontal' ? 'x' : 'y'] += offset
      this.#items.forEach((item, index) => {
        actions.push({
          index,
          type: 'itemTranslate',
          x: axis === 'horizontal' ? this.position.x : 0,
          y: axis === 'vertical' ? this.position.y : 0,
          ease: ease ? `${300 + 'ms'} transform` : '',
        })
      })
    } while (false)

    return actions
  }

  settle({
    nudges = [],
    time = performance.now(),
    axis,
  }: {
    nudges: Nudge[]
    time?: number
    axis: 'horizontal' | 'vertical'
  }): Action[] {
    // console.log('settle')

    const actions: Action[] = []

    if (nudges.length <= 1) return actions

    const nudge1 = nudges[nudges.length - 2]
    const nudge2 = nudges[nudges.length - 1]
    // console.log(nudge1, nudge2)
    const interval = nudge2.time - nudge1.time
    const distance =
      axis === 'horizontal' ? nudge2.x + nudge1.x : nudge2.y + nudge1.y
    // console.log(distance)
    const velocity = distance / interval

    const momentumDistance = velocity * 40
    let newPosition =
      this.position[axis === 'horizontal' ? 'x' : 'y'] + momentumDistance
    // console.log(this.position, newPosition, this.itemsLength - this.length)
    if (newPosition > 0) newPosition = 0
    else if (newPosition < this.length(axis) - this.itemsLength(axis)) {
      newPosition = this.length(axis) - this.itemsLength(axis)
    }
    this.position[axis === 'horizontal' ? 'x' : 'y'] = newPosition
    // console.log(newPosition)

    this.#items.forEach((item, index) => {
      actions.push({
        index,
        type: 'itemTranslate',
        x: axis === 'horizontal' ? this.position.x : 0,
        y: axis === 'vertical' ? this.position.y : 0,
        ease: `${300 + 'ms'} transform`,
      })
    })

    return actions
  }
}
