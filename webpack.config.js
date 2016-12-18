module.exports = {
  entry: './lib/react-circular-legend.js',
  output: {
    filename: './dist/react-circular-legend.js',
    sourceMapFilename: './dist/react-react-circular-legend.map',
    libraryTarget: 'umd',
    library: 'CircularLegend'
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'},
    ]
  }
};
