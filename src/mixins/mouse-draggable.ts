import { ComposeConstructor } from "./.types"
import Draggable from './draggable'
import Elementable from './elementable'
import Direction from  '../enums/direction'

export interface MouseDraggableOptions {
}

export interface MouseDraggable {
  new(options?: MouseDraggableOptions): MouseDraggableInstance
}

export interface MouseDraggableInstance {
  render: () => void
  destroy: () => void
}

export default function MouseDraggable<T extends new (o: any) => any>(Base: T) {
  const Base2 = Draggable(Elementable(Base))

  class Mixin extends (Base2 as new (...a: any[]) => any) implements MouseDraggableInstance {
    private mouseDownFn: (e: MouseEvent) => void
    private mouseMoveFn: (e: MouseEvent) => void
    private mouseUpFn: (e: MouseEvent) => void
    private mouseLastCoordinate: number = 0

    constructor(options?: MouseDraggableOptions) {
      super(options)

      this.mouseDownFn = this.mouseDown.bind(this);
      this.mouseMoveFn = this.mouseMove.bind(this);
      this.mouseUpFn = this.mouseUp.bind(this);
    }
    
    render() {
      super.render();

      this.container.addEventListener('mousedown', this.mouseDownFn);
    }

    private preventDragging(e: MouseEvent): boolean {
      let prevented: boolean = false

      if (e.target) {
        if ((<HTMLElement>e.target).draggable) {
          prevented = true
        } else if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf((<HTMLElement>e.target).nodeName) > -1) {
          prevented = true
        }
      }

      if (this.options.preventDragging) {
        prevented = this.options.preventDragging(e, prevented)
      }

      return prevented
    }

    private mouseDown(e: MouseEvent) {
      if (this.dragging) {return}
      if (this.preventDragging(e)) {return}

      (this as any).dragging = true;
      
      this.mouseLastCoordinate = this.getMouseEventCoordinate(e);

      this.attachMouseFns()
    }

    private mouseMove(e: MouseEvent) {
      const coordinate = this.getMouseEventCoordinate(e);
      const difference = coordinate - this.mouseLastCoordinate;
      
      this.nudge(difference);

      this.mouseLastCoordinate = coordinate;
    }

    private mouseUp(e: MouseEvent) {
      this.detachMouseFns()

      this.settle();

      (this as any).dragging = false;
    }

    private getMouseEventCoordinate(e: MouseEvent) {
      return (this.options.direction === Direction.HORIZONTAL) ? e.clientX : e.clientY;
    }

    destroy() {
      this.container.removeEventListener('mousedown', this.mouseDownFn);
      this.detachMouseFns()
      super.destroy();
    }

    private attachMouseFns() {
      this.container.ownerDocument.addEventListener('mousemove', this.mouseMoveFn);
      this.container.ownerDocument.addEventListener('mouseup', this.mouseUpFn);
    }

    private detachMouseFns() {
      this.container.ownerDocument.removeEventListener('mousemove', this.mouseMoveFn);
      this.container.ownerDocument.removeEventListener('mouseup', this.mouseUpFn);
    }
  }
  
  return <unknown>Mixin as ComposeConstructor<MouseDraggable, typeof Base2>
}
