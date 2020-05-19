const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  return {
    entry: {
      'yac-carousel': path.resolve(__dirname, 'src/index.ts')
    },
    devtool: "source-map",
    optimization: {
      // concatenateModules: false,
      // minimize: false,
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.build.json'
          },
        }],
        include: [
          path.resolve(__dirname, 'src'),
        ]
      }, {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ]
      }]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.wasm', '.mjs', '.js', '.json']
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
      }),
    ],
    output: {
      library: 'YacCarousel',
      libraryTarget: 'umd',
      filename: '[name].umd.js',
      path: path.resolve(__dirname, 'dist')
    },
  }
}