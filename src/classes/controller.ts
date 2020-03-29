import Core from './core'
import Nudge from './nudge'
import Direction from '../enums/direction'

type Alignment = 'left' | 'right'

interface Options {
  alignment?: Alignment

  container: {
    width: number
    height: number
  }

  items: Item[]

  direction: Direction
}

interface Item {
  width: number
  height: number
  margin: [number, number, number, number]
  leftOffset: number
  topOffset: number
}

export type Action = {
  type: 'itemTranslate'
  index: number
  x?: number
  y?: number
  ease?: string
}

export default class Controller extends Core {
  #alignment: Alignment
  #container: Options['container']
  #items: Options['items']
  #direction: Direction

  private position = 0
  private itemsLength = 0

  constructor({ alignment = 'left', container, items, direction }: Options) {
    super()
    this.#alignment = alignment
    this.#container = container
    this.#items = items
    this.#direction = direction
  }

  private get length() {
    return this.direction === Direction.HORIZONTAL
      ? this.#container.width
      : this.#container.height
  }

  private get direction() {
    return this.#direction
  }

  render() {
    if (!super.render()) return false
    this._calculate()
    return true
  }

  private _calculate() {
    this.itemsLength = this.#items.reduce(
      (length, item) =>
        length +
        (this.direction === Direction.HORIZONTAL ? item.width : item.height),
      0
    )
  }

  set alignment(value: Alignment) {
    if (this.#alignment === value) return
    this.#alignment = value
  }

  select(index: number): Action[] {
    const targetPosition = this.#items
      .slice(0, index)
      .reduce(
        (position, item) =>
          (position -=
            this.direction === Direction.HORIZONTAL ? item.width : item.height),
        0
      )

    const distance = targetPosition - this.position

    return this.nudge({
      nudge: new Nudge({
        x: this.direction === Direction.HORIZONTAL ? distance : 0,
        y: this.direction === Direction.VERTICAL ? distance : 0,
      }),
      ease: true,
    })
  }

  nudge({ nudge, ease = false }: { nudge: Nudge; ease?: boolean }): Action[] {
    // console.log('nudge', nudge)

    const actions: Action[] = []
    let offset = this.direction === Direction.HORIZONTAL ? nudge.x : nudge.y

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
      this.#items.forEach((item, index) => {
        actions.push({
          index,
          type: 'itemTranslate',
          x: this.direction === Direction.HORIZONTAL ? this.position : 0,
          y: this.direction === Direction.VERTICAL ? this.position : 0,
          ease: ease ? `${300 + 'ms'} transform` : '',
        })
      })
    } while (false)

    return actions
  }

  settle(
    {
      nudges = [],
      time = performance.now(),
    }: { nudges: Nudge[]; time?: number } = {
      nudges: [],
      time: performance.now(),
    }
  ): Action[] {
    // console.log('settle')

    const actions: Action[] = []

    if (nudges.length <= 1) return actions

    const nudge1 = nudges[nudges.length - 2]
    const nudge2 = nudges[nudges.length - 1]
    // console.log(nudge1, nudge2)
    const interval = nudge2.time - nudge1.time
    const distance =
      this.direction === Direction.HORIZONTAL
        ? nudge2.x + nudge1.x
        : nudge2.y + nudge1.y
    // console.log(distance)
    const velocity = distance / interval

    const momentumDistance = velocity * 40
    let newPosition = this.position + momentumDistance
    // console.log(this.position, newPosition, this.itemsLength - this.length)
    if (newPosition > 0) newPosition = 0
    else if (newPosition < this.length - this.itemsLength) {
      newPosition = this.length - this.itemsLength
    }
    this.position = newPosition
    // console.log(newPosition)

    this.#items.forEach((item, index) => {
      actions.push({
        index,
        type: 'itemTranslate',
        x: this.direction === Direction.HORIZONTAL ? this.position : 0,
        y: this.direction === Direction.VERTICAL ? this.position : 0,
        ease: `${300 + 'ms'} transform`,
      })
    })

    return actions
  }
}
