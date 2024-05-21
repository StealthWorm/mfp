module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // indica quais extensões queremos processar pelo babel
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            // "preset-react" indica que o Babel processará todas as tags jsx da aplicação relacionadas ao react
            // "preset-env" indica que vai trasnformar o código para se ajustar a diferentes versões ES2015, 16...
            presets: ['@babel/preset-react','@babel/preset-env'], 
            plugins: ['@babel/plugin-transform-runtime'] //Habilitará algumas props adicionais para o navegador
          }
        }
      }
    ]
  }
};