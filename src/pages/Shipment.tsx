import React, { useEffect, useState } from "react";

// Types for Shipment data
interface ShipmentDataUpdate {
    id: string;
    status: string;
    location: string;
    timestamp: string;
}

const Shipment: React.FC = () => {
    const [data, setData] = useState<ShipmentDataUpdate[]>([]);

    useEffect(() => {
        // Simulating WebSocket connection to a server
        // A mock websocket server is running at the following
        const websocket = new WebSocket("ws://localhost:8080");

        websocket.onopen = () => {
            console.log("Connected to the web socket");
        };

        websocket.onmessage = (event) => {
            const newUpdate = JSON.parse(event.data) as ShipmentDataUpdate;
            // Only keep the last three (3) updates
            setData((prevUpdates) => [newUpdate, ...prevUpdates].slice(0, 3));
        };

        // Cleanup WebSocket on component unmount
        return () => {
            websocket.close();
        };
    }, []);

    return (
        <div>
            <h1>Shipment Tracker</h1>
            <div className="shipment-updates">
                {data.length === 0 ? (
                    <p>Waiting for updates...</p>
                ) : (
                    data.map((d) => (
                        <div key={d.id} className="shipment-update">
                            <p><strong>Shipment ID:</strong> {d.id}</p>
                            <p><strong>Status:</strong> {d.status}</p>
                            <p><strong>Location:</strong> {d.location}</p>
                            <p><strong>Last Updated:</strong> {new Date(d.timestamp).toLocaleTimeString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shipment;
