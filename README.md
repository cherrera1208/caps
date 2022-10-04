# Event Driven Applications

**CAPS Phase 1:** The Code Academy Parcel Service. In this sprint, build out a system that emulates a real world supply chain. **CAPS** will simulate a delivery service where vendors (such a flower shops) will ship products using our delivery service and when our drivers deliver them, each vendor will be notified that their customers received what they purchased.

This will be an event driven application that "distributes" the responsibility for logging to separate modules, using only events to trigger logging based on activity.

## User Stories

As a business, our primary goal is to increase the visibility on the state of packages in the delivery process.

We have 2 major clients for this service: Vendors and Drivers. Each need to have full and live visibility into the state of a package as it’s being delivered to a customer.

* As a vendor, I want to alert the system when I have a package to be picked up.
* As a driver, I want to be notified when there is a package to be delivered.
* As a driver, I want to alert the system when I have picked up a package and it is in transit.
* As a driver, I want to alert the system when a package has been delivered.
* As a vendor, I want to be notified when my package has been delivered.

And as developers, here are some of the development stories that are relevant to the above.

* As a developer, I want to use industry standards for managing the state of each package.
* As a developer, I want to create an event driven system so that I can write code that happens in response to events, **in real time**.

## Technical Requirements / Notes

Create the CAPS system as follows:

### Global Event Pool (HUB)

1. Implement a Module for a Global Event Pool.
   * Export a single `EventEmitter` from the [Node JS module](https://nodejs.org/api/events.html#events_class_eventemitter).
   * Should be imported by any module that needs to notify or be alerted by other modules of an event.
  
1. Implement a Module for Managing Global Package Events.
   * Listens to **ALL** events in the Event Pool.
   * Logs a timestamp and the payload of every event.

    ```json
    "EVENT": { 
      "event": "pickup",
      "time": "2020-03-06T18:27:17.732Z",
      "payload": { 
        "store": "1-206-flowers",
        "orderID": "e3669048-7313-427b-b6cc-74010ca1f8f0",
        "customer": "Jamal Braun",
        "address": "Schmittfort, LA"
      }
    }
    ```

### Vendor Client Application

1. Implement a Module for Managing Vendor Events.
   * Your implementation should use a `store name` as a parameter.
   * When triggered, the **vendor module** simulates a `pickup` event for the given `store name` to the Global Event Pool:
     * emits `pickup` to the global event pool.
     * sends a vendor order `payload`:

     ```json
      {
        "store": "<store-name>",
        "orderId": "<unique-order-id>",
        "customer": "<customer-name>",
        "address": "<city-state>"
      }
     ```

     > HINT: Have some fun by using the [Chance](https://chancejs.com/) library to make up phony information.

   * Listens for a `delivered` event and responds by logging a message to the console:

   ```javascript
    Thank you, <customer-name>
   ```

### Driver Client Application

1. Implement a Module for Managing Driver Events.
   * Listens for a `pickup` event from the Global Event Pool and responds with the following:
     * Log a message to the console: `DRIVER: picked up <ORDER_ID>`.
     * Emit an 'in-transit' event to the Global Event Pool with the order payload.
     * Log a confirmation message to the console: `DRIVER: delievered <ORDER_ID>`.
     * Emit a 'delivered` event to the Global Event Pool with the order payload.

When running, your console output should look something like this:

```javascript
EVENT { event: 'pickup',
  time: 2020-03-06T18:27:17.732Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
DRIVER: picked up e3669048-7313-427b-b6cc-74010ca1f8f0
EVENT { event: 'in-transit',
  time: 2020-03-06T18:27:18.738Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
DRIVER: delivered up e3669048-7313-427b-b6cc-74010ca1f8f0
VENDOR: Thank you for delivering e3669048-7313-427b-b6cc-74010ca1f8f0
EVENT { event: 'delivered',
  time: 2020-03-06T18:27:20.736Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
...
```

## UML

![eva_uml](./img/401UML_lab11.jpg)
