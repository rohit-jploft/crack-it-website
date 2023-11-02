import React from 'react'
import Header from './Header';
import { Container } from 'react-bootstrap';

import Gamil from "./../Images/gmail.svg";
import Facebook from "./../Images/facebook.svg";
import Twitter from "./../Images/twitter.svg";
import Msg from "./../Images/msg-1.svg";
import Copy from "./../Images/copy.svg";
import { Link , useLocation} from 'react-router-dom';
 const ReferAndEarn = () => {
  const userId = localStorage.getItem('userId')
  const match = useLocation();
  console.log(match)

  return (
    <div>
         <Header />
      <section className="">
        <Container>
        <div className='refer-earn'>
            <div className='refer-banner'>
                <h2>Refer a Friend</h2> 
                <p>$ earn credit</p>
            </div>
            <p className='text-refer'>Share a link with your friends via E-mail, Facebook Twitter or messenger. When they sign up using your link they get $5 free. And when they make purchase you'll get $5 free too.</p>
            <div>
                <ul className='social-link-man'>
                    <li><Link to="/"> <img src={Gamil} /></Link></li>
                    <li><Link to="/"> <img src={Facebook} /></Link></li>
                    <li><Link to="/"> <img src={Twitter} /></Link></li>
                    <li><Link to="/"> <img src={Msg} /></Link></li>
                </ul>
                <p className='text-center w-100 text-refer m-0'>Or share your personal link</p>
                
            </div>
            <div className='input-copy'>
                <p>{`${match.pathname}refer/earn/signup/${userId}`}<img src={Copy}/></p>
            </div>
        </div>
        </Container>
      </section>
    </div>
  )
}
export default ReferAndEarn;
