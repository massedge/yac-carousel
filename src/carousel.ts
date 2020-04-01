// base class
import Core from './classes/core'

// mixins
import BoxModelable from './mixins/box-modelable'
import Directionable from './mixins/directionable'
import Elementable from './mixins/elementable/core'
import Focusable from './mixins/focusable'
import FocusElementable from './mixins/elementable/focus'
import WindowResizeRefreshable from './mixins/refreshable/window-resize'
import PreventScrollTransformableMixin from './mixins/transformable/prevent-scroll'

// container
import Autoplay from './mixins/container/autoplay'
import DraggableCore from './mixins/container/draggable/core'
import DraggableMouse from './mixins/container/draggable/mouse'
import DraggableTouch from './mixins/container/draggable/touch'
import DraggablePreventOnDraggableEvent from './mixins/container/draggable/prevent-on-draggable-element'
import DraggablePreventOnInputEvent from './mixins/container/draggable/prevent-on-input-element'
import ElementEventable from './mixins/eventable/element'
import IndexablePreviousNext from './mixins/container/indexable/previous-next'
import IndexableSelect from './mixins/container/indexable/select'
import ItemizableController from './mixins/container/itemizable/controller'
import ItemizableCore from './mixins/container/itemizable/core'
import ItemizableSelectOnFocusedItem from './mixins/container/itemizable/select-on-focused-item'
import Nudgeable from './mixins/container/nudgeable'
import Visible from './mixins/container/visible'
import Wheelable from './mixins/container/wheelable'

// item
import ItemActivatable from './mixins/item/activatable'
import ItemCssTransformTranslate from './mixins/item/css-transform/translate'
import ItemCssTransition from './mixins/item/css-transition'
import ItemVisible from './mixins/item/visible'

export const CarouselItem = BoxModelable(
  FocusElementable(
    Focusable(
      ItemActivatable(
        ItemVisible(
          ItemCssTransformTranslate(
            ItemCssTransition(ElementEventable(Elementable(Core)))
          )
        )
      )
    )
  )
)

const CarouselItemizableBase = BoxModelable(
  Nudgeable(ElementEventable(Elementable(Core)))
)

const Carousel = WindowResizeRefreshable(
  ItemizableSelectOnFocusedItem(
    PreventScrollTransformableMixin(
      Autoplay(
        Visible(
          Wheelable(
            DraggablePreventOnDraggableEvent(
              DraggablePreventOnInputEvent(
                DraggableTouch(
                  DraggableMouse(
                    DraggableCore(
                      IndexablePreviousNext(
                        IndexableSelect(
                          ItemizableController(
                            Directionable(
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
          )
        )
      )
    )
  )
)

export default Carousel
