const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // publicPath sera usada sempre que tiver uma parte do webpack que tenta referenciar um arquivo que passou pelo build
    // como no nosso bucket da S3 definimos que os arquivos em produção serão redirecionados para o caminho "/container/latest", setamos este caminho como publicPath
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // precisamos garantir que na AWS exista um folder com essa estrutura
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
