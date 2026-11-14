import { createTheme } from '@mui/material/styles'

export const tpsaColors = {
  navy: '#101126',
  navySoft: '#1D203F',
  purple: '#5B4CF6',
  purpleDark: '#4B3FE0',
  page: '#F4F5FA',
  border: '#E3E7F2',
  text: '#171A31',
  muted: '#687394',
  green: '#08B76B',
  orange: '#FF9F1C',
  coral: '#FF7043',
  red: '#F05252',
}

export const tpsaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tpsaColors.purple, dark: tpsaColors.purpleDark, contrastText: '#FFFFFF' },
    secondary: { main: tpsaColors.navy },
    background: { default: tpsaColors.page, paper: '#FFFFFF' },
    text: { primary: tpsaColors.text, secondary: tpsaColors.muted },
    success: { main: tpsaColors.green },
    warning: { main: tpsaColors.orange },
    error: { main: tpsaColors.red },
    divider: tpsaColors.border,
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontSize: '1.7rem', fontWeight: 750, letterSpacing: '-0.04em' },
    h5: { fontSize: '1.35rem', fontWeight: 750, letterSpacing: '-0.025em' },
    h6: { fontSize: '1rem', fontWeight: 700 },
    subtitle1: { fontWeight: 650 },
    button: { textTransform: 'none', fontWeight: 650 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, minHeight: 42, paddingInline: 18, textTransform: 'none' },
      },
    },
    MuiCard: { styleOverrides: { root: { border: `1px solid ${tpsaColors.border}`, borderRadius: 18, boxShadow: 'none' } } },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 18 } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12, backgroundColor: '#FFFFFF' } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 600 } } },
  },
})
