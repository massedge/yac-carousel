import { ComposeConstructor } from "./.types"
import Draggable from './draggable'
import Elementable from './elementable'
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

      this.container.addEventListener('pointerdown', this.pointerDownFn);
    }

    private preventDragging(e: PointerEvent) {
      let prevented: boolean = false

      if (e.target) {
        if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf((<HTMLElement>e.target).nodeName) > -1) prevented = true
      }

      if (this.options.preventDragging) {
        prevented = this.options.preventDragging(e, prevented)
      }

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
      return (this.options.direction == Direction.HORIZONTAL) ? e.clientX : e.clientY;
    }

    destroy() {
      this.container.removeEventListener('pointerdown', this.pointerDownFn);
      this.detachPointerFns()

      super.destroy();
    }

    private attachPointerFns() {
      this.container.ownerDocument.addEventListener('pointermove', this.pointerMoveFn);
      this.container.ownerDocument.addEventListener('pointerup', this.pointerUpFn);
      this.container.ownerDocument.addEventListener('pointercancel', this.pointerUpFn);
    }

    private detachPointerFns() {
      this.container.ownerDocument.removeEventListener('pointermove', this.pointerMoveFn);
      this.container.ownerDocument.removeEventListener('pointerup', this.pointerUpFn);
      this.container.ownerDocument.removeEventListener('pointercancel', this.pointerUpFn);
    }
  };
  
  return <unknown>Mixin as ComposeConstructor<PointerDraggable, typeof Base2>
}

