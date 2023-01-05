/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        'heading': ['48px', '48px'],
        'xxxl': ['24px', '32px'],
        'xxl': ['20px', '28px'],
        'xl': ['16px', '24px'],
        'l': ['14px', '20px'],
        'm': ['12px', '16px'],
        's': ['10px', '12px'],
      },
      colors: {
        'background': '#FFFFFF',
        'primary': {
          normal: '#F25656',
          dark: '#FEE827',
          light: '#FFF179',
        },
        'secondary': {
          dark: '#75A3CC',
          light: '#AFCFE1',
        },
        'btn-primary': {
          normal: '#FFEE58',
          hover: '#FEE827',
          press: '#FFF179',
        },
        'btn-dark': {
          normal: '#001018',
          hover: '#040506',
          press: '#222627',
        },
        'btn-text': {
          primary: '#001018',
          dark: '#FFFFFF',
        },
        'notifications': {
          error: '#EB293E',
          warning: '#FFDC25',
          successful: '#3BB263',
        },
        'gray': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#EBEBEB',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
        },
        'light-trunks': '#999CA0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
