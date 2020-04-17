import 'lodash'
declare module 'lodash' {
  interface LoDashStatic {
    // extend interface to include missing `pending()` property on debounce instance
    debounce<T extends (...args: any) => any>(
      func: T,
      wait?: number,
      options?: DebounceSettings
    ): T & Cancelable & { pending(): boolean }
  }
}
