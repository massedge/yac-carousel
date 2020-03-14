/**
 * @see https://github.com/microsoft/TypeScript/issues/14126#issuecomment-503940323
 */
export type ComposeConstructor<T, U> = 
  [T, U] extends [new (options: infer O1) => infer R1,new (options: infer O2) => infer R2] ? {
      new (options: O1 & O2): R1 & R2
  } & Pick<T, keyof T> & Pick<U, keyof U> : never
