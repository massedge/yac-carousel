import Direction from '../../../../enums/direction'
import Controller from '../../../../classes/controller'
import { MixinInstance as NudgeableInstance } from '../../nudgeable/types'

export interface MixinOptions<Item extends MixinItemBase> {
  controllerConstructor: typeof Controller
}

export interface MixinClass<Item extends MixinItemBase> {
  new (options: MixinOptions<Item>): MixinInstance<Item>
}

export interface MixinInstance<Item extends MixinItemBase> {
  render: () => void
  refresh: () => void
}

export interface MixinBase<Item extends MixinItemBase> {
  readonly width: number
  readonly height: number
  readonly direction: Direction
  items: readonly Item[]
  render(): void
  refresh(): void
  destroy(): void
  on: (type: string, listener: (ev: CustomEvent) => void) => void
  off: (type: string, listener: (ev: CustomEvent) => void) => void
}

export interface MixinItemBase {
  active: boolean
  readonly width: number
  readonly height: number
  translateX: number
  translateY: number
  transition: string
}
