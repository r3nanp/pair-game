module.exports = {
  stories: [
    '../src/components/**/*.stories.tsx',
    '../src/components/**/*.stories.mdx'
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1
        },
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },

  webpackFinal: config => {
    config.resolve.modules.push(`${process.cwd()}/src`)
    return config
  }
}
