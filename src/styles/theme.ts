const baseTheme = {
  fonts: {
    family: "'Inter', sans-serif",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      title: '2rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    full: '999px',
  },
  shadows: {
    sm: '0 1px 4px rgba(0,0,0,0.2)',
    md: '0 4px 12px rgba(0,0,0,0.3)',
    lg: '0 8px 24px rgba(0,0,0,0.4)',
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#FF6B6B',
    primaryDark: '#E85555',
    secondary: '#FFE66D',
    background: '#1A1A2E',
    surface: '#16213E',
    surfaceAlt: '#0F3460',
    textPrimary: '#EAEAEA',
    textSecondary: '#9A9AB0',
    border: '#2A2A4A',
    error: '#FF4444',
    success: '#44BB77',
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#FF6B6B',
    primaryDark: '#E85555',
    secondary: '#FFE66D',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F0F0',
    textPrimary: '#2D2D2D',
    textSecondary: '#8A8A8A',
    border: '#E8E8E8',
    error: '#FF4444',
    success: '#44BB77',
  },
};


export type Theme = typeof darkTheme;