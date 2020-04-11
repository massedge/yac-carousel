export interface MixinOptions {}

export interface MixinClass {
  new (options?: MixinOptions): MixinInstance
}

export interface MixinInstance {
  _on(type: string, listener: (evt: CustomEvent) => void): void
  _off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(e: CustomEvent): void
}

export interface MixinBase {}
