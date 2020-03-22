import { ComposeConstructor } from '../../../types'
import Core, { DraggableCoreInstance } from './core'
import Mouse, { DraggableMouseBase } from './mouse'
import Pointer, { DraggablePointerBase } from './pointer'
import Touch, { DraggableTouchBase } from './touch'

type DraggableConstructor<T = any> = new (o: T) => Omit<
  DraggableMouseBase & DraggablePointerBase & DraggableTouchBase,
  keyof DraggableCoreInstance
>

export default function Draggable<
  T extends DraggableConstructor,
  O = T extends new (o: infer O1) => any ? O1 : never
>(Base: T) {
  const Mixin = Touch(Pointer(Mouse(Core<DraggableConstructor<O>>(Base))))
  return Mixin as ComposeConstructor<typeof Mixin, typeof Base>
}
