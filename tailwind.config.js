/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'primary': {
            DEFAULT: '#4361ee',
            '50': '#f0f4ff',
            '100': '#dbe4ff',
            '200': '#bccbff',
            '300': '#8fa6ff',
            '400': '#6a82ff',
            '500': '#4361ee',
            '600': '#3545e5',
            '700': '#2a35cd',
            '800': '#2730a5',
            '900': '#253083',
          },
          'secondary': {
            DEFAULT: '#a56ef4',
            '50': '#f8f5ff',
            '100': '#f0e8ff',
            '200': '#e5d5ff',
            '300': '#d0b5ff',
            '400': '#b690fa',
            '500': '#a56ef4',
            '600': '#9350e6',
            '700': '#833dce',
            '800': '#6b32a8',
            '900': '#5b2d89',
          },
          'neutral': {
            DEFAULT: '#6b7280',
            '50': '#f9fafb',
            '100': '#f3f4f6',
            '200': '#e5e7eb',
            '300': '#d1d5db',
            '400': '#9ca3af',
            '500': '#6b7280',
            '600': '#4b5563',
            '700': '#374151',
            '800': '#1f2937',
            '900': '#111827',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: [],
  };