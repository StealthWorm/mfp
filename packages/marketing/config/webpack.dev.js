const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')

// a função "merge" nos permitirá pegar as diferentes configs do "webpack-common" e juntar com as configs especificas do ambiente DEV
const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // new ModuleFederationPlugin({
    //   name: 'marketing',
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     './MarketingApp': './src/bootstrap'
    //   }
    // })
  ]
}

module.exports = merge(commonConfig, devConfig);