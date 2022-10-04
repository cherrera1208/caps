'use strict';

const Events = require('events');
const events = new Events();

const observables = ['to be picked up', 'in transit', 'delivered'];

const handleVendor = payload => {
  events.emit('global', payload);
  console.log(':: : handleVendor : handleVendor', handleVendor);
};

const handleDriver = payload => {
  events.emit('global', payload);
  console.log(':: : handleDriver : handleDriver', handleDriver);
};

const handleGlobal = payload => {
  console.log(':: : handleGlobal : payload CHANGE OCCURRED', payload);
};

events.on('to be picked up', handleVendor);
events.on('in transit', handleDriver);
events.on('delivered', handleDriver);
events.on('global', handleGlobal);

setInterval(() => {
  events.emit(observables[0], {
    toBePickedUp: Math.floor(Math.random() * 100),
  });
  events.emit(observables[1], {
    inTransit: Math.floor(Math.random() * 100),
  })
  events.emit(observables[2], {
    delivered: Math.floor(Math.random() * 100),
  })
}, 2000);
