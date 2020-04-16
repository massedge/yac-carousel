export interface ItemizableCoreMixinOptions<
  Item extends ItemizableCoreMixinItemBase
> {
  items?: Item[]
}

export interface ItemizableCoreMixinClass<
  Item extends ItemizableCoreMixinItemBase
> {
  new (options: ItemizableCoreMixinOptions<Item>): ItemizableCoreMixinInstance<
    Item
  >
}

export interface ItemizableCoreMixinInstance<
  Item extends ItemizableCoreMixinItemBase
> {
  readonly items: readonly Item[]
}

export interface ItemizableCoreMixinBase {
  refresh(): void
  destroy(): void
}

export interface ItemizableCoreMixinItemBase {
  render(): void
  refresh(): void
}
