// base
export {default as Base} from './container/base'

// mixins
export {default as MouseDraggable} from './container/mouse-draggable'
export {default as Navable} from './container/navable'
export {default as PointerDraggable} from './container/pointer-draggable'
export {default as TouchDraggable} from './container/touch-draggable'
export {default as Wheelable} from './container/wheelable'

// enums
export {default as Direction} from './enums/direction'


// default carousel build
import Base from './container/base';
import MouseDraggable from './container/mouse-draggable';
import PointerDraggable from './container/pointer-draggable';
import TouchDraggable from './container/touch-draggable';
import Wheelable from './container/wheelable';

const Carousel =
  Wheelable(
  TouchDraggable(
  PointerDraggable(
  MouseDraggable(
    Base
  ))))

export default Carousel