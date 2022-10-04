'use strict';

const events = require('../eventEmitter.js');

const handleGlobal = payload => {
  console.log(':: : handleGlobal : payload CHANGE OCCURRED', payload);

};

module.exports = handleGlobal;
