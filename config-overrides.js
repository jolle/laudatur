module.exports = function override(config) {
  config.module.rules.push({
    test: /\.svg$/,
    loader: 'svg-inline-loader'
  });
  return config;
};
