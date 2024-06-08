const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// a função "merge" nos permitirá pegar as diferentes configs do "webpack-common" e juntar com as configs especificas do ambiente DEV
const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: '/index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    //a função desse plugin de webpack é checar o index.HTML e automaticamente  adicionar uma tag de script a ele, que irá referenciar todos os diferentes resultados do processo do webpack
    //simplifica a criação de arquivos HTML para servir seus pacotes de webpack.
    //Isto é especialmente útil para pacotes webpack que incluem um hash no nome do arquivo que muda a cada compilação.
    //Você pode deixar o plugin gerar um arquivo HTML para você
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
