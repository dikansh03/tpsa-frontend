import type { ComponentProps, ElementType, ReactNode } from 'react'
import { Box as MuiBox, Stack as MuiStack, Typography as MuiTypography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

/**
 * Small MUI v9 compatibility wrappers.
 * MUI v9 expects system styling through `sx`; the supplied Figma-first screens
 * use familiar Box/Stack/Typography shorthand props. These wrappers translate
 * those shorthand props into `sx` while preserving standard component props.
 */
type CompatProps = {
  children?: ReactNode
  component?: ElementType
  sx?: SxProps<Theme>
  [key: string]: unknown
}

const styleKeys = new Set([
  'alignItems', 'alignContent', 'alignSelf', 'justifyContent', 'justifyItems', 'justifySelf',
  'display', 'position', 'inset', 'top', 'right', 'bottom', 'left', 'zIndex',
  'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight',
  'overflow', 'overflowX', 'overflowY', 'visibility', 'opacity', 'cursor',
  'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection', 'flexWrap', 'order',
  'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow', 'placeItems', 'placeContent',
  'gap', 'rowGap', 'columnGap', 'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr',
  'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr',
  'color', 'bgcolor', 'background', 'backgroundColor',
  'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderColor', 'borderRadius', 'boxShadow',
  'textAlign', 'textTransform', 'textDecoration', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
  'whiteSpace', 'textOverflow', 'wordBreak',
])

function splitProps(props: CompatProps) {
  const forwarded: Record<string, unknown> = {}
  const styles: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if (styleKeys.has(key)) styles[key] = value
    else forwarded[key] = value
  }
  return { forwarded, styles }
}

function mergeSx(styles: Record<string, unknown>, sx: SxProps<Theme> | undefined): SxProps<Theme> {
  if (sx === undefined) return styles as SxProps<Theme>
  return [styles as SxProps<Theme>, ...(Array.isArray(sx) ? sx : [sx])]
}

export function Box(props: CompatProps) {
  const { children, sx, ...rest } = props
  const { forwarded, styles } = splitProps(rest)
  return <MuiBox {...(forwarded as unknown as ComponentProps<typeof MuiBox>)} sx={mergeSx(styles, sx)}>{children}</MuiBox>
}

export function Stack(props: CompatProps) {
  const { children, sx, ...rest } = props
  const { forwarded, styles } = splitProps(rest)
  return <MuiStack {...(forwarded as unknown as ComponentProps<typeof MuiStack>)} sx={mergeSx(styles, sx)}>{children}</MuiStack>
}

export function Typography(props: CompatProps) {
  const { children, sx, ...rest } = props
  const { forwarded, styles } = splitProps(rest)
  return <MuiTypography {...(forwarded as unknown as ComponentProps<typeof MuiTypography>)} sx={mergeSx(styles, sx)}>{children}</MuiTypography>
}
