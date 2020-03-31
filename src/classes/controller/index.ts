import Core from '../core'
import Nudge from '../nudge'
import Direction from '../../enums/direction'

import { Action, Alignment, State } from './types'

export default class Controller extends Core {
  #alignment: Alignment = 'left'
  #container: State['container'] = {
    width: 0,
    height: 0,
  }
  #items: State['items'] = []

  private position: { x: number; y: number } = { x: 0, y: 0 }
  private itemsWidth = 0
  private itemsHeight = 0

  setState({ alignment = 'left', container, items }: State) {
    this.#alignment = alignment
    this.#container = container
    this.#items = items
  }

  private length(direction: Direction) {
    return direction === Direction.HORIZONTAL
      ? this.#container.width
      : this.#container.height
  }

  private itemsLength(direction: Direction) {
    return direction === Direction.HORIZONTAL
      ? this.itemsWidth
      : this.itemsHeight
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

  set alignment(value: Alignment) {
    if (this.#alignment === value) return
    this.#alignment = value
  }

  select(index: number, direction: Direction): Action[] {
    const targetPosition = this.#items
      .slice(0, index)
      .reduce(
        (position, item) =>
          (position -=
            direction === Direction.HORIZONTAL ? item.width : item.height),
        0
      )

    const distance =
      targetPosition -
      (direction === Direction.HORIZONTAL ? this.position.x : this.position.y)

    return this.nudge({
      nudge: new Nudge({
        x: direction === Direction.HORIZONTAL ? distance : 0,
        y: direction === Direction.VERTICAL ? distance : 0,
      }),
      ease: true,
      direction,
    })
  }

  nudge({
    nudge,
    ease = false,
    direction,
  }: {
    nudge: Nudge
    direction: Direction
    ease?: boolean
  }): Action[] {
    // console.log('nudge', nudge, ease, direction)

    const actions: Action[] = []
    let offset = direction === Direction.HORIZONTAL ? nudge.x : nudge.y

    do {
      // console.log(this.position, offset, this.length, this.itemsLength)

      if (offset === 0) {
        // nothing moved
        break
      } else if (this.itemsLength(direction) <= this.length(direction)) {
        // length of all items is less than the length of the container
        break
      } else if (
        this.position[direction === Direction.HORIZONTAL ? 'x' : 'y'] + offset >
        0
      ) {
        // ensure don't go beyond first item
        offset =
          0 - this.position[direction === Direction.HORIZONTAL ? 'x' : 'y']
        if (offset === 0) break
      } else if (
        this.position[direction === Direction.HORIZONTAL ? 'x' : 'y'] + offset <
        this.length(direction) - this.itemsLength(direction)
      ) {
        // ensure don't go beyond last item
        offset =
          this.length(direction) -
          this.itemsLength(direction) -
          this.position[direction === Direction.HORIZONTAL ? 'x' : 'y']
        if (offset === 0) break
      }

      this.position[direction === Direction.HORIZONTAL ? 'x' : 'y'] += offset
      this.#items.forEach((item, index) => {
        actions.push({
          index,
          type: 'itemTranslate',
          x: direction === Direction.HORIZONTAL ? this.position.x : 0,
          y: direction === Direction.VERTICAL ? this.position.y : 0,
          ease: ease ? `${300 + 'ms'} transform` : '',
        })
      })
    } while (false)

    return actions
  }

  settle({
    nudges = [],
    time = performance.now(),
    direction,
  }: {
    nudges: Nudge[]
    time?: number
    direction: Direction
  }): Action[] {
    // console.log('settle')

    const actions: Action[] = []

    if (nudges.length <= 1) return actions

    const nudge1 = nudges[nudges.length - 2]
    const nudge2 = nudges[nudges.length - 1]
    // console.log(nudge1, nudge2)
    const interval = nudge2.time - nudge1.time
    const distance =
      direction === Direction.HORIZONTAL
        ? nudge2.x + nudge1.x
        : nudge2.y + nudge1.y
    // console.log(distance)
    const velocity = distance / interval

    const momentumDistance = velocity * 40
    let newPosition =
      this.position[direction === Direction.HORIZONTAL ? 'x' : 'y'] +
      momentumDistance
    // console.log(this.position, newPosition, this.itemsLength - this.length)
    if (newPosition > 0) newPosition = 0
    else if (
      newPosition <
      this.length(direction) - this.itemsLength(direction)
    ) {
      newPosition = this.length(direction) - this.itemsLength(direction)
    }
    this.position[direction === Direction.HORIZONTAL ? 'x' : 'y'] = newPosition
    // console.log(newPosition)

    this.#items.forEach((item, index) => {
      actions.push({
        index,
        type: 'itemTranslate',
        x: direction === Direction.HORIZONTAL ? this.position.x : 0,
        y: direction === Direction.VERTICAL ? this.position.y : 0,
        ease: `${300 + 'ms'} transform`,
      })
    })

    return actions
  }
}
