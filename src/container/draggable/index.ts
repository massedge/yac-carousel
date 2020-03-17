import Common from './base'
import Mouse from './mouse'
import Pointer from './pointer'
import Touch from './touch'

export default function Draggable<T extends new (o: any) => any>(Base: T) {
  return Touch(Pointer(Mouse(Common(Base))))
}