const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
} satisfies import('postcss').ProcessOptions & { plugins: Record<string, any> }

export default config
