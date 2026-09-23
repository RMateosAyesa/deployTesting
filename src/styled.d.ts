import 'styled-components'

declare module 'styled-components' {
  interface DefaultTheme {
    fontFamily: Record<string, string>
    typography: Record<string, { fontSize: string; fontWeight: string; lineHeight: string }>
    colors: Record<string, string>
    spacing: Record<string, string>
    borderSize: Record<string, string>
    borderRadius: Record<string, string>
    padding: Record<string, string>
    breakpoints: Record<string, string>
  }
}
