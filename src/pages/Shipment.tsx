import React, { useEffect, useState, useRef } from "react";
import CustomLabelValue from "../components/CustomLabelValue";
import { Vortex } from "react-loader-spinner";
import useCustomInfoDisplay from "../hooks/useCustomInfoDisplay";
import CustomSnackBar from "../components/CustomSnackBar";

// Types for Shipment data
interface ShipmentDataUpdate {
    id: string;
    status: string;
    location: string;
    timestamp: string;
}

const Shipment: React.FC = () => {
    const [data, setData] = useState<ShipmentDataUpdate[]>([]);
    const { setCloseSnackBar, setInfoDetails, messageState } = useCustomInfoDisplay();

    const [showTimeoutError, setShowTimeoutError] = useState(false);

    // WebSocket state
    const [websocket, setWebSocket] = useState<WebSocket | null>(null);
    const retryCountRef = useRef(0); // Using useRef to avoid causing re-renders on retry

    // Maximum retry attempts
    const maxRetries = 5;

    // Function to connect WebSocket
    const connectWebSocket = () => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("Connected to the web socket");
            retryCountRef.current = 0; // Reset retry count on successful connection
        };

        ws.onmessage = (event) => {
            try {
                const newUpdate = JSON.parse(event.data) as ShipmentDataUpdate;
                setData([newUpdate]);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
                setInfoDetails({ message: "Error processing shipment update.", isError: true });
            }
        };

        ws.onclose = (event) => {
            if (event.code !== 1000) {
                // 1000 means normal closure, others are abnormal
                console.error("WebSocket closed unexpectedly", event);
                setInfoDetails({ message: "WebSocket connection lost. Retrying...", isError: true });

                if (retryCountRef.current < maxRetries) {
                    setShowTimeoutError(false)
                    const retryDelay = Math.pow(2, retryCountRef.current) * 1000; // Exponential backoff
                    retryCountRef.current += 1; // Increment the retry count

                    setTimeout(() => {
                        console.log(`Reconnecting... Attempt ${retryCountRef.current}`);
                        connectWebSocket(); // Reconnect
                    }, retryDelay);
                } else {
                    setInfoDetails({ message: "Max reconnect attempts reached. Please try again later.", isError: true });
                    setShowTimeoutError(true)
                }
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error: ", error);
            setInfoDetails({ message: "Failed to connect to WebSocket server. Please check your connection.", isError: true });
        };

        setWebSocket(ws);
    };

    useEffect(() => {
        connectWebSocket(); // Initial WebSocket connection

        // Cleanup WebSocket on component unmount
        return () => {
            websocket?.close();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div>
            <h1 className="mb-4">Shipment Tracker</h1>
            <div className="shipment-updates">

                {/* Show error if unable to reconnect after 5 tries */}
                {showTimeoutError && <p>Something went wrong</p>}

                {(data.length === 0 && !showTimeoutError) ? (
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

            <CustomSnackBar
                isOpen={messageState.display}
                onClose={setCloseSnackBar}
                message={messageState.message}
                isError={messageState.isError}
            />
        </div>
    );
};

export default Shipment;
