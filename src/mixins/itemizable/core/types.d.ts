export interface ItemizableCoreOptions<Item extends ItemizableItemBase> {
  items?: Item[]
  // itemConstructor: ItemizableItemConstructor<Item>
}

export interface ItemizableCoreMixin<Item extends ItemizableItemBase> {
  new (options: ItemizableCoreOptions<Item>): ItemizableCoreInstance<Item>
}

export interface ItemizableCoreInstance<Item extends ItemizableItemBase> {
  items: readonly Item[]
}

export interface ItemizableCoreBase {
  refresh(): void
  destroy(): void
}

export interface ItemizableItemBase {
  render(): void
  refresh(): void
}

export type ItemizableItemConstructor<Item extends ItemizableItemBase> = new (
  ...args: any[]
) => Item
