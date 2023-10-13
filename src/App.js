import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Forgotpassword from "./Pages/ForgotPassword";
import Resetpassword from "./Pages/ResetPassword";
import OTP from "./Pages/OTP";
import MyBookings from "./Pages/MyBookings";
import BookingInfo from "./Pages/BookingInfo";
import JobCategory from "./Pages/JobCategory";
import SubCategory from "./Pages/SubCategory";
import RequestCateg from "./Pages/RequestCateg";
import Experts from "./Pages/Experts";
import ExpertsProfile from "./Pages/ExpertsProfile";
import MyProfile from "./Pages/MyProfile";
import Payment from "./Pages/Payment";
import Rating from "./Pages/Rating";
import Wallet from "./Pages/Wallet";
import Chat from "./Pages/Chat";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "./utils/authHelper";
import Router from "./routes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
