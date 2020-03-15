// base
export {default as Base} from './container/base'

// container
export {default as Itemizable} from './container/itemizable'
export {default as MouseDraggable} from './container/mouse-draggable'
export {default as Navable} from './container/navable'
export {default as PointerDraggable} from './container/pointer-draggable'
export {default as TouchDraggable} from './container/touch-draggable'
export {default as Visible} from './container/visible'
export {default as Wheelable} from './container/wheelable'

// enums
export {default as Direction} from './enums/direction'

// item
export {default as ItemElementable} from './item/elementable'

// default carousel build
import Base from './container/base';
import Itemizable from './container/itemizable';
import MouseDraggable from './container/mouse-draggable';
import PointerDraggable from './container/pointer-draggable';
import TouchDraggable from './container/touch-draggable';
import Visible from './container/visible';
import Wheelable from './container/wheelable';
import ItemElementable from './item/elementable'
import ItemVisible from './item/visible'
import { WithOptional } from './types'

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