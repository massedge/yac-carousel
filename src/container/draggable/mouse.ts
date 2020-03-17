import { ComposeConstructor } from "../../types"
import Direction from  '../../enums/direction'

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
  if (!(Base as any).elementable) throw new Error('must be elementable')
  if (!(Base as any).nudgeable) throw new Error('must be nudgeable')
  if (!(Base as any).draggable) throw new Error('must be draggable')

  class Mixin extends (Base as new (...a: any[]) => any) implements MouseDraggableInstance {
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

      this.element.addEventListener('mousedown', this.mouseDownFn);
    }

    private preventDragging(e: MouseEvent): boolean {
      let prevented: boolean = false

      if (e.target) {
        if ((e.target as HTMLElement).draggable) {
          prevented = true
        } else if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf((e.target as HTMLElement).nodeName) > -1) {
          prevented = true
        }
      }

      prevented = this.preventDraggingOverride(e, prevented)

      return prevented
    }

    private mouseDown(e: MouseEvent) {
      if (this.dragging) {return}
      if (this.preventDragging(e)) {return}

      (this as any).dragging = true;
      
      this.mouseLastCoordinate = this.getMouseEventCoordinate(e);

      this.attachMouseFns()
      
      this.nudge(0)
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
      return (this.direction === Direction.HORIZONTAL) ? e.clientX : e.clientY;
    }

    destroy() {
      this.element.removeEventListener('mousedown', this.mouseDownFn);
      this.detachMouseFns()
      super.destroy();
    }

    private attachMouseFns() {
      this.element.ownerDocument.addEventListener('mousemove', this.mouseMoveFn);
      this.element.ownerDocument.addEventListener('mouseup', this.mouseUpFn);
    }

    private detachMouseFns() {
      this.element.ownerDocument.removeEventListener('mousemove', this.mouseMoveFn);
      this.element.ownerDocument.removeEventListener('mouseup', this.mouseUpFn);
    }
  }
  
  return Mixin as unknown as ComposeConstructor<MouseDraggable, typeof Base>
}
