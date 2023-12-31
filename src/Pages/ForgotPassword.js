import "./../style.css";
import Logo from "./../Images/logo.png";
import RightBg from "./../Images/right_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import Pot from "./../Images/pot.svg";
import Msg from "./../Images/msg.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useContext, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import TextInput from "../components/InputField";
import { ForgotPasswordSendOtp } from "../data/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/userContext";

const phoneOrEmailSchema = Yup.string().test('phoneOrEmail', 'Invalid phone or email', (value) => {
  if (!value) return true; // Allow empty input

  // Define regular expressions for phone number and email validation
  const phoneRegex = /^[0-9]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  if (phoneRegex.test(value) || emailRegex.test(value)) {
    return true; // Valid phone number or email
  } else {
    return false; // Invalid input
  }
});

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [dailCode, setDialCode] = useState("+91");
  const { setPhoneForOtp, phoneForOtp } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string()
        .matches(
          /^[0-9]{10}$/, // You can adjust the regular expression to match your desired format
          "Phone number must be exactly 10 digits"
        )
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      const { phone } = values;
      const res = await ForgotPasswordSendOtp(phone);
      console.log(res, "response signup");
      if (res.response && res.response.data.data) {
        toast.error(res.response.data.data.message, {
          autoClose: 800,
        });
      }
      if (res && res?.message && res?.success) {
        setPhoneForOtp(phone);
        toast.success("OTP Sent successfully")
        navigate('/otp')
        // props.close(false);
      }
      if (!res?.success && res?.status === 200)
        toast(res.message, { type: "error" });
    },
  });
  return (
    <>
      <ToastContainer />
      <section className="main_sect">
        <div className="content-left">
          <div className="brand-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-form form_sect">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <h2>Forgot Password?</h2>
              <p>Enter your details below</p>
              <div class="hellos">
                {/* <PhoneInput
                  country={"in"}
                  className="country-selector"
                  enableSearch
                  name="phone"
                  inputProps={{
                    name: "phone",
                  }}
                  inputStyle={{
                    height:"45px",
                    width:"100%"
                  }}
                  value={`+${dailCode}`}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(phone, e) => {
                    console.log("phone", phone);
                    console.log("e", e);
                    setDialCode(e.dialCode);
                    // setMobileNumberCountryCode(phone)

                    // setFieldValue("mobilenumberCountryCode", phone);
                  }}
                />
                    <div className="phone-number-fils"> */}
                <div>
                  <TextInput
                    name="phone"
                    type="text"
                    handleChange={formik.handleChange}
                    label="Phone"
                    value={formik.values.phone}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </div>
              </div>
              <button type="submit" className="form-btn">
                CONTINUE
              </button>
            </form>
          </div>
          <img className="img-pot" src={Pot} alt="" />
          <img className="img-msg" src={Msg} alt="" />
        </div>
        <div className="right_img">
          <img src={RightBg} alt="bg" />
        </div>
      </section>
    </>
  );
};

export default Forgotpassword;
