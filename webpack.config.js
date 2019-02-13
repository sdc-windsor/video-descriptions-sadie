module.exports = {
    entry: __dirname + '/client/components/index.jsx',
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
        }
      ]
    },
     output: {
      filename: 'App.js',
      path: __dirname + '/public/dist'
    }
  };