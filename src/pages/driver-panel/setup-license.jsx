"use client";

import React, { useState } from "react";
import Header from "../../components/driver-panel/header";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SetupLicense() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConfirm = async () => {
    if (!file) {
      alert("Please upload a file before confirming.");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", "drivingLicense"); // Replace with dynamic document type
    formData.append("file", file);

    try {
      const response = await fetch("https://moovr-api.vercel.app/api/v1/driver/upload-document", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        // Redirect or update UI as needed
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full">
        <Header />
      </div>

      <div className="w-full max-w-5xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </div>

          {/* Content */}
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Driving License
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Upload your high quality picture, where your face is clearly visible.
          </p>

          {/* File Upload */}
          <div
            className="border-2 border-dashed h-[230px] border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
            onClick={() => document.getElementById("file-input").click()}
          >
            <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3" />
            <p className="text-gray-500 text-sm">
              {file ? file.name : "Upload CNIC Front side"}
            </p>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Confirm Button */}
          <Link to={"/d/"}>
            <button
              onClick={handleConfirm}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg mt-6 transition"
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
