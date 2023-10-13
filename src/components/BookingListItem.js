import Time from "./../Images/time.svg";
import Bookingimg from "./../Images/booking-img.svg";
import { useNavigate } from "react-router-dom";
import { isExpert } from "../utils/authHelper";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "../constant";
const BookingListItem = ({
  startTime,
  endTime,
  day,
  date,
  JobCategory,
  expertName,
  experience,
  cancelled,
  cancelButton,
  onClickChat,
  onClickCancel,
  onClickAccept,
  onClickDecline,
  status,
}) => {
  const navigate = useNavigate();
  const isThisExpert = isExpert();
  const makePayment = async()=>{
    const stripe = await loadStripe("ENTER YOUR PUBLISHABLE KEY");

   try {
    const body = {}
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch(`${BASE_URL}payment/intent/create`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
   } catch (error) {
    return error;
   }
}
  return (
    <div className="booking_field active">
      <div className="daydate">
        <p>{day}</p>
        <h3>{date}</h3>
      </div>
      <div className="time">
        <img src={Time} alt="time" />
        {startTime} - {endTime}
      </div>
      <div className="profile-detail">
        <div>
          <img src={Bookingimg} alt="img" />
        </div>
        <div>
          <h4>{expertName}</h4>
          <p>{JobCategory}</p>
        </div>
      </div>
      <div className="experience">
        <p>Experience</p>
        <h4>{experience} year</h4>
      </div>
      <div className="action">
        {cancelButton  && status !== "REQUESTED" && (
          <button
            className="btn_border"
            onClick={(e) => {
              e.stopPropagation();
              onClickCancel();
            }}
            variant="primary"
          >
            Cancel
          </button>
        )}
        {!isThisExpert && status === "ACCEPTED" && (
          <button
            className="btn_bg"
            onClick={(e) => {
              e.stopPropagation();
            //   onClickCancel();
            makePayment()
            // navigate('/payment')
            }}
            variant="primary"
          >
            Pay
          </button>
        )}
        {!isThisExpert && status === "ACCEPTED" && (
          <button
            className="btn_border"
            onClick={(e) => {
              e.stopPropagation();
              onClickCancel();
            }}
            variant="primary"
          >
            Cancel
          </button>
        )}
        {isThisExpert && status === "REQUESTED" && (
          <button
            className="btn_bg"
            onClick={(e) => {
              e.stopPropagation();
              onClickAccept()
            }}
          >
            Accept
          </button>
        )}
        {isThisExpert && status === "REQUESTED" && (
          <button
            className="btn_border"
            onClick={(e) => {
              e.stopPropagation();
              onClickDecline();
            }}
          >
            Decline
          </button>
        )}
        {!cancelled && status === "CONFIRMED" && (
          <button
            className="btn_bg"
            onClick={(e) => {
              e.stopPropagation();
              onClickChat();
            }}
          >
            Chat
          </button>
        )}
        {status == "CANCELLED"  && <button className="btn_cancelled">{status}</button>}
        {status == "DECLINED"  && <button className="btn_cancelled">{status}</button>}
      </div>
    </div>
  );
};

export default BookingListItem;