import './../style.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ExpertImg from './../Images/expert-img.svg';
import Star from './../Images/star.svg';
import Star2 from './../Images/star2.svg';
import Ex1 from './../Images/ex1.svg';
import Ex2 from './../Images/ex2.svg';
import Ex3 from './../Images/ex3.svg';
import Ex4 from './../Images/ex4.svg';


const Rating = () => {

    return (
    <>
    <Header />
    <section className="">
      <Container>
        <div className='main-content'>
          <div className='job-categ'>
            <div className='rating_field'>
                <h3>Rating</h3>
                <div className='expertprofile-detail'>
                   <div className='expert-image'>
                    <img src={ExpertImg} alt="Img" />
                   </div>
                   <h2>Jaxen C</h2>
                   <p>Front-end Expert</p>
                </div>
                <div className='give_rating'>
                    <h3>Give Rate</h3>
                    <div>
                      <img className='star-img' src={Star} alt="img" />
                      <img className='star-img' src={Star} alt="img" />
                      <img className='star-img' src={Star} alt="img" />
                      <img className='star-img' src={Star} alt="img" />
                      <img className='star-img' src={Star2} alt="img" />
                    </div>
                </div>
                <div class="input-field">
                    <label for="exampleFormControlInput1" class="form-label">Give Review</label>
                    <textarea type="email" rows='4' class="form-control" id="exampleFormControlInput1" placeholder=""/>
                </div>
                <div className='give_rating'>
                    <h3>How was experience</h3>
                    <div>
                      <img className='experience-img' src={Ex1} alt="img" />
                      <img className='experience-img' src={Ex2} alt="img" />
                      <img className='experience-img active' src={Ex3} alt="img" />
                      <img className='experience-img' src={Ex4} alt="img" />
                    </div>
                </div>
                <div className='text-center'>
                <Link to="/Experts"><Button className='btn_continue'>SUBMIT REVIEW</Button></Link>
                </div>
            </div>
          </div>
            
        </div>      
      </Container>
    </section>

    </>
    )
  };


  
export default Rating; 