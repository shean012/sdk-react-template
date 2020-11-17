const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: path.join(__dirname, "/src/main.js"),
  output: {
    path: path.join(__dirname, "/dist/images/"),
    filename: "bundle.js",
  },
  module: {
    noParse: [/videojs-contrib-hls/],
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          // babel 转义的配置选项
          babelrc: false,
          presets: [
            // 添加 preset-react
            require.resolve("@babel/preset-react"),
            [
              require.resolve("@babel/preset-env"),
              {
                modules: false,
              },
            ],
          ],
          plugins: [
            [
              "@babel/plugin-proposal-decorators",
              {
                legacy: true,
              },
            ],
            [
              "@babel/plugin-proposal-class-properties",
              {
                loose: true,
              },
            ],
            ["@babel/plugin-transform-runtime"],
          ],
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              publicPath:
                process.env.NODE_ENV === "production" ? "images/" : "",
              limit: 100000, // 小于 98kB 不自动打包
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename:
        process.env.NODE_ENV === "production" ? "../index.html" : "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  devServer: {
    port: 4000,
    hot: true,
  },
}
