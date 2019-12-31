const webpack = require('webpack');

export default (config, env, _) => {
  // enable absolute path imports in project
  config.resolve.modules.push(env.src);

  // serve from github pages url
  const PUBLIC_PATH = env.production ? '/covert-cow' : '';
  config.output.publicPath = PUBLIC_PATH;
  // use the public path in your app as 'process.env.PUBLIC_PATH'
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(config.output.publicPath || '/')
    })
  );
};
