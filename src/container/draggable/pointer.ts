import { ComposeConstructor } from "../../types"
import Direction from  '../../enums/direction'
import { NudgeableInstance } from "../nudgeable"
import { ElementableInstance } from "../elementable"
import { DraggableCoreInstance } from "./core"

export interface DraggablePointerOptions {
}

export interface DraggablePointer {
  new(options: DraggablePointerOptions): DraggablePointerInstance
}

export interface DraggablePointerInstance {
  render: () => void
  destroy: () => void
}

export interface DraggablePointerBase extends
  Pick<ElementableInstance, 'element' | 'direction'>,
  Pick<NudgeableInstance, 'nudge' | 'settle'>,
  Pick<DraggableCoreInstance, '_dragging' | 'preventDraggingOverride'>{
  render(): void
  destroy(): void
}

export default function DraggablePointer<T extends new (o: any) => DraggablePointerBase>(Base: T) {
  class Mixin extends (Base as new (options: DraggablePointerOptions) => DraggablePointerBase) implements DraggablePointerInstance {
    #pointerDownFn: (e: PointerEvent) => void
    #pointerMoveFn: (e: PointerEvent) => void
    #pointerUpFn: (e: PointerEvent) => void
    #pointerLastCoordinate: number = 0

    constructor(options: DraggablePointerOptions) {
      super(options)

      this.#pointerDownFn = this.pointerDown.bind(this);
      this.#pointerMoveFn = this.pointerMove.bind(this);
      this.#pointerUpFn = this.pointerUp.bind(this);
    }
    
    render() {
      super.render();

      this.element.addEventListener('pointerdown', this.#pointerDownFn);
    }

    private preventDragging(e: PointerEvent) {
      let prevented: boolean = false

      if (e.target) {
        if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf((e.target as HTMLElement).nodeName) > -1) prevented = true
      }

      prevented = this.preventDraggingOverride(e, prevented)

      return prevented
    }

    private pointerDown(e: PointerEvent) {
      if (this._dragging) {return}
      if (this.preventDragging(e)) {return}

      this._dragging = true;
      
      this.#pointerLastCoordinate = this.getMouseEventCoordinate(e);

      this.attachPointerFns()

      this.nudge(0)
    }

    private pointerMove(e: PointerEvent) {
      const coordinate = this.getMouseEventCoordinate(e);
      const difference = coordinate - this.#pointerLastCoordinate;
      
      this.nudge(difference);

      this.#pointerLastCoordinate = coordinate;
    }

    private pointerUp(e: PointerEvent) {
      this.detachPointerFns()

      this.settle();

      this._dragging = false;
    }

    private getMouseEventCoordinate(e: PointerEvent) {
      return (this.direction === Direction.HORIZONTAL) ? e.clientX : e.clientY;
    }

    destroy() {
      this.element.removeEventListener('pointerdown', this.#pointerDownFn);
      this.detachPointerFns()

      super.destroy();
    }

    private attachPointerFns() {
      this.element.ownerDocument?.addEventListener('pointermove', this.#pointerMoveFn);
      this.element.ownerDocument?.addEventListener('pointerup', this.#pointerUpFn);
      this.element.ownerDocument?.addEventListener('pointercancel', this.#pointerUpFn);
    }

    private detachPointerFns() {
      this.element.ownerDocument?.removeEventListener('pointermove', this.#pointerMoveFn);
      this.element.ownerDocument?.removeEventListener('pointerup', this.#pointerUpFn);
      this.element.ownerDocument?.removeEventListener('pointercancel', this.#pointerUpFn);
    }
  };
  
  return Mixin as unknown as ComposeConstructor<DraggablePointer, typeof Base>
}

