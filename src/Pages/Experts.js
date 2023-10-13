import "./../style.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Searchicon from "./../Images/searchicon.svg";
import Bookingimg from "./../Images/booking-img.svg";
import Bookingimg2 from "./../Images/booking-img2.svg";
import Star from "./../Images/star.svg";
import { useContext, useEffect, useState } from "react";
import { createBooking, listExpert } from "../data/booking";
import { BookingContext } from "../context/bookingContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Experts = () => {
  const { jobCategory, getReqData, time } = useContext(BookingContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const getDataList = async () => {
    const data = await listExpert(search, jobCategory ? jobCategory : "");

    setData(data.data);
  };
  useEffect(() => {
    if (!jobCategory) {
      navigate("/jobCategory");
    }
  }, [search, jobCategory]);
  useEffect(() => {
    getDataList();
  }, [search, jobCategory]);
  console.log(getReqData);
  const onBookingExperts = async (e, ExuserId) => {
    e.preventDefault();

    const loggedUserId = localStorage.getItem("userId");
    await createBooking({
      ...getReqData,
      startTime: time + ":00",
      user: loggedUserId,
      expert: ExuserId,
    })
      .then((result) => {
        if (result && result.status === 200 && result.message) {
          toast(result.message, { type: "success" });
        }
        if (result && result.status === 203 && result.type === "error") {
          toast(result.message, { type: "error" });
        }
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <ToastContainer/>
      <Header />
      <section className="">
        <Container>
          <div className="main-content">
            <div className="">
              <div>
                <h3>Experts</h3>
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <img className="search-i" src={Searchicon} alt="Img" />
                </div>
                <div className="row table-responsive experts-table">
                  <Table width="100%">
                    <thead>
                      <tr width="100%">
                        <th width="1%"></th>
                        <th width="15%">Name</th>
                        <th width="24%">Expertise</th>
                        <th width="15%">Experience</th>
                        <th width="15%">Price</th>
                        <th width="15%">Rating</th>
                        <th width="15%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((expert) => {
                        return (
                          <tr
                            onClick={() =>
                              navigate(`/ExpertsProfile/${expert?.user?._id}`)
                            }
                          >
                            <td>
                              <img
                                className="prof-img"
                                src={Bookingimg}
                                alt="img"
                              />
                            </td>
                            <td>
                              {expert?.user?.firstName} {expert?.user?.lastName}
                            </td>
                            <td>{expert?.jobCategory?.title}</td>
                            <td>{expert?.experience} year</td>
                            <td>${expert?.price}</td>
                            <td>
                              <Link to="/Rating">
                                <img
                                  className="star-img"
                                  src={Star}
                                  alt="img"
                                />{" "}
                                {expert?.rating}
                              </Link>
                            </td>
                            <td>
                              {/* <Link to={`/ExpertsProfile/${expert?.user?._id}`}> */}
                              <button
                                className="btn_request"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onBookingExperts(e, expert?.user?._id)
                                }}
                              >
                                Request
                              </button>
                              {/* </Link> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Experts;
