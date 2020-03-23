import Direction from '../../../../enums/direction'

export interface ItemizableOptions<Item extends ItemizableItemBase> {
  element: HTMLElement
  direction?: Direction
}

export interface Itemizable<Item extends ItemizableItemBase> {
  new (options: ItemizableOptions<Item>): ItemizableInstance<Item>
}

export interface ItemizableInstance<Item extends ItemizableItemBase> {
  render: () => void
  refresh: () => void
}

export interface ItemizableBase<Item extends ItemizableItemBase> {
  readonly element: HTMLElement
  readonly direction: Direction
  readonly width: number
  readonly height: number
  items: readonly Item[]
  render(): void
  refresh(): void
  nudge: (offset: number, ease: boolean) => boolean
  on: (type: string, listener: (ev: CustomEvent) => void) => void
  off: (type: string, listener: (ev: CustomEvent) => void) => void
}

export interface ItemizableItemBase {
  active: boolean
  readonly width: number
  readonly height: number
  translateX: number
  translateY: number
  transition: string
  render: () => void
  destroy: () => void
  refresh: () => void
}
