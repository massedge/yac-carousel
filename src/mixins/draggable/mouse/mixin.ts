import { ComposeConstructor } from '../../../types'
import Nudge from '../../../classes/nudge'
import getFocusableElement from '../../../utils/get-focusable-element'

import {
  DraggableMouseMixinBase,
  DraggableMouseMixinClass,
  DraggableMouseMixinInstance,
  DraggableMouseMixinOptions,
} from './types'

export default function DraggableMouseMixin<
  T extends new (o: any) => DraggableMouseMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DraggableMouseMixinOptions
    ) => DraggableMouseMixinBase)
    implements DraggableMouseMixinInstance {
    #mouseDownFn: (e: MouseEvent) => void
    #mouseMoveFn: (e: MouseEvent) => void
    #mouseUpFn: (e: MouseEvent) => void
    #preventMouseClickFn: (e: MouseEvent) => void
    #mouseLastCoordinate: { x: number; y: number } = { x: 0, y: 0 }

    #mouseDownInfo: {
      timeStamp: number
      x: number
      y: number
      target: HTMLElement | null
    } = {
      timeStamp: 0,
      x: 0,
      y: 0,
      target: null,
    }

    constructor(options: DraggableMouseMixinOptions) {
      super(options)

      this.#mouseDownFn = this.mouseDown.bind(this)
      this.#mouseMoveFn = this.mouseMove.bind(this)
      this.#mouseUpFn = this.mouseUp.bind(this)
      this.#preventMouseClickFn = this.preventMouseClick.bind(this)
    }

    render() {
      super.render()

      this.element.addEventListener('mousedown', this.#mouseDownFn)
    }

    private mouseDown(e: MouseEvent) {
      if (this._dragging) {
        return
      }
      if (this._preventDragging(e)) {
        return
      }

      this._dragging = true

      this.#mouseLastCoordinate = this.getMouseEventCoordinate(e)

      this.attachMouseFns()

      this.nudge({
        nudge: new Nudge(),
        settled: false,
      })

      this.#mouseDownInfo = {
        timeStamp: e.timeStamp,
        x: this.#mouseLastCoordinate.x,
        y: this.#mouseLastCoordinate.y,
        target: e.target instanceof HTMLElement ? e.target : null,
      }
      this.element.removeEventListener('click', this.#preventMouseClickFn, true)

      // prevent focus event, will be triggered manually later
      e.preventDefault()
    }

    private mouseMove(e: MouseEvent) {
      const coordinate = this.getMouseEventCoordinate(e)

      this.nudge({
        nudge: new Nudge({
          x: coordinate.x - this.#mouseLastCoordinate.x,
          y: coordinate.y - this.#mouseLastCoordinate.y,
        }),
        settled: false,
      })

      this.#mouseLastCoordinate = coordinate
    }

    private mouseUp(e: MouseEvent) {
      this.detachMouseFns()

      this.settle()

      this._dragging = false

      // determine whether the user has attempted dragging by
      // 1. checking how long mouse was down
      // 2. distance travelled from starting point
      const coord = this.getMouseEventCoordinate(e)
      if (
        e.timeStamp - this.#mouseDownInfo.timeStamp > 200 ||
        Math.abs(coord.x - this.#mouseDownInfo.x) >= 5 ||
        Math.abs(coord.y - this.#mouseDownInfo.y) >= 5
      ) {
        // don't allow click to propagate
        this.element.addEventListener('click', this.#preventMouseClickFn, true)
      } else {
        if (this.#mouseDownInfo.target) {
          // trigger focus
          const focusableElement = getFocusableElement(
            this.#mouseDownInfo.target
          )
          if (focusableElement && focusableElement !== document.activeElement) {
            focusableElement.focus()
          }
        }
      }
    }

    private preventMouseClick(e: MouseEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()
      this.element.removeEventListener('click', this.#preventMouseClickFn, true)
    }

    private getMouseEventCoordinate(e: MouseEvent) {
      return {
        x: e.clientX,
        y: e.clientY,
      }
    }

    destroy() {
      this.element.removeEventListener('mousedown', this.#mouseDownFn)
      this.detachMouseFns()
      this.element.removeEventListener('click', this.#preventMouseClickFn, true)
      super.destroy()
    }

    private attachMouseFns() {
      this.element.ownerDocument?.addEventListener(
        'mousemove',
        this.#mouseMoveFn
      )
      this.element.ownerDocument?.addEventListener('mouseup', this.#mouseUpFn)
    }

    private detachMouseFns() {
      this.element.ownerDocument?.removeEventListener(
        'mousemove',
        this.#mouseMoveFn
      )
      this.element.ownerDocument?.removeEventListener(
        'mouseup',
        this.#mouseUpFn
      )
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    DraggableMouseMixinClass,
    typeof Base
  >
}
