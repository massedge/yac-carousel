export interface MixinOptions<Item extends MixinItemBase> {
  items?: Item[] | HTMLCollection | NodeList | HTMLElement[]
  itemConstructor?: MixinItemConstructor<Item>
}

export interface MixinClass<Item extends MixinItemBase> {
  new (options: MixinOptions<Item>): MixinInstance<Item>
}

export interface MixinInstance<Item extends MixinItemBase> {
  readonly itemConstructor: MixinItemConstructor<Item>
}

export interface MixinBaseOptions<Item extends MixinItemBase> {
  items?: Item[]
}

export interface MixinBase {
  refresh(): void
  destroy(): void
}

export interface MixinItemBase {
  render(): void
  refresh(): void
}

export type MixinItemConstructor<Item extends MixinItemBase> = new (
  ...args: any[]
) => Item
