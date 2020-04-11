import { ComposeConstructor } from '../../types'
import { Action } from '../../classes/controller/types'

import {
  MixinClass,
  MixinBase,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
} from './types'

export default function Controllable<
  T extends new (o: any) => MixinBase<Item>,
  Item extends MixinItemBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: MixinOptions<Item>) => MixinBase<Item>)
    implements MixinInstance<Item> {
    #controller: MixinOptions<Item>['controller']
    #pendingRequestAnimationFrameId?: number
    #pendingActions: Action[] = []

    constructor({ controller, ...otherOptions }: MixinOptions<Item>) {
      super({ controller, ...otherOptions })
      this.#controller = controller
    }

    render() {
      super.render()

      this.#controller.setState({
        align: this.align,
        direction: this.direction,
        container: {
          width: this.width,
          height: this.height,
        },
        items: this.items.map((item) => ({
          width: item.width,
          height: item.height,
          margin: [0, 0, 0, 0],
          leftOffset: 0,
          topOffset: 0,
        })),
      })

      this.#controller.render()

      this.on('yac:select:before', (e) => {
        if (e.detail.from === e.detail.to) return e.preventDefault()
        if (e.detail.to < 0) return e.preventDefault()
        if (e.detail.to >= this.items.length) return e.preventDefault()
      })

      this.on('yac:select:after', (e) => {
        if (!this.#controller) return

        const fromItem = this.items[e.detail.from]
        const targetItem = this.items[e.detail.to]

        // update active
        fromItem.active = false
        targetItem.active = true

        // new position
        const actions = this.#controller.select(e.detail.to, this.type)
        this._processControllerActions(actions)
      })

      this.on('yac:nudge', (e) => {
        // console.log('nudge');

        if (!this.#controller) return
        if (e.defaultPrevented) return

        const actions = this.#controller.nudge({
          nudge: e.detail.nudge,
          ease: false,
          axis: this.type,
        })
        this._processControllerActions(actions)
      })

      this.on('yac:settle', (e): void => {
        // console.log('settle');

        if (!this.#controller) return
        if (e.defaultPrevented) return

        const actions = this.#controller.settle({
          nudges: e.detail.nudges,
          time: performance.now(),
          axis: this.type,
        })
        this._processControllerActions(actions)
      })
    }

    private _processControllerActions(actions: Action[]) {
      this.#pendingActions = this.#pendingActions.concat(actions)

      if (this.#pendingRequestAnimationFrameId) return

      this.#pendingRequestAnimationFrameId = requestAnimationFrame(() => {
        this.#pendingRequestAnimationFrameId = undefined

        this.#pendingActions.forEach((action) => {
          switch (action.type) {
            case 'itemTranslate':
              const item = this.items[action.index]

              if (action.x !== undefined) item.translateX = action.x
              if (action.y !== undefined) item.translateY = action.y
              item.transition = action.ease !== undefined ? action.ease : ''
              break

            default:
              throw new Error('unsupported action type')
          }
        })

        this.#pendingActions = []
      })
    }

    refresh() {
      super.refresh()
      console.log('TODO: refresh controller')
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass<Item>, typeof Base>
}
