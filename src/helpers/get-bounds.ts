// interface StyleProps {
//   paddingLeft: number
//   paddingRight: number
//   paddingTop: number
//   paddingBottom: number
  
//   borderLeft: number
//   borderRight: number
//   borderTop: number
//   borderBottom: number

//   marginLeft: number
//   marginRight: number
//   marginTop: number
//   marginBottom: number
// }

export interface StylePropKeys extends Pick<
    CSSStyleDeclaration,
    'paddingRight' | 'paddingLeft' | 'paddingTop' | 'paddingBottom' |
    'borderRight' | 'borderLeft' | 'borderTop' | 'borderBottom' |
    'marginRight' | 'marginLeft' | 'marginTop' | 'marginBottom'
  > {}

// type OptionRequirements = Record<keyof asdf, number>
type StyleProps = {
  [key in keyof StylePropKeys]: number
}

export const getBounds = (element: HTMLElement) => {
  const cs = window.getComputedStyle(element);

  const propKeys: Array<keyof StylePropKeys> = [
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    
    'borderLeft',
    'borderRight',
    'borderTop',
    'borderBottom',

    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
  ]

  const props: StyleProps = propKeys.reduce((props: StyleProps, propKey) => {
    const prop = cs[propKey]
    props[propKey] = (prop) ? parseFloat(prop) : 0
    return props
  }, {} as StyleProps)

  const rect = element.getBoundingClientRect()
  const widthBorder = rect.width
  const heightBorder = rect.height

  const widthPadding = widthBorder - props.paddingLeft - props.paddingRight;
  const heightPadding = heightBorder - props.paddingTop - props.paddingBottom;

  return {
    ...props,
    width: widthPadding - props.borderLeft - props.borderRight,
    height: heightPadding - props.borderTop - props.borderBottom,
    widthPadding,
    heightPadding,
    widthBorder,
    heightBorder,
    widthMargin: widthBorder + props.marginLeft + props.marginRight,
    heightMargin: heightBorder + props.marginTop + props.marginBottom,
  }
}
