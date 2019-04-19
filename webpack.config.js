const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', __dirname + '/client/index.jsx'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-react', { modules: false }],
                ['@babel/preset-env', { modules: false }]
              ]
            }
          }
        } ,
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    }
  };