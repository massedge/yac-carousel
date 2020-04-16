export interface VisibleElementContainerMixinOptions {
  element: HTMLElement
}

export interface VisibleElementContainerMixinClass {
  new (
    options: VisibleElementContainerMixinOptions
  ): VisibleElementContainerMixinInstance
}

export interface VisibleElementContainerMixinInstance {
  render: () => void
  destroy: () => void
}

export interface VisibleElementContainerMixinItem {
  readonly element: HTMLElement
  visible: boolean
}

export interface VisibleElementContainerMixinBase<Item> {
  readonly items: readonly Item[]
  render(): void
  destroy(): void
}
