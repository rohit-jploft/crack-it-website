import Footer from './Footer';
import './../style.css';
import Logo from './../Images/logo.png';
import Notification from './../Images/notification.svg';
import Boyright from './../Images/boy.svg';
import ArrowLeft from './../Images/Arrow_Left.svg';
import Tech1 from './../Images/tech1.svg';
import Tech2 from './../Images/tech2.svg';
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';


const Home = () => {
    return (
    <>
    <section className="landing_banner">
        <Container>
            <div className='Header_nav'>
                <div className="brand-logo">
                  <img src={Logo} alt="Logo" />
                </div>
                <div className="header-right">
                    <Link to="/"><img src={Notification} alt="Logo" /></Link>
                    <Link to="/Login"><button className="btn_login">LOGIN</button></Link>
                    <Link to="/Signup"><button className="btn_signup">SIGN UP</button></Link>
                </div>
            </div>
            <div className='row top-content'>
                <div className='col-md-6'>
                    <h1>Interview Proxy for <span>AWS</span></h1>
                    <p>If you are a fresher or experienced, struggling to CRACK the interview, No Worries. we have a team of experienced professionals who can help you to get the JOB.</p>
                    <button className="btn_getstrated">GET STARTED <img src={ArrowLeft} alt="Logo" /></button>
                </div>
                <div className='col-md-6 right-img'>
                    <img src={Boyright} alt="boy" />
                </div>
            </div>
        </Container>
    </section>
    <section className="tech_section">
        <Container>
            <div className='technologies'>
                <div className='tech_box'>
                    <h3>DevOps</h3>
                    <p>10+ year DevOps professional will help you the CRACK the interview.</p>
                    <img src={Tech1} alt="boy" />
                </div>
                <div className='tech_box'>
                    <h3>Java, Python</h3>
                    <p>7+ year professional will help you the CRACK the interview.</p>
                    <img src={Tech2} alt="boy" />
                </div>
            </div>
        </Container>
    </section>
    <Footer/>
    </>
    )
  };


  
export default Home; 