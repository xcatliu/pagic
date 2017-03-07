const Pagic = require('./Pagic');

module.exports = (...args) => {
  const pagic = new Pagic(...args);
  return () => {
    pagic.build();
  };
};

module.exports.Pagic = Pagic;
