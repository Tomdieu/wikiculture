import React, { useEffect } from 'react';

const WebSocketComponent = () => {
    let socket:WebSocket;

    useEffect(() => {
        // Create WebSocket instance
        socket = new WebSocket('ws://localhost:8080');

        // Event listeners
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onclose = (event) => {
            console.log('WebSocket closed:', event.reason);
            // Reconnect on close
            setTimeout(() => {
                console.log('Attempting to reconnect...');
                socket = new WebSocket('ws://localhost:8080');
            }, 3000); // Adjust delay as needed
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onmessage = (event) => {
            console.log('Message received:', event.data);
            // Handle incoming messages
        };

        // Clean-up on component unmount
        return () => {
            socket.close();
        };
    }, []); // Empty dependency array to run once on mount

    return (
        <div>
            {/* Your component JSX */}
            Websocket
        </div>
    );
};

export default WebSocketComponent;
