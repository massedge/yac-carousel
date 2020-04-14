export interface ControllableSnapMixinOptions {
  snap?: boolean
}

export interface ControllableSnapMixinClass {
  new (options: ControllableSnapMixinOptions): ControllableSnapMixinInstance
}

export interface ControllableSnapMixinInstance {
  snap: boolean
}

export interface ControllableSnapMixinBase {}
