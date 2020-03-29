import { ComposeConstructor } from '../../../../types'
import Direction from '../../../../enums/direction'
import { Action } from '../../../../classes/controller'

import { NUDGE_EVENT, SETTLE_EVENT } from '../../nudgeable'
import { MixinEventMap as NudgeableEventMap } from '../../nudgeable/types'
import { SELECT_BEFORE_EVENT, SELECT_AFTER_EVENT } from '../../indexable/select'
import { IndexableSelectEventDetail } from '../../indexable/select/types'

import {
  MixinClass,
  MixinBase,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
} from './types'

export default function MixinItemizableController<
  T extends new (o: any) => MixinBase<Item>,
  Item extends MixinItemBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: MixinOptions<Item>) => MixinBase<Item>)
    implements MixinInstance<Item> {
    #controllerConstructor: MixinOptions<Item>['controllerConstructor']
    #controller?: InstanceType<MixinOptions<Item>['controllerConstructor']>

    constructor({
      controllerConstructor,
      ...otherOptions
    }: MixinOptions<Item>) {
      super({ controllerConstructor, ...otherOptions })
      this.#controllerConstructor = controllerConstructor
    }

    render() {
      if (!super.render()) return false

      this.#controller = new this.#controllerConstructor({
        alignment: 'left',
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

      this.on(
        SELECT_BEFORE_EVENT,
        (e: CustomEvent<IndexableSelectEventDetail>) => {
          if (e.detail.from === e.detail.to) return e.preventDefault()
          if (e.detail.to < 0) return e.preventDefault()
          if (e.detail.to >= this.items.length) return e.preventDefault()
        }
      )

      this.on(
        SELECT_AFTER_EVENT,
        (e: CustomEvent<IndexableSelectEventDetail>) => {
          if (!this.#controller) return

          const fromItem = this.items[e.detail.from]
          const targetItem = this.items[e.detail.to]

          // update active
          fromItem.active = false
          targetItem.active = true

          // new position
          const actions = this.#controller.select(e.detail.to)
          this._processControllerActions(actions)
        }
      )

      this.on(NUDGE_EVENT, (e: NudgeableEventMap[typeof NUDGE_EVENT]) => {
        // console.log('nudge');

        if (!this.#controller) return
        if (e.defaultPrevented) return

        const actions = this.#controller.nudge({
          nudge: e.detail.nudge,
          ease: false,
        })
        this._processControllerActions(actions)
      })

      this.on(
        SETTLE_EVENT,
        (e: NudgeableEventMap[typeof SETTLE_EVENT]): void => {
          // console.log('settle');

          if (!this.#controller) return
          if (e.defaultPrevented) return

          const actions = this.#controller.settle({
            nudges: e.detail.unsettledNudges,
            time: performance.now(),
          })
          this._processControllerActions(actions)
        }
      )

      return true
    }

    private _processControllerActions(actions: Action[]) {
      actions.forEach((action) => {
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
    }

    refresh() {
      super.refresh()
      console.log('TODO: refresh controller')
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass<Item>, typeof Base>
}