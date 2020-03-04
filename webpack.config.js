const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';

  // plugins
  const plugins = [];
  
  if (!PRODUCTION) {
    plugins.push(new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html',
      inject: 'head',
    }))
  }
  
  if (!PRODUCTION) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  
  return {
    entry: path.resolve(__dirname, 'src/index.ts'),
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
        },
        include: [
          path.resolve(__dirname, 'src'),
        ]
      }]
    },
    resolve: {
      extensions: ['.ts', '.wasm', '.mjs', '.js', '.json']
    },
    plugins: plugins,
    output: {
      library: 'YacCarousel',
      libraryTarget: 'umd',
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      noInfo: true,
      hot: true,
      // host: '0.0.0.0',
      stats: {
        colors: true
      }
    }
  }
}