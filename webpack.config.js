const path = require('path');

module.exports = {
  entry: './src/magic-card.js', // Entry point of your application
  output: {
    filename: 'magic-card.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Don't transpile node_modules
        use: {
          loader: 'babel-loader', // Use babel-loader for transpilation
        },
      },
    ],
  },
  // 'development' or 'production' mode is set via CLI (--mode)
  // You can add more configurations like devServer, plugins, etc.
};