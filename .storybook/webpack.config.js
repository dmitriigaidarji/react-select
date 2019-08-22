module.exports = ({config}) => {
  config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        }
      ],
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
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
