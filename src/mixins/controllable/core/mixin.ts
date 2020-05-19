import { ComposeConstructor } from '../../../types'

import {
  ControllableCoreMixinAction as Action,
  ControllableCoreMixinBase,
  ControllableCoreMixinClass,
  ControllableCoreMixinInstance,
  ControllableCoreMixinControllerItem,
  ControllableCoreMixinItemBase,
  ControllableCoreMixinOptions,
} from './types'

export default function ControllableCoreMixin<
  T extends new (o: any) => ControllableCoreMixinBase<Item>,
  Item extends ControllableCoreMixinItemBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableCoreMixinOptions
    ) => ControllableCoreMixinBase<Item>)
    implements ControllableCoreMixinInstance {
    #pendingRequestAnimationFrameId?: number
    #pendingActions: Action[] = []
    _controllerItems: ControllableCoreMixinControllerItem[] = []

    _position: { x: number; y: number } = { x: 0, y: 0 }
    private itemsWidth = 0
    private itemsHeight = 0

    render() {
      super.render()

      this._controllerItems = this.items.map((item) => {
        return {
          width: item.width,
          height: item.height,
          margin: [0, 0, 0, 0],
          leftOffset: 0,
          topOffset: 0,
        }
      })

      this._calculate()
    }

    _length(axis: 'horizontal' | 'vertical') {
      return axis === 'horizontal' ? this.width : this.height
    }

    _itemsLength(axis: 'horizontal' | 'vertical') {
      return axis === 'horizontal' ? this.itemsWidth : this.itemsHeight
    }

    private _calculate() {
      this.itemsWidth = this._controllerItems.reduce(
        (length, item) => length + item.width,
        0
      )

      this.itemsHeight = this._controllerItems.reduce(
        (length, item) => length + item.height,
        0
      )
    }

    _processControllerActions(actions: Action[]) {
      this.#pendingActions = this.#pendingActions.concat(actions)

      if (this.#pendingRequestAnimationFrameId) return

      this.#pendingRequestAnimationFrameId = requestAnimationFrame(() => {
        this.#pendingRequestAnimationFrameId = undefined

        this.#pendingActions.forEach((action) => {
          switch (action.type) {
            case 'itemTranslate':
              const item = this.items[action.index]

              item.transition = action.ease !== undefined ? action.ease : ''

              if (action.x !== undefined || action.y !== undefined) {
                // TODO: add logic to clear timeout when necessary
                setTimeout(() => {
                  if (item.destroyed) return
                  if (action.x !== undefined) item.translateX = action.x
                  if (action.y !== undefined) item.translateY = action.y
                }, 0)
              }
              break

            default:
              throw new Error('unsupported action type')
          }
        })

        this.#pendingActions = []
      })
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableCoreMixinClass,
    typeof Base
  >
}
