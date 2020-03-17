import { WithOptional } from './types'

// container
import Base from './container/base';
import Draggable from './container/draggable/base';
import ElementEventable from './container/element-eventable';
import Elementable from './container/elementable';
import Itemizable from './container/itemizable';
import MouseDraggable from './container/draggable/mouse';
import Nudgeable from './container/nudgeable';
import PointerDraggable from './container/draggable/pointer';
import TouchDraggable from './container/draggable/touch';
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
    Draggable(
    Elementable(
    ElementEventable(
    Nudgeable(
      Base
    )))))))),
    ItemVisible(ItemElementable)
  ))

export default Carousel