import './../style.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import ExpertImg from './../Images/expert-img.svg';
import Email from './../Images/email.svg';
import Phone from './../Images/phone-call.svg';
import RightArrow from './../Images/Right_Arrow.svg';
import Logout2 from './../Images/logout2.svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Edit from './../Images/edit.svg';
import Cancelicon from './../Images/cancel-icon.svg';
import Axios from 'axios';
import { BASE_URL } from '../constant';

const MyProfile = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [userdata, setUserData] = useState(false);
  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);
  const getUserData = async () => {
    const token = localStorage.getItem('token');
    const res = await Axios.get(`${BASE_URL}auth/user/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.data) {
      console.log(res.data.data)
      setUserData(res.data.data);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
    return (
    <>
    <Header />
    <section className="">
      <Container>
        <div className='main-content'>
          <div className='job-categ'>
            <div className='myprofile_field'>
                <h3>My Profile</h3>
                <div className='expertprofile-detail'>
                   <div className='expert-image'>
                    <img src={ExpertImg} alt="Img" />
                    <Button className='profile-img-edit' onClick=''><img src={Edit} alt="img" /></Button>
                   </div>
                   <h2>{userdata.firstName} {userdata.lastName}</h2>
                   <p>User Experience & Motion Design</p>
                </div>
                <div className='user-details'>
                  <div className='row'>
                    <div className='col-md-6 text-center'>
                      <div className='usersubdetail b-rgt'>
                        <img src={Email} alt="img" />
                        <p>{userdata.email}</p>
                      </div>
                    </div>
                    <div className='col-md-6 text-center'>
                      <div className='usersubdetail'>
                        <img src={Phone} alt="img" />
                          <p>{userdata.countryCode} {userdata.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='expert-descrip'>
                  <h2>Description</h2>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                </div>
                <div className='expert-actions'>
                  <Button className='profile-action' onClick={() => navigate('/mybookings/Past')}>Booking History <img src={RightArrow} alt="img" /></Button>
                  <Button className='profile-action' onClick={handleShow1}>Delete Account <img src={RightArrow} alt="img" /></Button>
                </div>
                <div className='text-center logout' style={{cursor:"pointer"}}  onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('userId')
                  localStorage.removeItem('role')
                  navigate("/login")

                }}><img src={Logout2} alt="img" /> Logout</div>
            </div>
          </div>
            
        </div>      
      </Container>
    </section>

    <Modal show={show} onHide={handleClose1} className='cancel_modal'>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <img src={Cancelicon} alt="img" />
          <Modal.Title>Are you sure you want to delete this account?</Modal.Title>
         <Button className='no-btn' onClick={handleClose1}>
            No
          </Button>
          <Button className='yes-btn' onClick={handleClose1}>
            Yes
          </Button>
          </Modal.Body>
      </Modal>
    </>
    )
  };


  
export default MyProfile; 