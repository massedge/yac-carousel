import { ComposeConstructor } from '../../types'
import Core, { DraggableCoreInstance } from './core'
import Mouse, { DraggableMouseBase } from './mouse'
import Pointer, { DraggablePointerBase } from './pointer'
import Touch, { DraggableTouchBase } from './touch'

type DraggableConstructor = new (o: any) => Omit<DraggableMouseBase & DraggablePointerBase & DraggableTouchBase, keyof DraggableCoreInstance>

export default function Draggable<T extends DraggableConstructor>(Base: T) {
  const Mixin = Touch(Pointer(Mouse(Core<DraggableConstructor>(Base))))
  return Mixin as ComposeConstructor<typeof Mixin, typeof Base>
}