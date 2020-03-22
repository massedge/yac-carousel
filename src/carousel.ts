// container
import Core from './mixins/container/core'
import ElementEventable from './mixins/container/eventable/element'
import Directionable from './mixins/directionable'
import DraggableCore from './mixins/container/draggable/core'
import DraggableMouse from './mixins/container/draggable/mouse'
import DraggablePointer from './mixins/container/draggable/pointer'
import DraggableTouch from './mixins/container/draggable/touch'
import Elementable from './mixins/container/elementable'
import IndexablePreviousNext from './mixins/container/indexable/previous-next'
import IndexableSelect from './mixins/container/indexable/select'
import Itemizable from './mixins/container/itemizable'
import Nudgeable from './mixins/container/nudgeable'
import Visible from './mixins/container/visible'
import Wheelable from './mixins/container/wheelable'

// item
import ItemCore from './mixins/item/core'
import ItemVisible from './mixins/item/visible'

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
