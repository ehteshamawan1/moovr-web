import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

// Create the context
const SocketContext = createContext();

// Your server URL where Socket.io is running
const SOCKET_URL = "http://localhost:5000";

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    // Cleanup when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const updateDriverLocation = (latitude, longitude) => {
    if (socket) {
      console.log("Sending location:", latitude, longitude); // Debugging log
      socket.emit("updateLocation", { latitude, longitude });
    }
  };

  // Continuous location update if geolocation changes (like watching position)
  const startLocationTracking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateDriverLocation(latitude, longitude); // Send location to the server
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Start location tracking when the app starts
  useEffect(() => {
    startLocationTracking(); // Automatically start tracking when context is loaded
  }, []);

  return (
    <SocketContext.Provider value={{ socket, updateDriverLocation }}>
      {children}
    </SocketContext.Provider>
  );
};
