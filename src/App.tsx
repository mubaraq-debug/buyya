import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./route/appRoutes.tsx";
import { AuthProvider } from "./context/authContext.tsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
