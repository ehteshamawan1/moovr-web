"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const dummyDrivers = [
  {
    _id: "dummy1",
    name: "John Doe",
    email: "john@example.com",
    isVerified: false,
  },
  {
    _id: "dummy2",
    name: "Jane Smith",
    email: "jane@example.com",
    isVerified: true,
  },
];

export default function VerifyDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); // "accept" or "decline"
  const [selectedDriver, setSelectedDriver] = useState(null);

  // "Fetch" drivers (using dummy data here)
  const fetchDrivers = () => {
    // In a real app, you might fetch from an API.
    // Here we simulate a delay.
    setTimeout(() => {
      setDrivers(dummyDrivers);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Open the confirmation modal
  const openModal = (driver, action) => {
    setSelectedDriver(driver);
    setModalAction(action);
    setModalOpen(true);
  };

  // Close the confirmation modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDriver(null);
    setModalAction("");
  };

  // Confirm the action in the modal (simulate accept/decline)
  const confirmAction = () => {
    if (!selectedDriver) return;
    const driverId = selectedDriver._id;

    if (modalAction === "accept") {
      // Simulate verifying the driver by updating the state
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver._id === driverId ? { ...driver, isVerified: true } : driver
        )
      );
      toast.success("Driver verified ✔️");
    } else if (modalAction === "decline") {
      // Simply show a toast for decline (no state change)
      toast.error("Driver approval declined ❌");
    }
    closeModal();
  };

  if (loading) return <p>Loading drivers...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Verify Drivers
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "2rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Driver Name
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Driver Email
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Document Verify
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "1rem" }}>{driver.name}</td>
                <td style={{ padding: "1rem" }}>{driver.email}</td>
                <td style={{ padding: "1rem" }}>
                  {driver.isVerified ? (
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        padding: "0.2rem 0.5rem",
                        border: "1px solid green",
                        borderRadius: "4px",
                      }}
                    >
                      Verified
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => openModal(driver, "accept")}
                        style={{
                          marginRight: "0.5rem",
                          padding: "0.4rem 0.8rem",
                          backgroundColor: "#4caf50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => openModal(driver, "decline")}
                        style={{
                          padding: "0.4rem 0.8rem",
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    style={{
                      marginRight: "0.5rem",
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#2196f3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#9e9e9e",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>
              Confirm {modalAction === "accept" ? "Accept" : "Decline"}
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Are you sure you want to {modalAction} driver{" "}
              {selectedDriver && selectedDriver.name}?
            </p>
            <div>
              <button
                onClick={confirmAction}
                style={{
                  marginRight: "1rem",
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}
