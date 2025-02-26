/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-fade': 'slide-fade 0.75s ease-out forwards',
      },
      keyframes: {
        'slide-fade': {
          '0%': {
            transform: 'translateY(30px)', // 开始时文字位于下方
            opacity: '0', // 文字完全透明
          },
          '100%': {
            transform: 'translateY(0)', // 文字最终位置
            opacity: '1', // 文字完全不透明
          },
        },
      },
    },
  },
  plugins: [],
}