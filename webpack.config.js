const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  function getStyleLoader(preProcessor) {
    const loaders = [
      isDevelopment && 'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            postcssFlexbugsFixes(),
            postcssPresetEnv({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
          sourceMap: isProduction,
        },
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push({
        loader: preProcessor,
        options: {
          sourceMap: true,
        },
      });
    }

    return loaders;
  }

  return {
    mode: isProduction ? 'production' : isDevelopment && 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry: [
      isDevelopment && 'webpack-dev-server/client?/',
      isDevelopment && 'webpack/hot/dev-server',
      path.join(process.cwd(), 'src/index.jsx'),
    ].filter(Boolean),
    output: {
      path: isProduction ? path.join(process.cwd(), 'build') : undefined,
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/bundle.js',
      chunkFilename: isProduction
        ? 'js/[name].[contenthash:8].chunk.js'
        : 'js/[name].chunk.js',
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        '@components': path.resolve('src', 'components'),
        '@hooks': path.resolve('src', 'hooks'),
        '@reducers': path.resolve('src', 'reducers'),
        '@actions': path.resolve('src', 'actions'),
        '@types': path.resolve('src', 'types'),
        '@styles': path.resolve('src', 'styles'),
        '@utils': path.resolve('src', 'utils'),
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {},
            compress: {
              comparisons: false,
            },
            warnings: false,
            mangle: true,
            output: {
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: true,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: path.resolve(process.cwd(), 'src'),
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: getStyleLoader(),
        },
        {
          test: /\.(scss|sass)$/,

          use: getStyleLoader('sass-loader'),
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: 'media/[name].[hash:8].[ext]',
          },
        },
        {
          loader: 'file-loader',
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            name: 'media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: path.join(process.cwd(), 'src/index.html'),
          },
          isProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined,
        ),
      ),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
      new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    ],
  };
};
