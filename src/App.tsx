import React from "react";
import Routes from "./routes/index";
import AuthState from "./context/auth/AuthState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthState>
      <Routes />
      <ToastContainer />
    </AuthState>
  );
}

export default App;
