import React from "react";
import Header from "../../../components/user-panel/header";
import Carousel from "../../../components/user-panel/carousel";
import RideForm from "../../../components/user-panel/ride-form";

const Reserve = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[1180px] mx-auto min-h-[500px] items-center p-4">
        <RideForm pageLink={"/reserve/ride"} />
        {/* <Map /> */}
      </div>
      <Carousel />
    </div>
  );
};

export default Reserve;
