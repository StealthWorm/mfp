const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/, // indica quais extensões queremos processar pelo babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // "preset-env" indica que vai trasnformar o código para se ajustar a diferentes versões ES2015, 16...
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'], //Habilitará algumas props adicionais para o navegador
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
