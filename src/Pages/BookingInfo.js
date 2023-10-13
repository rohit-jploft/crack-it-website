import "./../style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Bookingimg2 from "./../Images/booking-img2.svg";
import Time2 from "./../Images/time2.svg";
import Message2 from "./../Images/message2.svg";
import { getSingleBookingDetail } from "../data/booking";
import { getDateFromTimeStamps, getTimeFromTimestamps } from "../helper/helper";

const BookingInfo = () => {
  const { bookingId } = useParams();
  const [bookingData, setBookingData] = useState();
  const getBookingData = async () => {
    const data = await getSingleBookingDetail(bookingId);
    console.log(data);
    setBookingData(data.data);
  };
  useEffect(() => {
    getBookingData();
  }, []);
  return (
    <>
      <Header />
      <section className="">
        <Container>
          <div className="main-content">
            <div class="content-head">
              <div>
                <h2>Booking info</h2>
                <p>See your scheduled meetings from your calendar</p>
              </div>
              <div>
                {/* <Link to="/MyBookings"> */}
                <button
                  className={`btn_${
                    bookingData?.booking?.booking?.status === "CONFIRMED" ||
                    bookingData?.booking?.booking?.status === "ACCEPTED" ||
                    bookingData?.booking?.booking?.status === "COMPLETED" 
                      ? "confirmed"
                      : "rejected"
                  }`}
                >
                  {bookingData?.booking?.booking?.status}
                </button>
                {/* </Link> */}
              </div>
            </div>
            <div className="provider-info">
              <div className="info-header">
                <h6>Service Provider Info</h6>
                <div className="profile-detail">
                  <div>
                    <img src={Bookingimg2} alt="img" />
                  </div>
                  <div>
                    <h4>
                      {bookingData?.booking?.booking?.expert?.firstName}{" "}
                      {bookingData?.booking?.booking?.expert?.lastName}
                    </h4>
                    <p>
                      {bookingData?.expertProfile?.jobCategory?.title} |{" "}
                      {bookingData?.expertProfile?.experience} year
                    </p>
                  </div>
                </div>
              </div>
              <div className="info-content">
                <div className="info-detail">
                  <div className="datetime-info">
                    <div>
                      <img src={Time2} alt="img" />
                    </div>
                    <div>
                      <h5>Date & Time</h5>
                      <p>
                        {getDateFromTimeStamps(
                          bookingData?.booking?.booking?.date
                        )}
                      </p>
                      <p>
                        {getTimeFromTimestamps(
                          bookingData?.booking?.booking?.startTime
                        )}{" "}
                        -{" "}
                        {getTimeFromTimestamps(
                          bookingData?.booking?.booking?.endTime
                        )}
                      </p>
                    </div>
                  </div>
                  <hr className="info-hr"></hr>
                  {/* <div className="datetime-info">
                    <div>
                      <img src={Message2} alt="img" />
                    </div>
                    <div>
                      <h5>Date & Time</h5>
                      <p>Monday 21 Aug, 2023</p>
                      <p>8:00 - 8:30 AM</p>
                    </div>
                  </div> */}
                </div>
                <div className="payment-info">
                  <h5>Payment Info</h5>
                  <div className="pay-rate">
                    <div>Total Price</div>
                    <div>${bookingData?.booking.totalAmount}</div>
                  </div>
                  <div className="pay-rate">
                    <div>Tax</div>
                    <div>$0.00</div>
                  </div>
                  <hr className="info-hr"></hr>
                  <div className="pay-total">
                    <div>Payment Total</div>
                    <div>${bookingData?.booking.totalAmount}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BookingInfo;
