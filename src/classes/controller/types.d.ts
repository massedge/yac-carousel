import Direction from '../../enums/direction'

export type Alignment = 'left' | 'right'

export interface State {
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
