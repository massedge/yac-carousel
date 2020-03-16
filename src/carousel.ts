import { WithOptional } from './types'

// container
import Base from './container/base';
import Itemizable from './container/itemizable';
import MouseDraggable from './container/mouse-draggable';
import PointerDraggable from './container/pointer-draggable';
import TouchDraggable from './container/touch-draggable';
import Visible from './container/visible';
import Wheelable from './container/wheelable';

// item
import ItemElementable from './item/elementable'
import ItemVisible from './item/visible'

const Carousel =
  Visible(
  Itemizable(
    Wheelable(
    TouchDraggable(
    PointerDraggable(
    MouseDraggable(
      Base
    )))),
    ItemVisible(ItemElementable)
  ))

export default Carousel