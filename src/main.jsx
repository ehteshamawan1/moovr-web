import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./context/LocationProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="AIzaSyAxrweU7V8o6GsAENP-zXUPpBalFrfztS0
.apps.googleusercontent.com">
      <SocketProvider>
        <Toaster />
        <App />
      </SocketProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
