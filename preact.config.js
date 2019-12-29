export default (config, env, _) => {
  config.resolve.modules.push(env.src); // enable absolute imports
};
