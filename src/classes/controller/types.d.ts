import { AlignableCoreAlign2d } from '../../mixins/alignable/core'
import { DirectionableCoreDirection } from '../../mixins/directionable/core'

export interface State {
  align?: AlignableCoreAlign2d

  direction?: DirectionableCoreDirection

  container: {
    width: number
    height: number
  }

  items: Item[]
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
