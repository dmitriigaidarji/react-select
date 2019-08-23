module.exports = {
  entry: [
    "./src/index.ts"
  ],
  output: {
    filename: "index.js",
    path: __dirname + "/build"
  },
  plugins: [
    // new CopyWebpackPlugin(['name.ico']),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "awesome-typescript-loader", options: {
              transpileOnly: false,
              // "useBabel": true,
              // "babelOptions": {
              //   "babelrc": false, /* Important line */
              //   "compact": true,
              //   "presets": [
              //     ["@babel/preset-env",
              //       {
              //         "targets": {
              //           "browsers": [
              //             "IE >= 10"]
              //         },
              //         "modules": false,
              //         "useBuiltIns": "entry",
              //         "corejs": 3
              //       }
              //     ]
              //   ],
              //   "plugins": ["@babel/plugin-syntax-dynamic-import"]
              // },
              // "babelCore": "@babel/core", // needed for Babel v7
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ]
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    'react-virtualized': 'react-virtualized'
  },
  // externals: function (context, request, callback) {
  //   console.log(request);
  //   callback();
  // }
};
