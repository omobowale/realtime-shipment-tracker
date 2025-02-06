import React, { useEffect, useState } from "react";
import CustomLabelValue from "../components/CustomLabelValue";
import { Vortex } from "react-loader-spinner";

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
            setData([newUpdate]);
        };

        // Cleanup WebSocket on component unmount
        return () => {
            websocket.close();
        };
    }, []);

    return (
        <div>
            <h1 className="mb-4">Shipment Tracker</h1>
            <div className="shipment-updates">
                {data.length === 0 ? (
                    <div className="text-center">
                        <div className="mx-auto text-center w-full flex justify-center">
                            <Vortex
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                            />
                        </div>
                        <p>Waiting for updates...</p>
                    </div>
                ) : (
                    data.map((d) => (
                        <div key={d.id} className="shipment-update mb-3">
                            <CustomLabelValue label="Shipment ID" value={d.id} />
                            <CustomLabelValue label="Status" value={d.status} />
                            <CustomLabelValue label="Location" value={d.location} />
                            <CustomLabelValue label="Last updated date" value={new Date(d.timestamp).toLocaleTimeString()} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shipment;
