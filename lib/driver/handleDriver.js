'use strict';

const events = require("../eventEmitter");

const handleDriver = payload => {
  events.emit('global', payload.delivered);
  events.emit('global', payload.inTransit);
  console.log(':: : handleDriver : handleDriver PACKAGE DELIVERED', handleDriver);
};
