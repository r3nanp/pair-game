import '../src/styles/tailwind.css'
import '../.mock/next-image'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    previewTabs: {
      'storybook/docs/panel': { index: -1 },
    },
  },
}
