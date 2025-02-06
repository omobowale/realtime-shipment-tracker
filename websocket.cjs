const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Simulating updates every 5 seconds
  setInterval(() => {
    const shipmentUpdate = {
      id: Math.floor(Math.random() * 10000).toString(),
      status: "In transit",
      location: "New York, NY",
      timestamp: new Date().toISOString(),
    };

    ws.send(JSON.stringify(shipmentUpdate));
  }, 5000);
});

console.log("WebSocket server running on ws://localhost:8080");
