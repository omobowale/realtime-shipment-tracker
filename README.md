# Real-Time Shipment Tracking

This is a simple Real-Time Shipment Tracking application built using React and WebSockets. The application simulates real-time shipment updates and dynamically updates the UI with the latest shipment status every 5 seconds.

## Features

- Simulated shipment updates every 5 seconds.
- Real-time updates via WebSockets.
- TailwindCSS for styling the UI.

## Prerequisites

To run this application locally, you need to have the following installed:

- Node.js (version 16 or higher)
- npm (Node Package Manager)


## Setup instructions

1. Clone the repository
- First, clone this repository to your local machine:


```bash
git clone https://github.com/omobowale/realtime-shipment-tracker.git
```


2. Install dependencies
- Navigate to the project directory and install the required dependencies using npm:


```bash
cd realtime-shipment-tracker
npm install --force
```


3. Run the development server
- Start the development server to run the app locally:

```bash
npm run dev
```

- This will run the development server at:

```bash
http://localhost:3000
```

- Open this url in your browser for action


4. Run the websocket server
- Open another terminal and run the websocket server using the following command

```bash
node websocket.cjs
```


5. Simulated WebSocket Updates

The WebSocket server is simulated on the frontend. Every 5 seconds, the application generates a new shipment update and sends it over WebSocket to the frontend, which then updates the UI accordingly.

6. Customizing the Application (Optional)

- Change Shipment Status: You can modify the array of possible statuses in the code to match different shipment stages.
Location Changes: You can customize the array of locations to simulate different shipment routes.