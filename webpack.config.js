const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';
  const DEVELOP_PAGES_DIR = path.resolve(__dirname, 'develop-pages')

  // plugins
  const plugins = [];
  
  if (!PRODUCTION) {
    plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${DEVELOP_PAGES_DIR}/index.html`,
      chunks: ['index-main'],
    }))
    plugins.push(new HtmlWebpackPlugin({
      filename: 'horizontal/index.html',
      template: `${DEVELOP_PAGES_DIR}/horizontal/index.html`,
      chunks: ['horizontal-main'],
    }))
    plugins.push(new HtmlWebpackPlugin({
      filename: 'vertical/index.html',
      template: `${DEVELOP_PAGES_DIR}/vertical/index.html`,
      chunks: ['vertical-main'],
    }))
    plugins.push(new HtmlWebpackPlugin({
      filename: 'react/index.html',
      template: `${DEVELOP_PAGES_DIR}/react/index.html`,
      chunks: ['react-main'],
    }))

    plugins.push(new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
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
      'index-main': path.resolve(__dirname, `${DEVELOP_PAGES_DIR}/index.ts`),
      'horizontal-main': path.resolve(__dirname, `${DEVELOP_PAGES_DIR}/horizontal/index.ts`),
      'vertical-main': path.resolve(__dirname, `${DEVELOP_PAGES_DIR}/vertical/index.ts`),
      'react-main': path.resolve(__dirname, `${DEVELOP_PAGES_DIR}/react/index.tsx`),
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
          DEVELOP_PAGES_DIR,
        ]
      }, {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !PRODUCTION
            },
          },
          "css-loader",
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
        server._watch(`develop-pages/*/**.html`);
      } 
    }
  }
}