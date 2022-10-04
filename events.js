'use strict';

const Events = require('event');
const events = new Events();

const eventPool = ['message-sent', 'message-received'];

events.on(eventPool[0],
  (payload) => {
    console.log(':: : payload', payload);
    events.emit("message-received", payload);
  });
events.on(eventPool[1],
  (payload) => {
    console.log(':: : payload', payload);
    events.emit("message-received",
      payload);
  });

events.emit(eventPool[0], { text: 'hello world' });
