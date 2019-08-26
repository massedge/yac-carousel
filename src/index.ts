// base
export {default as Base} from './base'

// mixins
export {default as MouseDraggable} from './mixins/mouse-draggable'
export {default as Navable} from './mixins/navable'
export {default as PointerDraggable} from './mixins/pointer-draggable'
export {default as TouchDraggable} from './mixins/touch-draggable'
export {default as Wheelable} from './mixins/wheelable'

// enums
export {default as Direction} from './enums/direction'


// default carousel build
import Base from './base';
import MouseDraggable from './mixins/mouse-draggable';
import PointerDraggable from './mixins/pointer-draggable';
import TouchDraggable from './mixins/touch-draggable';
import Wheelable from './mixins/wheelable';

const Carousel =
  Wheelable(
  TouchDraggable(
  PointerDraggable(
  MouseDraggable(
    Base
  ))))

export default Carousel