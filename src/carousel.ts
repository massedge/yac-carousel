// container
import Core from './container/core';
import Draggable from './container/draggable';
import DraggableCore from './container/draggable/core';
import DraggableMouse from './container/draggable/mouse';
import DraggablePointer from './container/draggable/pointer';
import DraggableTouch from './container/draggable/touch';
import ElementEventable from './container/eventable/element';
import Elementable from './container/elementable';
import Itemizable from './container/itemizable';
import Nudgeable from './container/nudgeable';
import Visible from './container/visible';
import Wheelable from './container/wheelable';

// item
import ItemCore from './item/core'
import ItemVisible from './item/visible'

const Carousel =
  Visible(
  Itemizable(
    Wheelable(
    Draggable(
    // DraggableTouch(DraggablePointer(DraggableMouse(DraggableCore(
      Nudgeable(
      ElementEventable(
      Elementable(
        Core
      )))
    // ))))
    )
    )
    ,
    ItemVisible(ElementEventable(ItemCore))
  ))

export default Carousel