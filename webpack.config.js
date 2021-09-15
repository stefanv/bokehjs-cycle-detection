const path = require("path");

const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = {
  module: {
    rules: [
      // For Bokeh's "export * from y" syntax
      {
        test: /\.js?$/,
        include: /node_modules\/@bokeh/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator"
              ],
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
    include: /bokehjs/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd()
    })
  ],
  resolve: {
    alias: {
      bokehjs: path.resolve(
        __dirname,
        "node_modules/@bokeh/bokehjs/build/js/lib"
      )
    }
  },
  mode: "development"
}

module.exports = config;
