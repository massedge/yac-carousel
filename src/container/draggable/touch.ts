import { ComposeConstructor } from "../../types"
import Draggable from './base'
import Elementable from '../elementable'
import Direction from  '../../enums/direction'

export interface TouchDraggableOptions {
}

export interface TouchDraggable {
  new(options?: TouchDraggableOptions): TouchDraggableInstance
}

export interface TouchDraggableInstance {
  render: () => void
  destroy: () => void
}

export default function TouchDraggable<T extends new (o: any) => any>(Base: T) {
  const Base2 = Draggable(Elementable(Base))
  
  class Mixin extends (Base2 as new (...a: any[]) => any) implements TouchDraggableInstance {
    private touchStartFn: (e: TouchEvent) => void
    private touchMoveFn: (e: TouchEvent) => void
    private touchEndFn: (e: TouchEvent) => void
    private touchLastCoordinate: number = 0

    constructor(options?: TouchDraggableOptions) {
      super(options)

      this.touchStartFn = this.touchStart.bind(this);
      this.touchMoveFn = this.touchMove.bind(this);
      this.touchEndFn = this.touchEnd.bind(this);
    }
    
    render() {
      super.render();

      this.element.addEventListener('touchstart', this.touchStartFn);
    }

    private preventDragging(e: TouchEvent) {
      let prevented: boolean = false

      prevented = this.preventDraggingOverride(e, prevented)

      return prevented
    }

    private touchStart(e: TouchEvent) {
      if (this.dragging) {return}
      if (this.preventDragging(e)) {return}

      (this as any).dragging = true;

      this.touchLastCoordinate = this.getTouchEventCoordinate(e);

      this.attachTouchFns()

      this.nudge(0)

      // SAFARI - prevent scrolling the screen while dragging is active
      e.preventDefault();
    }

    private touchMove(e: TouchEvent) {
      const coordinate = this.getTouchEventCoordinate(e);
      const difference = coordinate - this.touchLastCoordinate;
      
      this.nudge(difference);

      this.touchLastCoordinate = coordinate;
    }

    private touchEnd(e: TouchEvent) {
      this.detachTouchFns()

      this.settle();

      (this as any).dragging = false;
    }

    private getTouchEventCoordinate(e: TouchEvent) {
      const touch = e.touches[0];
      return (this.direction === Direction.HORIZONTAL) ? touch.clientX : touch.clientY;
    }

    destroy() {
      this.element.removeEventListener('touchstart', this.touchStartFn);
      this.detachTouchFns()
      super.destroy();
    }

    private attachTouchFns() {
      this.element.ownerDocument.addEventListener('touchmove', this.touchMoveFn);
      this.element.ownerDocument.addEventListener('touchend', this.touchEndFn);
      this.element.ownerDocument.addEventListener('touchcancel', this.touchEndFn);
    }

    private detachTouchFns() {
      this.element.ownerDocument.removeEventListener('touchmove', this.touchMoveFn);
      this.element.ownerDocument.removeEventListener('touchend', this.touchEndFn);
      this.element.ownerDocument.removeEventListener('touchcancel', this.touchEndFn);
    }
  };
  
  return Mixin as unknown as ComposeConstructor<TouchDraggable, typeof Base2>
}
