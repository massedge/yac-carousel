import 'lodash'
declare module 'lodash' {
  interface LoDashStatic {
    // extend interface to include missing `pending()` property on debounce instance
    debounce<T extends (...args: any) => any>(
      func: T,
      wait?: number,
      options?: DebounceSettings
    ): T & Cancelable & { pending(): void }
  }
}

/**
 * @see https://github.com/microsoft/TypeScript/issues/14126#issuecomment-503940323
 */
export type ComposeConstructor<T, U> = [T, U] extends [
  new (options: infer O1) => infer R1,
  new (options: infer O2) => infer R2
]
  ? {
      new (options: O1 & O2): R1 & R2
    } // NOTE: Currently not using static methods in mixins, so no need
  : // to complicate composition with merging of static methods.
    // & Pick<T, keyof T> & Pick<U, keyof U>
    never

/**
 * @see https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-405931434
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
