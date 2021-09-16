module.exports = {
  webpack: (config, webpack) => {
    // Add your variable using the DefinePlugin
    config.plugins.push(
      new webpack.DefinePlugin({
        CUSTOM_VARIABLES: {
          ORGAN_NAME: JSON.stringify(process.env.ORGAN_NAME),
        },
      }),
    );
    // Important: return the modified config
    return config;
  },
};
