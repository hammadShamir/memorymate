import React, { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Footer from "./components/Footer";
import Appointment from "./components/Appointment";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/Protected";
import Remainder from "./components/Remainder";
import Modal from "./components/Modal";
function App() {
  const [user, setUser] = useState();
  const [key, setkey] = useState();

  //TODO Run UseEffect when url Change

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ value: token });
      setkey(Math.random());
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header key={key} user={user} />
        <div className="container h-100">
          <Routes>
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path='/' element={<ProtectedRoute />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/appointment" element={<Appointment />} />
              <Route exact path="/remainder" element={<Remainder />} />
              <Route exact path="/alert" element={<Modal />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
