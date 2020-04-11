const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';

  // plugins
  const plugins = [];
  
  if (!PRODUCTION) {
    plugins.push(new HtmlWebpackPlugin({
      title: 'Development',
      template: 'test/page/index.html',
    }))
  }
  
  if (!PRODUCTION) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  
  if (PRODUCTION) {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
    }));
  }
  
  return {
    entry: (!PRODUCTION) ? path.resolve(__dirname, 'test/page/index.ts') : path.resolve(__dirname, 'src/index.ts'),
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
        },
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test'),
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
      // disableHostCheck: true,
      // host: '0.0.0.0',
      stats: {
        colors: true
      },
      before: (app, server) => {
        // @see https://github.com/webpack/webpack-dev-server/issues/1271#issuecomment-379792541
        server._watch(`test/*/**.html`);
      } 
    }
  }
}