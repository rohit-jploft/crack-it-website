import './../style.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from './Header';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Visible from './../Images/visible.svg';
import EditText from './../Images/Edit_Text.svg';
import Deletee from './../Images/delete1.svg';
import Bookingimg from './../Images/booking-img.svg';
import Bookingimg2 from './../Images/booking-img2.svg';
import Cancelicon from './../Images/cancel-icon.svg';
import { useNavigate } from 'react-router-dom';


const ExpertTable = () => {

  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
    <>
    <Header />
    <section className="">
      <Container>
        <div className='main-content'>
          <div className='wallet_field'>
            <div>
              <div class="experttd-heading">
                <h3>Experts</h3>
                {/* <button class="btn_bg" onClick={() => navigate('/agency/add/expert')}>Add Expert</button> */}
              </div>
                <div className='table-responsive wallet-table experttd'>
                  <Table width="100%">
                    <thead>
                      <tr width="100%">
                        <th width="1%"></th>
                        <th width="15%">Name</th>
                        <th width="24%">Expertise</th>
                        <th width="15%">Experience</th>
                        <th width="15%">Price / hr</th>
                        <th width="15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><img className="wallet-img" src={Bookingimg} alt="img" /></td>
                        <td className='Wname'>Jaxen C</td>
                        <td>Databases Expert</td>
                        <td>7 yrs</td>
                        <td>$59.00</td>
                        <td><span className='expertd-action'><img src={Visible}/><img src={EditText}/><img src={Deletee} variant="primary" onClick={handleShow}/></span></td>
                      </tr>
                      <tr>
                        <td><img className="wallet-img" src={Bookingimg2} alt="img" /></td>
                        <td className='Wname'>James M</td>
                        <td>Front-end Expert</td>
                        <td>3 yrs</td>
                        <td>$59.00</td>
                        <td><span className='expertd-action'><img src={Visible}/><img src={EditText}/><img src={Deletee} variant="primary" onClick={handleShow}/></span></td>
                      </tr>
                      <tr>
                        <td><img className="wallet-img" src={Bookingimg} alt="img" /></td>
                        <td className='Wname'>Jaxen C</td>
                        <td>Databases Expert</td>
                        <td>7 yrs</td>
                        <td>$59.00</td>
                        <td><span className='expertd-action'><img src={Visible}/><img src={EditText}/><img src={Deletee} variant="primary" onClick={handleShow}/></span></td>
                      </tr>
                      <tr>
                        <td><img className="wallet-img" src={Bookingimg2} alt="img" /></td>
                        <td className='Wname'>James M</td>
                        <td>Front-end Expert</td>
                        <td>3 yrs</td>
                        <td>$59.00</td>
                        <td><span className='expertd-action'><img src={Visible}/><img src={EditText}/><img src={Deletee} variant="primary" onClick={handleShow}/></span></td>
                      </tr>
                      <tr>
                        <td><img className="wallet-img" src={Bookingimg} alt="img" /></td>
                        <td className='Wname'>Jaxen C</td>
                        <td>Databases Expert</td>
                        <td>7 yrs</td>
                        <td>$59.00</td>
                        <td><span className='expertd-action'><img src={Visible}/><img src={EditText}/><img src={Deletee} variant="primary" onClick={handleShow}/></span></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
            </div>
          </div>
            
        </div>      
      </Container>
    </section>
    <Modal show={show} onHide={handleClose} className='cancel_modal'>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <img src={Cancelicon} alt="img" />
          <Modal.Title>Are you sure you want to delete expert?</Modal.Title>
        
          <Button className='no-btn' onClick={handleClose}>
            No
          </Button>
          <Button className='yes-btn' onClick={handleClose}>
            Yes
          </Button>
          </Modal.Body>
      </Modal>
    </>
    )
  };


  
export default ExpertTable; 