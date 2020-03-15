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

const Item = ItemVisible(ItemElementable)

const CarouselElementable = Wheelable(
  TouchDraggable(
  PointerDraggable(
  MouseDraggable(
    Base
  ))))
const CarouselContainer = Visible(Itemizable<InstanceType<typeof Item>, typeof CarouselElementable>(CarouselElementable))

type CarouselOptions = WithOptional<ConstructorParameters<typeof CarouselContainer>[0], 'itemConstructor'>

class Carousel extends CarouselContainer {
  constructor(options: CarouselOptions) {
    super({
      ...options,
      itemConstructor: Item
    })
  }
}

export default Carousel