import { useRoutes, Navigate } from "react-router-dom";

import { isAuthenticated, isExpert } from "./utils/authHelper";
import Login from "./Pages/Login";
import MyBookings from "./Pages/MyBookings";
import Signup from "./Pages/SignUp";
import Forgotpassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import Resetpassword from "./Pages/ResetPassword";
import OTP from "./Pages/OTP";
import JobCategory from "./Pages/JobCategory";
import SubCategory from "./Pages/SubCategory";
import RequestCateg from "./Pages/RequestCateg";
import Experts from "./Pages/Experts";
import ExpertsProfile from "./Pages/ExpertsProfile";
import Wallet from "./Pages/Wallet";
import MyProfile from "./Pages/MyProfile";
import Chat from "./Pages/Chat";
import Rating from "./Pages/Rating"
import Payment from "./Pages/Payment";
import BookingInfo from "./Pages/BookingInfo";
import WithdrawAmount from "./Pages/WithdrawAmount";
import AddBankDtails from "./Pages/AddBankDetails";
import AddUpiId from "./Pages/AddUpiID";
import SetupExpertProfile from "./Pages/SetupExpertProfile";
import ChangePassword from "./Pages/ChangePassword";

function AppRoutes() {
  const isAuthenticateds = isAuthenticated();
  const isThisExpert = isExpert()
  console.log("is Auth", isAuthenticateds);
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: !isAuthenticateds ? <Login />:<Navigate to="/mybookings" /> ,
    },
    {
      path: "/forgotpassword",
      element: !isAuthenticateds ? <Forgotpassword />:<Navigate to="/mybookings" /> ,
    },
    {
      path: "/resetpassword",
      element: !isAuthenticateds ? <Resetpassword />:<Navigate to="/mybookings" /> ,
    },
    {
      path: "/otp",
      element: !isAuthenticateds ? <OTP />:<Navigate to="/mybookings" /> ,
    },
    {
      path: "/JobCategory",
      element: isAuthenticateds ? <JobCategory />:<Navigate to="/login" /> ,
    },
    {
      path: "/subCategory",
      element: isAuthenticateds ? <SubCategory />:<Navigate to="/login" /> ,
    },
    {
      path: "/RequestCateg",
      element: isAuthenticateds ? <RequestCateg />:<Navigate to="/login" /> ,
    },
    {
      path: "/experts",
      element: isAuthenticateds ? <Experts />:<Navigate to="/login" /> ,
    },
    {
      path: "/mybookings",
      element: isAuthenticateds ? <MyBookings />:<Navigate to="/login" /> ,
    },
    {
      path: "/bookingInfo/:bookingId",
      element: isAuthenticateds ? <BookingInfo />:<Navigate to="/login" /> ,
    },
    {
      path: "/ExpertsProfile/:userId",
      element: isAuthenticateds ? <ExpertsProfile />:<Navigate to="/login" /> ,
    },
    {
      path: "/wallet",
      element: isAuthenticateds ? <Wallet />:<Navigate to="/login" /> ,
    },
    {
      path: "/change-password",
      element: isAuthenticateds ? <ChangePassword />:<Navigate to="/login" /> ,
    },
    {
      path: "/Myprofile",
      element: isAuthenticateds ? isThisExpert ? <ExpertsProfile/>: <MyProfile />:<Navigate to="/login" /> ,
    },
    {
      path: "/chat",
      element: isAuthenticateds ? <Chat />:<Navigate to="/login" /> ,
    },
    {
      path: "/rating",
      element: isAuthenticateds ? <Rating/>:<Navigate to="/login" /> ,
    },
    {
      path: "/payment",
      element: isAuthenticateds ? <Payment/>:<Navigate to="/login" /> ,
    },
    {
      path: "/reset-password",
      element: !isAuthenticateds ? <Resetpassword/>:<Navigate to="/login" /> ,
    },
    {
      path: "/payment",
      element: isAuthenticateds ? <Payment/>:<Navigate to="/login" /> ,
    },
    {
      path: "/withdraw-amount",
      element: isAuthenticateds ? <WithdrawAmount/> : <Navigate to="/login" /> ,
    },
    {
      path: "/AddBankDtails",
      element: isAuthenticateds ? <AddBankDtails/> : <Navigate to="/login" /> ,
    },
    {
      path: "/AddUpiId",
      element: isAuthenticateds ? <AddUpiId/> : <Navigate to="/login" /> ,
    },
    {
      path: "/setup-profile",
      element: isAuthenticateds ? <SetupExpertProfile/> : <Navigate to="/login" /> ,
    },
  
    {
      path: "/signup",
      element: isAuthenticateds ? <Navigate to="/mybookings" /> : <Signup />,
      children: [
        {
          element: isAuthenticateds ? (
            <Navigate to="/mybookings" />
          ) : (
            <Signup />
          ),
        },
      ],
    },

    {
      path: "/mybookings",
      element: isAuthenticateds ? <MyBookings /> : <Navigate to="/login" />,
      children: [
        {
          element: isAuthenticateds ? (
            <MyBookings />
          ) : (
            <Navigate to="/mybookings" />
          ),
        },
      ],
    },
    {
      path: "/mybookings/:tabKey",
      element: isAuthenticateds ? <MyBookings /> : <Navigate to="/login" />,
      children: [
        {
          element: isAuthenticateds ? (
            <MyBookings />
          ) : (
            <Navigate to="/mybookings" />
          ),
        },
      ],
    },

    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}

export default AppRoutes;


