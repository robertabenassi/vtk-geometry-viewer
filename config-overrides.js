const path = require("path");
const ruleChildren = (loader) => loader.use || loader.oneOf || Array.isArray(loader.loader) && loader.loader || []

const findIndexAndRules = (rulesSource, ruleMatcher) => {
    let result = undefined
    const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource)
    rules.some((rule, index) => result = ruleMatcher(rule) ? {index, rules} : findIndexAndRules(ruleChildren(rule), ruleMatcher))
    return result
}

const createLoaderMatcher = (loader) => (rule) => rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1
const fileLoaderMatcher = createLoaderMatcher('file-loader')
const workerLoaderMatcher = createLoaderMatcher('babel-loader');

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
    const {index, rules} = findIndexAndRules(rulesSource, ruleMatcher)
    rules.splice(index, 0, value)
}

module.exports = function override(config, env) {
    //just return the original config and pretend this never happened
    const shaderLoader = {
      test: /\.glsl$/,
      loader: require.resolve('shader-loader')
    }

    addBeforeRule(config.module.rules, fileLoaderMatcher, shaderLoader)

    const workerLoader = {
      test:  /\.worker\.js/,
      loader: require.resolve('worker-loader')
    }

    addBeforeRule(config.module.rules, workerLoaderMatcher, workerLoader)

    // Consolidate chunk files instead
    config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
        },
    };
    // Move runtime into bundle instead of separate file
    config.optimization.runtimeChunk = false;
    
    // JS
    config.output.filename = 'static/js/[name].js';
    // CSS. "5" is MiniCssPlugin
    config.plugins[5].options.filename = 'static/css/[name].css';
    
    return config;

    
  }