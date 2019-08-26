const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

// plugins
const plugins = [
  new HtmlWebpackPlugin({
    title: 'Development',
    template: 'src/index.html',
    inject: 'head',
  })
];

if (!PRODUCTION) {
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
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
    stats: {
      colors: true
    }
  }
};