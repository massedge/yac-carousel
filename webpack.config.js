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
      chunks: ['vanilla-main'],
    }))
    plugins.push(new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'react.html',
      template: 'test/react/index.html',
      chunks: ['react-main'],
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
    entry: (!PRODUCTION) ? {
      'vanilla-main': path.resolve(__dirname, 'test/page/index.ts'),
      'react-main': path.resolve(__dirname, 'test/react/index.tsx'),
    } : path.resolve(__dirname, 'src/index.ts'),
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.tsx?$/,
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
      extensions: ['.tsx', '.ts', '.wasm', '.mjs', '.js', '.json']
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