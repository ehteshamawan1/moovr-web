"use client";

import React from "react";
import { FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VehicleRegistration() {
  const handleConfirm = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput?.files[0];
    const ownerName = document.getElementById("ownerName")?.value;
    const registrationNumber = document.getElementById("registrationNumber")?.value;
    const vehicleModel = document.getElementById("vehicleModel")?.value;
    const registrationDate = document.getElementById("registrationDate")?.value;
    const expiryDate = document.getElementById("expiryDate")?.value;

    if (!file || !ownerName || !registrationNumber || !vehicleModel || !registrationDate || !expiryDate) {
      toast.error("Please fill all required fields and upload the file.");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", "vehicleRegistrationBook");
    formData.append("ownerName", ownerName);
    formData.append("registrationNumber", registrationNumber);
    formData.append("vehicleMakeModel", vehicleModel);
    formData.append("registrationDate", registrationDate);
    formData.append("registrationExpiryDate", expiryDate);
    formData.append("file", file);

    try {
      const response = await fetch("https://moovr-api.vercel.app/api/v1/driver/upload-document", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM",
        },
      });

      if (response.ok) {
        toast.success("Vehicle registration book uploaded successfully!");
        // Redirect or update UI as needed
      } else {
        toast.error("Vehicle registration book upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the vehicle registration book.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex wf items-center justify-center p-4">
      <div className="w-full max-w-[1180px] bg-white rounded-2xl shadow-md p-8 py-12 relative overflow-hidden">
        {/* Purple curved accent */}
        <div className="absolute top-0 right-0 ">
          <img src="/driver/vehicle-registration.svg" alt="" />
        </div>

        <div className="max-w-[600px] mx-auto">
          <h2 className="text-lg font-medium mb-8">
            Vehicle Registration Book
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9">
            <div className="space-y-2">
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-gray-700"
              >
                Owner's name
              </label>
              <input
                id="ownerName"
                placeholder="Owner name"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8257E9] focus:border-[#8257E9]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Registration number
              </label>
              <input
                id="registrationNumber"
                placeholder="Vehicle registration number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8257E9] focus:border-[#8257E9]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="vehicleModel"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle make and model
              </label>
              <input
                id="vehicleModel"
                placeholder="Vehicle make and model"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8257E9] focus:border-[#8257E9]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="registrationDate"
                className="block text-sm font-medium text-gray-700"
              >
                Registration date
              </label>
              <input
                id="registrationDate"
                type="date"
                placeholder="Registration date"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8257E9] focus:border-[#8257E9]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry date
              </label>
              <input
                id="expiryDate"
                type="date"
                placeholder="Expiry date"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8257E9] focus:border-[#8257E9]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="uploadBook"
                className="block text-sm font-medium text-gray-700"
              >
                Upload registration book
              </label>
              <div className="relative">
                <input
                  id="uploadBook"
                  placeholder="Upload from device"
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8257E9] focus:border-[#8257E9] cursor-pointer"
                  readOnly
                  onClick={() => document.getElementById("fileInput")?.click()}
                />
                <FiUpload className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full mt-8 px-4 py-2 bg-primaryPurple text-white rounded-md shadow-sm hover:bg-[#7347d5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8257E9]"
          >
            Confirm
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
