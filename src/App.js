import React from "react";
import Routes from "./routes/index";
import AuthState from "./context/auth/AuthState";

function App() {
  return (
    <AuthState>
      <Routes />
    </AuthState>
  );
}

export default App;
