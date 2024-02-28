const express = require('express'); 

const KafkaBroker = require('./kafkaHandler/kafkaBroker'); 

const app = express(); 

const port = 3000;  

// Kafka producer and consumer 

const kafkaBroker = new KafkaBroker(); 

const producer = kafkaBroker.getProducer(); 

const consumer = kafkaBroker.getConsumer();  

// Order state 

const orderState = { 

  PENDING: 'PENDING', 

  APPROVED: 'APPROVED', 

  REJECTED: 'REJECTED', 

  CANCELLED: 'CANCELLED' 

};  

// Order database (mock) 

const orders = {};  

// Create a new order 

app.post('/order', (req, res) => { 

  // Generate a random order ID and get the order details 

  const orderId = Math.floor(Math.random() * 10000); 

  const order = req.body; 

  // Set the order status to pending and save it 

  order.status = orderState.PENDING; 

  orders[orderId] = order; 

  // Send a message to the order service to start the saga 

  producer.send([{ 

    topic: 'order', 

    messages: JSON.stringify({ 

      type: 'ORDER_CREATED', 

      payload: { 

        orderId: orderId, 

        order: order 

      } 

    }) 

  }]); 

  // Return the order ID and status 

  res.json({ 

    orderId: orderId, 

    status: order.status 

  }); 

});  

// Handle the messages from the order service 

consumer.on('message', (message) => { 

  // Parse the message value and get the event type and payload 

  const event = JSON.parse(message.value); 

  const { type, payload } = event; 

  // Get the order ID and order from the payload 

  const { orderId, order } = payload; 

  // Find the order in the database 

  const currentOrder = orders[orderId]; 

  // Check if the order exists and is not already cancelled 

  if (currentOrder && currentOrder.status !== orderState.CANCELLED) { 

    // Handle the event type 

    switch (type) { 

      // The order service has approved the order 

      case 'ORDER_APPROVED': 

        // Set the order status to approved and send a message to the payment service 

        currentOrder.status = orderState.APPROVED; 

        producer.send([{ 

          topic: 'payment', 

          messages: JSON.stringify({ 

            type: 'PAYMENT_REQUESTED', 

            payload: { 

              orderId: orderId, 

              order: order 

            } 

          }) 

        }]); 

        break; 

      // The order service has rejected the order 

      case 'ORDER_REJECTED': 

        // Set the order status to rejected 

        currentOrder.status = orderState.REJECTED; 

        break; 

      // The payment service has charged the payment 

      case 'PAYMENT_APPROVED': 

        // Send a message to the stock service to reserve the items 

        producer.send([{ 

          topic: 'stock', 

          messages: JSON.stringify({ 

            type: 'STOCK_REQUESTED', 

            payload: { 

              orderId: orderId, 

              order: order 

            } 

          }) 

        }]); 

        break; 

      // The payment service has failed to charge the payment 

      case 'PAYMENT_REJECTED': 

        // Send a message to the order service to reject the order 

        producer.send([{ 

          topic: 'order', 

          messages: JSON.stringify({ 

            type: 'ORDER_REJECTED', 

            payload: { 

              orderId: orderId, 

              order: order 

            } 

          }) 

        }]); 

        break; 

      // The stock service has reserved the items 

      case 'STOCK_APPROVED': 

        // The saga is completed successfully 

        console.log('Saga completed successfully'); 

        break; 

      // The stock service has failed to reserve the items 

      case 'STOCK_REJECTED': 

        // Send a message to the payment service to refund the payment 

        producer.send([{ 

          topic: 'payment', 

          messages: JSON.stringify({ 

            type: 'PAYMENT_REFUNDED', 

            payload: { 

              orderId: orderId, 

              order: order 

            } 

          }) 

        }]); 

        // Send a message to the order service to reject the order 

        producer.send([{ 

          topic: 'order', 

          messages: JSON.stringify({ 

            type: 'ORDER_REJECTED', 

            payload: { 

              orderId: orderId, 

              order: order 

            } 

          }) 

        }]); 

        break; 

      default: 

        // Unknown event type 

        console.error('Unknown event type:', type); 

    } 

  } else { 

    // The order is not found or already cancelled 

    console.error('Order not found or already cancelled:', orderId); 

  } 

});  

// Start the server 

app.listen(port, () => { 

  console.log(`Orchestrator service listening at http://localhost:${port}`); 

}); 