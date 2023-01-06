const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true,
  },
  cache: {
    type: 'filesystem',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      },
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     process.env.NODE_ENV !== 'production'
      //         ? 'style-loader'
      //         : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     {
      //       loader: 'sass',
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
     /** Uncomment to use */
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
     /** Uncomment to use */
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets', to: 'assets' }]
    // }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    }),
    new ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
         console.log(percentage)
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    })
  ]
};
