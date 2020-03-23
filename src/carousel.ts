// base class
import Core from './classes/core'

// mixins
import BoxModelable from './mixins/box-modelable'
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
import ItemizableCore from './mixins/container/itemizable/core'
import ItemizableTranslate from './mixins/container/itemizable/translate'
import Nudgeable from './mixins/container/nudgeable'
import Visible from './mixins/container/visible'
import Wheelable from './mixins/container/wheelable'

// item
import ItemActivatable from './mixins/item/activatable'
import ItemCssTransformTranslate from './mixins/item/css-transform/translate'
import ItemCssTransition from './mixins/item/css-transition'
import ItemVisible from './mixins/item/visible'

export const CarouselItem = BoxModelable(
  ItemActivatable(
    ItemVisible(
      ItemCssTransformTranslate(
        ItemCssTransition(ElementEventable(Elementable(Core)))
      )
    )
  )
)

const CarouselItemizableBase = Nudgeable(
  ElementEventable(Directionable(Elementable(Core)))
)

const Carousel = Visible(
  Wheelable(
    DraggableTouch(
      DraggablePointer(
        DraggableMouse(
          DraggableCore(
            IndexablePreviousNext(
              IndexableSelect(
                ItemizableTranslate(
                  ItemizableCore<
                    InstanceType<typeof CarouselItem>,
                    typeof CarouselItemizableBase
                  >(CarouselItemizableBase)
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
