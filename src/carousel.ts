// container
import Base from './container/base';
import Draggable from './container/draggable';
import ElementEventable from './container/eventable/element';
import Elementable from './container/elementable';
import Itemizable from './container/itemizable';
import Nudgeable from './container/nudgeable';
import Visible from './container/visible';
import Wheelable from './container/wheelable';

// item
import ItemBase from './item/base'
import ItemVisible from './item/visible'

const Carousel =
  Visible(
  Itemizable(
    Wheelable(
    Draggable(
    Nudgeable(
    ElementEventable(
    Elementable(
      Base
    ))))),
    ItemVisible(ElementEventable(ItemBase))
  ))

export default Carousel