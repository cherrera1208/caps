'use strict';

const events = require('../eventEmitter.js');

const handleVendor = payload => {
  events.emit('global',
    payload.pickup);
  console.log(':: : handleVendor : payload.pickup', payload.pickup || 3001);
};

console.log(1 + 1);

module.exports = handleVendor;
