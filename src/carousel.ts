// base class
import Core from './classes/core'

import {
  AlignableCore,
  AlignableFlexElement,
  Autoplayable,
  BoxModelable,
  DirectionableCore,
  DirectionableElement,
  DraggableCore,
  DraggableMouse,
  DraggableTouch,
  DraggablePreventOnDraggableElement,
  DraggablePreventOnInputElement,
  ElementableCore,
  ElementableFocus,
  EventableElement,
  Focusable,
  IndexablePreviousNext,
  IndexableSelect,
  ItemizableController,
  ItemizableCore,
  ItemizableSelectOnFocusedItem,
  Nudgeable,
  RefreshableWindowResize,
  TransformablePreventScroll,
  TypeableHorizontalVertical,
  VisibleContainerElement,
  VisibleContainerItem,
  Wheelable,
  ItemActivatable,
  ItemCssTransformTranslate,
  ItemCssTransition,
} from './lib'

export const CarouselItem = BoxModelable(
  ElementableFocus(
    Focusable(
      ItemActivatable(
        VisibleContainerItem(
          ItemCssTransformTranslate(
            ItemCssTransition(EventableElement(ElementableCore(Core)))
          )
        )
      )
    )
  )
)

const CarouselItemizableBase = BoxModelable(
  Nudgeable(EventableElement(ElementableCore(Core)))
)

const Carousel = RefreshableWindowResize(
  ItemizableSelectOnFocusedItem(
    TransformablePreventScroll(
      Autoplayable(
        VisibleContainerElement(
          Wheelable(
            DraggablePreventOnDraggableElement(
              DraggablePreventOnInputElement(
                DraggableTouch(
                  DraggableMouse(
                    DraggableCore(
                      IndexablePreviousNext(
                        IndexableSelect(
                          ItemizableController(
                            AlignableFlexElement(
                              AlignableCore(
                                DirectionableElement(
                                  DirectionableCore(
                                    TypeableHorizontalVertical(
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
      )
    )
  )
)

export default Carousel
