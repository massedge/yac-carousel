// base class
import Core from './classes/core'

// mixins
import Directionable from './mixins/directionable'
import Elementable from './mixins/elementable'

// container
import ElementEventable from './mixins/container/eventable/element'
import DraggableCore from './mixins/container/draggable/core'
import DraggableMouse from './mixins/container/draggable/mouse'
import DraggablePointer from './mixins/container/draggable/pointer'
import DraggableTouch from './mixins/container/draggable/touch'
import IndexablePreviousNext from './mixins/container/indexable/previous-next'
import IndexableSelect from './mixins/container/indexable/select'
import Itemizable from './mixins/container/itemizable'
import Nudgeable from './mixins/container/nudgeable'
import Visible from './mixins/container/visible'
import Wheelable from './mixins/container/wheelable'

// item
import ItemVisible from './mixins/item/visible'
import ItemActivatable from './mixins/item/activatable'
import ItemBoxModelable from './mixins/item/box-modelable'

export const CarouselItem = ItemBoxModelable(
  ItemActivatable(
    ItemVisible(ElementEventable(Directionable(Elementable(Core))))
  )
)

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
