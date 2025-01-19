import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/user-panel/auth/login";
import Signup from "../pages/user-panel/auth/register";
import Verification from "../pages/user-panel/auth/verification";
import Name from "../pages/user-panel/auth/name";
import Ride from "../pages/user-panel/ride/ride";
import Booked from "../pages/user-panel/rent/booked";
import RideCars from "../pages/user-panel/rent/cars";
import RideCarSelection from "../pages/user-panel/shared/ride-car-selection";
import RideDetail from "../pages/user-panel/rent/rent-details";
import MeetDriverScreen from "../pages/user-panel/shared/meet-the-driver";
import StartRideScreen from "../pages/user-panel/shared/start-ride";
import StartDestinationScreen from "../pages/user-panel/towards-destination";
import CompletedScreen from "../pages/user-panel/shared/completed";
import ReviewScreen from "../pages/user-panel/shared/review";
import ThankYouScreen from "../pages/user-panel/shared/thankyou";
import DriverBooking from "../pages/user-panel/driver/driver-booking";
import DriverConfirmation from "../pages/user-panel/driver/driver-confirmation";
import StartJourney from "../pages/user-panel/shared/start-journey";
import CarDetail from "../pages/user-panel/rent/car-details";
import ConfirmCar from "../pages/user-panel/rent/confirm-car";
import HomePage from "../pages/user-panel/static/Home";
import Wallet from "../pages/user-panel/Wallet";
import PackageDelivery from "../pages/user-panel/package/package-delivery";
import PackageBooked from "../pages/user-panel/package/package-booked";
import ConfirmPickup from "../pages/user-panel/package/confirm-pickup copy.jsx";
import ConfirmDelivery from "../pages/user-panel/package/confirm-delivery";
import Bill from "../pages/user-panel/bill/bill.jsx";
import BillDetails from "../pages/user-panel/bill/bill-details";
import Activity from "../pages/user-panel/activity/activity";
import PrivacyPolicy from "../pages/user-panel/static/privacy-policy";
import Languages from "../pages/user-panel/static/languages";
import Settings from "../pages/user-panel/static/settings.jsx";
import Details from "../pages/user-panel/reserve/details";
import Successful from "../pages/user-panel/reserve/successful";
import Reserve from "../pages/user-panel/reserve/reserve";
import DriverStart from "../pages/user-panel/driver/start";
import PackageCarSelection from "../pages/user-panel/package/selection";
import TrackPackage from "../pages/user-panel/package/track";

import CarpoolSelection from "../pages/user-panel/carpool/selection";
import Carpool from "../pages/user-panel/carpool/carpool.jsx";
import ReserveRide from "../pages/user-panel/reserve/reserve-ride.jsx";
import ReserveSelection from "../pages/user-panel/reserve/reserve-selection.jsx";
import Driver from "../pages/user-panel/reserve/driver.jsx";
import Go from "../pages/driver-panel/go.jsx";
import Accept from "../pages/driver-panel/accept.jsx";
import Reached from "../pages/driver-panel/reached.jsx";
import End from "../pages/driver-panel/end.jsx";
import Completed from "../pages/driver-panel/completed.jsx";
import Review from "../pages/driver-panel/review.jsx";
import ThankYou from "../pages/driver-panel/thankyou.jsx";
import TermsAndConditions from "../pages/driver-panel/terms.jsx";
import Revenue from "../pages/driver-panel/revenue.jsx";
import Rides from "../pages/driver-panel/rides.jsx";
import RatingsDashboard from "../pages/driver-panel/ratings.jsx";
import SetupAccount from "../pages/driver-panel/setup-account.jsx";
import SetupProfile from "../pages/driver-panel/setup-profile.jsx";
import SetupLicense from "../pages/driver-panel/setup-license.jsx";
import DriverWallet from "../pages/driver-panel/Wallet.jsx";
import PackageGo from "../pages/driver-panel/package/go.jsx";
import PackageAccept from "../pages/driver-panel/package/accept.jsx";
import PackageCompleted from "../pages/driver-panel/package/completed.jsx";
import PackageEnd from "../pages/driver-panel/package/end.jsx";
import DriverVerification from "../pages/driver-panel/auth/verification.jsx";
import DriverName from "../pages/driver-panel/auth/name.jsx";
import VehicleRegistration from "../pages/driver-panel/vehicle-registration.jsx";
import VehicleInsurance from "../pages/driver-panel/vehicle-insurance.jsx";
import CreateListing from "../pages/driver-panel/create-listing.jsx";
import EditListing from "../pages/driver-panel/edit-listing.jsx";
import Pass from "../pages/driver-panel/pass.jsx";
import Bookings from "../pages/driver-panel/bookings.jsx";
import Listings from "../pages/driver-panel/listings.jsx";
import Earn from "../pages/driver-panel/auth/earn.jsx";
import EarnTypes from "../pages/driver-panel/auth/earn-types.jsx";
import Welcome from "../pages/driver-panel/auth/welcome.jsx";
import VehicleType from "../pages/driver-panel/auth/vehicle-type.jsx";
import AccountType from "../pages/driver-panel/auth/account-types.jsx";
import DriverRegister from "../pages/driver-panel/auth/register.jsx";
import PackageDelivered from "../pages/driver-panel/package/delivered.jsx";
import ChoosePanel from "../pages/choose-panel.jsx";
import TotalListings from "../pages/driver-panel/total-listings.jsx";
import TotalBookings from "../pages/driver-panel/total-bookings.jsx";
import DriverSettings from "../pages/driver-panel/static/settings.jsx";
import DriverPrivacyPolicy from "../pages/driver-panel/static/privacy-policy.jsx";
import DriverLanguages from "../pages/driver-panel/static/languages.jsx";
import DriverActivity from "../pages/driver-panel/activity/activity.jsx";
import Dashboard from "../pages/driver-panel/dashboard.jsx";
import MultiStepForm from "../pages/registers.jsx";
const App = () => {
  const [userData, setUserData] = useState({});

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/registers" element={<MultiStepForm/>}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose" element={<ChoosePanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/name" element={<Name />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/package" element={<PackageDelivery />} />
          <Route path="/package/pickup" element={<ConfirmPickup />} />
          <Route path="/package/delivery" element={<ConfirmDelivery />} />
          <Route path="/package/selection" element={<PackageCarSelection />} />
          <Route path="/package/booked" element={<PackageBooked />} />
          <Route path="/package/track" element={<TrackPackage />} />

          <Route path="/carpool" element={<Carpool />} />
          <Route path="/carpool/selection" element={<CarpoolSelection />} />
          <Route path="/carpool/driver" element={<MeetDriverScreen />} />
          <Route path="/carpool/start" element={<StartRideScreen />} />
          <Route path="/carpool/journey" element={<StartDestinationScreen />} />

          <Route path="/bill" element={<Bill />} />
          <Route path="/bill/details" element={<BillDetails />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/ride/selection" element={<RideCarSelection />} />
          <Route path="/ride/meet" element={<MeetDriverScreen />} />
          <Route path="/ride/start" element={<StartRideScreen />} />
          <Route path="/ride/completed" element={<CompletedScreen />} />
          <Route path="/ride/review" element={<ReviewScreen />} />
          <Route path="/ride/thank-you" element={<ThankYouScreen />} />
          <Route path="/rent/cars" element={<RideCars />} />
          <Route path="/rent/car/details/:id" element={<CarDetail />} />
          <Route path="/rent/car/confirm/:id" element={<ConfirmCar />} />
          <Route path="/rent/car/booked" element={<Booked />} />
          <Route path="/rent/car/detail" element={<RideDetail />} />
          <Route
            path="/ride-car/towards-destination"
            element={<StartDestinationScreen />}
          />
          <Route path="/drivers" element={<DriverBooking />} />
          <Route path="/driver/confirmation/:driverId" element={<DriverConfirmation />} />
          <Route path="/driver/start" element={<DriverStart />} />
          <Route path="/driver/start-journey" element={<StartJourney />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/reserve/ride" element={<ReserveRide />} />
          <Route path="/reserve/selection" element={<ReserveSelection />} />
          <Route path="/reserve/driver" element={<Driver />} />
          <Route path="/reserve/details" element={<Details />} />
          <Route path="/reserve/successful" element={<Successful />} />

          {/* Driver Panel Routes are here */}
          <Route path="/d/signup" element={<DriverRegister />} />
          <Route path="/d/verification" element={<DriverVerification />} />
          {/* <Route path="/d/name" element={<DriverName />} /> */}
          <Route
            path="/d/name"
            element={<DriverName setUserData={setUserData} />}
          />

          {/* <Route path="/d/earn" element={<Earn />} setUserData={setUserData} /> */}
          <Route path="/d/earn" element={<Earn setUserData={setUserData} />} />

          <Route path="/d/earn-types" element={<EarnTypes />} />
          <Route
            path="/d/vehicle-types"
            element={<VehicleType setUserData={setUserData} />}
          />
          <Route path="/d/account-types" element={<AccountType />} />
          <Route path="/d/welcome" element={<Welcome />} />
          <Route path="/d/" element={<Go />} />
          <Route path="/d/dashboard" element={<Dashboard />} />
          <Route
            path="/d/vehicle/registration"
            element={<VehicleRegistration />}
          />
          <Route path="/d/vehicle/insurance" element={<VehicleInsurance />} />
          <Route path="/d/vehicle/create" element={<CreateListing />} />
          <Route path="/d/vehicle/edit/:id" element={<EditListing />} />
          <Route path="/d/vehicle/pass" element={<Pass />} />
          <Route path="/d/vehicle/bookings" element={<Bookings />} />
          <Route path="/d/vehicle/listings" element={<Listings />} />
          <Route path="/d/accept" element={<Accept />} />
          <Route path="/d/reached" element={<Reached />} />
          <Route path="/d/end" element={<End />} />
          <Route path="/d/completed" element={<Completed />} />
          <Route path="/d/review" element={<Review />} />
          <Route path="/d/thank-you" element={<ThankYou />} />
          <Route path="/d/terms" element={<TermsAndConditions />} />
          <Route path="/d/revenue" element={<Revenue />} />
          <Route path="/d/rides" element={<Rides />} />
          <Route path="/d/activity" element={<DriverActivity />} />
          <Route path="/d/listing" element={<TotalListings />} />
          <Route path="/d/bookings" element={<TotalBookings />} />
          <Route path="/d/rating" element={<RatingsDashboard />} />
          <Route path="/d/languages" element={<DriverLanguages />} />
          <Route path="/d/privacy-policy" element={<DriverPrivacyPolicy />} />
          <Route path="/d/settings" element={<DriverSettings />} />
          <Route path="/d/setup-account" element={<SetupAccount />} />
          <Route path="/d/setup-profile" element={<SetupProfile />} />
          <Route path="/d/setup-license" element={<SetupLicense />} />
          <Route path="/d/wallet" element={<DriverWallet />} />
          <Route path="/d/package/" element={<PackageGo />} />
          <Route path="/d/package/accept" element={<PackageAccept />} />
          <Route path="/d/package/reached" element={<PackageCompleted />} />
          <Route path="/d/package/end" element={<PackageEnd />} />
          <Route path="/d/package/delivered" element={<PackageDelivered />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
