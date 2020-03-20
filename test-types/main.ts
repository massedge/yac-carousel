import {
  ContainerCore,
  ContainerDraggable,
  ContainerDraggableCore,
  ContainerDraggableMouse,
  ContainerDraggablePointer,
  ContainerDraggableTouch,
  ContainerElementable,
  ContainerNavable,
  ContainerNudgeable,
  ContainerVisible,
  ContainerWheelable,
} from '../src'

const Navable = 
  ContainerNavable(
    ContainerElementable(
      ContainerCore
    ))
const Navable2 = ContainerNavable(ContainerCore) // $ExpectError

const Wheelable = 
  ContainerWheelable(
    ContainerElementable(
      ContainerCore
    ))
const Wheelable2 = ContainerWheelable(ContainerCore) // $ExpectError


const Nudgeable = 
  ContainerNudgeable(
    ContainerCore
  )


const DraggableMixin =
  ContainerNudgeable(
    ContainerElementable(
    ContainerCore
  ))
const Draggable =
  ContainerDraggableMouse(
    ContainerDraggableCore(
    DraggableMixin
  ))

const Draggable2 =
  ContainerDraggable(
    DraggableMixin
  )
