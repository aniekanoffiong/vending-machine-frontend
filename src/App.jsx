import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import MainApp from "./MainApp";
import { AppProvider } from "./context/AppContext";
import Register from "./Register";
import RedirectIfLoggedIn from "./RedirectIfLogin";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
      <AppProvider>
        <div>
          <Routes>
            <Route path="/" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
            <Route path="/register" element={<RedirectIfLoggedIn><Register /></RedirectIfLoggedIn>} />
            <Route path="/app" element={<PrivateRoute><MainApp /></PrivateRoute>} />
          </Routes>
          </div>
      </AppProvider>
    </Router>
  );
}