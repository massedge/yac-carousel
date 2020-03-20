import { ComposeConstructor } from '../../types'
import Core, { CoreDraggableInstance } from './core'
import Mouse, { MouseDraggableBase } from './mouse'
import Pointer, {PointerDraggableBase} from './pointer'
import Touch, {TouchDraggableBase} from './touch'

type DraggableConstructor = new (o: any) => Omit<MouseDraggableBase & PointerDraggableBase & TouchDraggableBase, keyof CoreDraggableInstance>

export default function Draggable<T extends DraggableConstructor>(Base: T) {
  const Mixin = Touch(Pointer(Mouse(Core<DraggableConstructor>(Base))))
  return Mixin as ComposeConstructor<typeof Mixin, typeof Base>
}