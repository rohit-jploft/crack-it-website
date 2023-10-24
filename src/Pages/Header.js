import { Outlet, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "./../Images/logo.png";
import Notification from "./../Images/notification.svg";
import Profile from "./../Images/profile.svg";
import Bookings from "./../Images/booking.svg";
import WalletIcon from "./../Images/wallet.svg";
import Chats from "./../Images/message.svg";
import Logout from "./../Images/logout.svg";
import ProfileH from "./../Images/profile.png";
import DownArrow from "./../Images/down_Arrow.svg";
import Axios from "axios";
import { BASE_URL } from "../constant";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { isUser } from "../utils/authHelper";
const Header = () => {
  const navigate = useNavigate();
  const { profileData, setProfileData } = useContext(UserContext);
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${BASE_URL}auth/user/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.data) {
      console.log(res.data.data);
      setProfileData(res.data.data);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const isTheUser = isUser()
  console.log(isTheUser," isTheUser")
  return (
    <>
      <Navbar expand="lg" className="nav_sect">
        <Container>
          <Navbar.Brand href="/mybookings">
            <div className="brand-logo">
              <img src={Logo} alt="Logo" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isTheUser && (
                <Nav.Link href="/JobCategory">
                  <button className="btn_login">BOOK NOW</button>
                </Nav.Link>
              )}
              <NavDropdown
                title={<img src={Notification} alt="Logo" />}
                id="notifiaction-dropdown"
                className="notification-menu"
              >
                <NavDropdown.Item href="#">
                  <div className="notif_msg">
                    <div>
                      <h3>Booking Confirmed</h3>
                      <p>It is a long established fact that a reader will be</p>
                    </div>
                    <div>
                      <h6>9:27 AM</h6>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="notif_msg">
                    <div>
                      <h3>Invitation accepted</h3>
                      <p>It is a long established fact that a reader will be</p>
                    </div>
                    <div>
                      <h6>9:27 AM</h6>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="notif_msg">
                    <div>
                      <h3>Booking Confirmed</h3>
                      <p>It is a long established fact that a reader will be</p>
                    </div>
                    <div>
                      <h6>Yesterday</h6>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="notif_msg">
                    <div>
                      <h3>Invitation accepted</h3>
                      <p>It is a long established fact that a reader will be</p>
                    </div>
                    <div>
                      <h6>Yesterday</h6>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="notif_msg">
                    <div>
                      <h3>Booking Confirmed</h3>
                      <p>It is a long established fact that a reader will be</p>
                    </div>
                    <div>
                      <h6>Yesterday</h6>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="notif_msg">
                    <div>
                      <h3>Invitation accepted</h3>
                      <p>It is a long established fact that a reader will be</p>
                    </div>
                    <div>
                      <h6>Yesterday</h6>
                    </div>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <div className="pull-left">
                    {profileData?.firstName} {profileData?.lastName}
                    {/* {profileData?.role} */}
                    <img
                      className="profile-drop-img"
                      src={ProfileH}
                      alt="user pic"
                    />
                    <img className="arrow-drop-img" src={DownArrow} alt="" />
                  </div>
                }
                id="basic-nav-dropdown"
                className="profile_menu"
              >
                <NavDropdown.Item href="/Myprofile">
                  <img src={Profile} alt="" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/Mybookings">
                  <img src={Bookings} alt="" />
                  Bookings
                </NavDropdown.Item>
                <NavDropdown.Item href="/wallet">
                  <img src={WalletIcon} alt="" />
                  Wallet
                </NavDropdown.Item>
                <NavDropdown.Item href="/Chat">
                  <img src={Chats} alt="" />
                  Chats
                </NavDropdown.Item>
                <NavDropdown.Item href="/change-password">
                  <img src={Chats} alt="" />
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="/refer/earn">
                  <img src={Chats} alt="" />
                  Refer & Earn
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    navigate("/login");
                  }}
                >
                  <img src={Logout} alt="" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Header;
