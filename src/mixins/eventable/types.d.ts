export interface MixinOptions {}

export interface MixinClass {
  new (options?: MixinOptions): MixinInstance
}

export interface MixinInstance {
  on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(e: CustomEvent): void
}

export interface MixinBase {}
