// base class
import Core from './classes/core'

import {
  Activatable,
  AlignableCore,
  AlignableFlexElement,
  Autoplayable,
  BoxModelable,
  CssTransformableTranslate,
  CssTransitionable,
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
  Controllable,
  ItemizableCore,
  ItemizableSelectOnFocusedItem,
  Nudgeable,
  RefreshableWindowResize,
  RefreshableImageLoad,
  TransformablePreventScroll,
  TypeableHorizontalVertical,
  VisibleContainerElement,
  VisibleContainerItem,
  Wheelable,
} from './lib'

export const CarouselItem = BoxModelable(
  ElementableFocus(
    Focusable(
      Activatable(
        VisibleContainerItem(
          CssTransformableTranslate(
            CssTransitionable(EventableElement(ElementableCore(Core)))
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
  RefreshableImageLoad(
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
                            Controllable(
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
)

export default Carousel
