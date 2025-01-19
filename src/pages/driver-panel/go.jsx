import React from "react";
import Header from "../../components/driver-panel/header";
import "../../App.css"; // Include Tailwind styles
import { Link } from "react-router-dom";

const Go = () => {
  return (
    <div className="relative h-screen flex flex-col">
      <div
        className="absolute top-0 right-0 left-0 z-10
      "
      >
        <Header />
      </div>
      <main className="flex-grow h-full bg-gray-100">
        <div className=" h-full">
          <img
            src="/map.png"
            alt="Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute -translate-x-1/2 left-1/2 bottom-5 flex justify-center items-center">
            <div className="go-button-bg-gradient p-5 rounded-full">
              <Link to={"/d/accept"}>
                <button className="go-button-gradient text-white px-6 py-2 h-[100px] w-[100px] rounded-full text-[32px] font-[600]">
                  Go
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Go;
