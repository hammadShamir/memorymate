import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Footer from './components/Footer';
import Appointment from './components/Appointment';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container h-100">
          <Routes>
            <Route exact path="/appointment" element={<Appointment />} />
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
