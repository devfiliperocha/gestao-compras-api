module.exports = {
  webpack: (config, webpack) => {
    // Add your variable using the DefinePlugin
    config.plugins.push(
      new webpack.DefinePlugin({
        CUSTOM_VARIABLES: {
          ORGAN_NAME: JSON.stringify(process.env.ORGAN_NAME),
          DATABASE_CLIENT: JSON.stringify(process.env.DATABASE_CLIENT),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    );
    // Important: return the modified config
    return config;
  },
};
