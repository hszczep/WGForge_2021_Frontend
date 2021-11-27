const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/main.ts'), // entry point
  },
  output: {
    path: path.resolve(__dirname, './dist'), // output dir
    filename: '[name].bundle.js', // output js bundle file
    assetModuleFilename: 'assets/images/[hash][ext][query]', // output dir for assets
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    port: 5000, // devServer localhost port adress
    compress: true,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/main.html'), // entry html-template
      filename: 'index.html', // output html-file
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }), // copy files from 'src/directory' to 'dist/directory'
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/assets/favicon'), to: './assets/favicon' },
      { from: path.resolve(__dirname, './src/assets/public'), to: './assets/images' },
    ]),
    new CleanWebpackPlugin(), // clean dist directory
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // disable type checker - we will use it in fork plugin
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(mp3|wav`)$/,
        use: [{ loader: 'file-loader', options: { outputPath: './assets/audio/' } }],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
