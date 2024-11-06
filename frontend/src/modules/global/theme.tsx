import { extendTheme } from '@chakra-ui/react'

const colors = {
  green: {
    600: '#363636',
    700: '#2d2d2d', // Um tom mais escuro que #363636
    800: '#242424', // Outro tom mais escuro
  },
}

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const styles = {
  global: {
    'html, body': {
      background: '#F8F9FA',
      fontFamily: 'Roboto',
    },
    a: {
      color: 'black',
    },
  },
}

export const theme = extendTheme({ colors, styles, breakpoints })
