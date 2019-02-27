module.exports = {
    entry: ['@babel/polyfill', __dirname + '/client/index.jsx'],
    module: {
      rules: [
        {
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        } ,
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
     output: {
      filename: 'App.js',
      path: __dirname + '/public'
    }
  };