const WebSocket = require("ws");

const websocketServer = new WebSocket.Server({ port: 8080 });

websocketServer.on("connection", (ws) => {
  console.log("Client connected");

  const shipmentId = "12345ABC"; // Single product shipment ID

  // Static statuses and locations to give some form of dynamism
  const statuses = ["In transit", "Shipped", "Out for Delivery", "Delivered"];
  const locations = ["New York, NY", "Chicago, IL", "Los Angeles, CA", "Lagos, Nigeria"];

  setInterval(() => {
    const shipmentUpdate = {
      id: shipmentId, // Shipment ID for tracking
      status: statuses[Math.floor(Math.random() * statuses.length)], // Fetch a random status
      location: locations[Math.floor(Math.random() * locations.length)], // Fetch a random location
      timestamp: new Date().toISOString(), // Current timestamp
    };

    ws.send(JSON.stringify(shipmentUpdate)); // Send update through WebSocket
  }, 5000); // Every 5 seconds

});

console.log("WebSocket server running on ws://localhost:8080");
