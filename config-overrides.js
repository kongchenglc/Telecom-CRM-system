const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addDecoratorsLegacy
} = require('customize-cra')

const variables = require('./src/styles/variables')
const antdThemes = require('./src/styles/antd')

const themes = {}
Object.keys(antdThemes).forEach(key => {
  themes['@' + key] = variables[key]
})

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themes,
    data: Object.keys(variables).map(key => `@${key}:${variables[key]}`).join(`\n`),
    localIdentName: '[local]--[hash:base64:5]'
  }),
  addDecoratorsLegacy(),
  useEslintRc()
)