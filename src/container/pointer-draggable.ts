import { ComposeConstructor } from "../types"
import Draggable from '../container/draggable'
import Elementable from '../container/elementable'
import Direction from  '../enums/direction'

export interface PointerDraggableOptions {
}

export interface PointerDraggable {
  new(options?: PointerDraggableOptions): PointerDraggableInstance
}

export interface PointerDraggableInstance {
  render: () => void
  destroy: () => void
}

export default function PointerDraggable<T extends new (o: any) => any>(Base: T) {
  const Base2 = Draggable(Elementable(Base))
  
  class Mixin extends (Base2 as new (...a: any[]) => any) implements PointerDraggableInstance {
    private pointerDownFn: (e: PointerEvent) => void
    private pointerMoveFn: (e: PointerEvent) => void
    private pointerUpFn: (e: PointerEvent) => void
    private pointerLastCoordinate: number = 0

    constructor(options?: PointerDraggableOptions) {
      super(options)

      this.pointerDownFn = this.pointerDown.bind(this);
      this.pointerMoveFn = this.pointerMove.bind(this);
      this.pointerUpFn = this.pointerUp.bind(this);
    }
    
    render() {
      super.render();

      this.element.addEventListener('pointerdown', this.pointerDownFn);
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
      if (this.dragging) {return}
      if (this.preventDragging(e)) {return}

      (this as any).dragging = true;
      
      this.pointerLastCoordinate = this.getMouseEventCoordinate(e);

      this.attachPointerFns()

      this.nudge(0)
    }

    private pointerMove(e: PointerEvent) {
      const coordinate = this.getMouseEventCoordinate(e);
      const difference = coordinate - this.pointerLastCoordinate;
      
      this.nudge(difference);

      this.pointerLastCoordinate = coordinate;
    }

    private pointerUp(e: PointerEvent) {
      this.detachPointerFns()

      this.settle();

      (this as any).dragging = false;
    }

    private getMouseEventCoordinate(e: PointerEvent) {
      return (this.direction === Direction.HORIZONTAL) ? e.clientX : e.clientY;
    }

    destroy() {
      this.element.removeEventListener('pointerdown', this.pointerDownFn);
      this.detachPointerFns()

      super.destroy();
    }

    private attachPointerFns() {
      this.element.ownerDocument.addEventListener('pointermove', this.pointerMoveFn);
      this.element.ownerDocument.addEventListener('pointerup', this.pointerUpFn);
      this.element.ownerDocument.addEventListener('pointercancel', this.pointerUpFn);
    }

    private detachPointerFns() {
      this.element.ownerDocument.removeEventListener('pointermove', this.pointerMoveFn);
      this.element.ownerDocument.removeEventListener('pointerup', this.pointerUpFn);
      this.element.ownerDocument.removeEventListener('pointercancel', this.pointerUpFn);
    }
  };
  
  return Mixin as unknown as ComposeConstructor<PointerDraggable, typeof Base2>
}

