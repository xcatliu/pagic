const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

module.exports = function getConfig() {
  const defaultConfigPath = path.resolve(__dirname, '../defaultConfig.yml');
  const defaultConfig = yaml.safeLoad(fs.readFileSync(defaultConfigPath, 'utf-8'));

  const userConfigPath = path.resolve(process.cwd(), '_config.yml');

  if (!fs.existsSync(userConfigPath)) {
    return defaultConfig;
  }

  const userConfig = yaml.safeLoad(fs.readFileSync(userConfigPath, 'utf-8'));
  const config = Object.assign(defaultConfig, userConfig);
  return config;
};
