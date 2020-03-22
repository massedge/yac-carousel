// container
import Core from './container/core'
import ElementEventable from './container/eventable/element'
import Directionable from './container/directionable'
import DraggableCore from './container/draggable/core'
import DraggableMouse from './container/draggable/mouse'
import DraggablePointer from './container/draggable/pointer'
import DraggableTouch from './container/draggable/touch'
import Elementable from './container/elementable'
import IndexablePreviousNext from './container/indexable/previous-next'
import IndexableSelect from './container/indexable/select'
import Itemizable from './container/itemizable'
import Nudgeable from './container/nudgeable'
import Visible from './container/visible'
import Wheelable from './container/wheelable'

// item
import ItemCore from './item/core'
import ItemVisible from './item/visible'

export const CarouselItem = ItemVisible(ElementEventable(ItemCore))

const Carousel = Visible(
  Wheelable(
    DraggableTouch(
      DraggablePointer(
        DraggableMouse(
          DraggableCore(
            IndexablePreviousNext(
              IndexableSelect(
                Itemizable(
                  Nudgeable(ElementEventable(Directionable(Elementable(Core)))),
                  CarouselItem
                )
              )
            )
          )
        )
      )
    )
  )
)

export default Carousel
