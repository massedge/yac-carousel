// container
import Core from './container/core';
import Draggable from './container/draggable';
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
    Nudgeable(
    ElementEventable(
    Elementable(
      Core
    ))))),
    ItemVisible(ElementEventable(ItemCore))
  ))

export default Carousel