import "./../style.css";
import Logo from "./../Images/logo.png";
import RightBg from "./../Images/right_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "react-dom";

import Pot from "./../Images/pot.svg";
import Msg from "./../Images/msg.svg";
import Google from "./../Images/Google.svg";
import Visible from "./../Images/visible.svg";
import TextInput from "../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import Axios from "axios";
import { BASE_URL } from "../constant";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { getCategoryList } from "../data/booking";
import { ToastContainer, toast } from "react-toastify";
import { updateExpertProfile } from "../data/experts";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email")
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(
      /^[0-9]{10}$/, // You can adjust the regular expression to match your desired format
      "Phone number must be exactly 10 digits"
    ),
  experience: Yup.number().required("experience is required"),
  jobCategory: Yup.string().required("job category is required"),
  subCategory: Yup.string().required(),
  description: Yup.string()
    .min(100, "Description should minimum length of 100")
    .required("Description is required"),
  price: Yup.number().required("price is required"),
  languages: Yup.array(
    Yup.string().required("Atleast one language is required")
  ),
});
const EditExpertProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [jobCategoryList, setJobCategoryList] = useState();
  const [skillsData, setSkillsData] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [storeSkills, setStoreSkills] = useState([]);
  const {
    profileSetupData,
    setProfileSetupData,
    preEditExpertData,
    setPreEditExpertData,
  } = useContext(UserContext);
  const userId = localStorage.getItem("userId");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      description: "",
      experience: "",
      price: "",
      jobCategory: "",
      subCategory: "",
      languages: [],
    },
    onSubmit: async (values) => {
      if (storeSkills.length === 0) {
        toast.error("please select atleast one skill");
      } else {
        console.log("entered api call update wali");
        // Handle form submission here
        const data = await updateExpertProfile(userId, {
          description: values?.description,
          jobCategory: values?.jobCategory,
          price: values?.price,
          expertise: storeSkills,
          language: values?.languages,
          experience: values?.experience,
        });
        // console.log(data);
        if (data && data.success && data.status === 200) {
          toast.success(data.message, { autoClose: 500 });
          setTimeout(() => {
            navigate("/MyProfile");
          }, 600);
        } else {
          toast.error("Something went wrong");
        }

        //   setProfileSetupData(values);
        //   navigate("/edit/JobCategory");
        //   navigate("/myprofile");
      }
    },
    validationSchema,
  });
  const handleCheckboxChange = (event, value) => {
    const { name, checked } = event.target;
    const { languages } = formik.values;

    if (checked) {
      // If checkbox is checked, add the value to the array
      formik.setFieldValue(name, [...languages, value]);
    } else {
      // If checkbox is unchecked, remove the value from the array
      formik.setFieldValue(
        name,
        languages.filter((language) => language !== value)
      );
    }
  };
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${BASE_URL}expert/get/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    if (res.data.data) {
      setUserData(res.data.data);
      setPreEditExpertData(res?.data?.data);
      formik.setFieldValue("firstName", res.data.data?.expert?.user?.firstName);
      formik.setFieldValue("lastName", res.data.data?.expert?.user?.lastName);
      formik.setFieldValue("email", res.data.data?.expert?.user?.email);
      formik.setFieldValue("phone", res.data.data?.expert?.user?.phone);
      formik.setFieldValue("description", res.data.data?.expert?.description);
      formik.setFieldValue("price", res.data.data?.expert?.price);
      formik.setFieldValue("experience", res.data.data?.expert?.experience);
      console.log(
        "job category when selected",
        res.data.data?.expert?.jobCategory?._id
      );
      formik.setFieldValue(
        "jobCategory",
        res.data.data?.expert?.jobCategory?._id
      );
      let skilArr = [];
      for (let ski of res.data.data?.expert?.expertise) {
        skilArr.push(ski._id);
      }
      setStoreSkills(skilArr);
      formik.setFieldValue("languages", res.data.data?.expert?.languages);
    }
  };

  const getJobCateList = async () => {
    const res = await getCategoryList();
    setJobCategoryList(res?.data);
    console.log("cat list", res);
  };
  const getSubCateList = async () => {
    if (formik.values.jobCategory) {
      const res = await getCategoryList(formik.values.jobCategory);
      setSubCategoryList(res?.data);
      formik.setFieldValue("subCategory", res?.data[0]._id);
      console.log("sub cat list", res);
    }
  };
  const getSkills = async () => {
    if (formik.values.subCategory) {
      const res = await getCategoryList(formik.values.subCategory);
      setSkillsData(res?.data);
      console.log("skills list", res);
    }
  };
  function toggleSkillInArray(array, str) {
    let newArr = [...array];
    const index = array.indexOf(str);

    console.log("array, str", array, str);
    if (index === -1) {
      // String doesn't exist in the array, so add it
      newArr.push(str);
      setStoreSkills(newArr);
    } else {
      // String already exists in the array, so remove it
      newArr.splice(index, 1);
      setStoreSkills(newArr);
    }
  }
  useEffect(() => {
    getUserData();
    getJobCateList();
  }, []);
  useEffect(() => {
    setStoreSkills([]);
    getSubCateList();
  }, [formik.values.jobCategory]);
  useEffect(() => {
    getSkills();
  }, [formik.values.subCategory]);

  return (
    <>
      <ToastContainer />
      <Header />
      <section
        className="main_sect"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="content-left">
          <div className="signup-form form_sect add_expert_form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <div class="profileSetup">
                <h2>Edit Profile</h2>
                <div class="expert-image">
                  <img
                    src="/static/media/expert-img.199747df04b3a83a67b449c8ff5963a0.svg"
                    alt="Img"
                  />
                  <button
                    type="button"
                    class="profile-img-edit btn btn-primary"
                  >
                    <img
                      src="/static/media/edit.0543f4f52dca0cf68ddf82ec128fb432.svg"
                      alt="img"
                    />
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <TextInput
                    name="firstName"
                    type="text"
                    label="First Name"
                    readonly={true}
                    value={formik.values.firstName}
                    handleChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </div>
                <div className="col-md-6">
                  <TextInput
                    name="lastName"
                    type="text"
                    label="Last Name"
                    readonly={true}
                    value={formik.values.lastName}
                    handleChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </div>
                <div className="col-md-6">
                  <TextInput
                    name="email"
                    type="email"
                    label="Email"
                    readonly={true}
                    value={formik.values.email}
                    handleChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
                <div className="col-md-6">
                  <TextInput
                    name="phone"
                    type="number"
                    label="Phone"
                    readonly={true}
                    value={formik.values.phone}
                    handleChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </div>

                <div className="col-md-12">
                  <div class="input-field">
                    <label for="exampleFormControlInput1" class="form-label">
                      Description
                    </label>
                    <textarea
                      name="description"
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      placeholder=""
                      rows={3}
                    />
                    {formik.touched.description &&
                      Boolean(formik.errors.description) && (
                        <div
                          style={{
                            color: "red",
                            textAlign: "left",
                            marginLeft: "9px",
                            fontSize: "13px",
                            marginBottom: "-4px",
                            marginTop: "3px",
                          }}
                        >
                          {formik.touched.description && (
                            <span>{formik.errors.description}</span>
                          )}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-field">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Select Job Category
                    </label>
                    <select
                      name="jobCategory"
                      value={formik.values.jobCategory}
                      onChange={formik.handleChange}
                      className="form-control"
                      id=""
                    >
                      {jobCategoryList?.map((cat) => {
                        return (
                          <option key={cat?._id} value={cat?._id}>
                            {cat?.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {formik.touched.jobCategory &&
                    Boolean(formik.errors.jobCategory) && (
                      <div
                        style={{
                          color: "red",
                          textAlign: "left",
                          marginLeft: "9px",
                          fontSize: "13px",
                          // marginTop: "0px",
                        }}
                      >
                        <span>
                          {formik.touched.jobCategory &&
                            formik.errors.jobCategory}
                        </span>
                      </div>
                    )}
                </div>
                <div className="col-md-6">
                  <div className="input-field">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Select Sub Category
                    </label>
                    <select
                      name="subCategory"
                      value={formik.values.subCategory}
                      onChange={formik.handleChange}
                      className="form-control"
                      id=""
                    >
                      {subCategoryList?.map((cat) => {
                        return (
                          <option key={cat?._id} value={cat?._id}>
                            {cat?.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {formik.touched.subCategory &&
                    Boolean(formik.errors.subCategory) && (
                      <div
                        style={{
                          color: "red",
                          textAlign: "left",
                          marginLeft: "9px",
                          fontSize: "13px",
                          // marginTop: "0px",
                        }}
                      >
                        <span>
                          {formik.touched.subCategory &&
                            formik.errors.subCategory}
                        </span>
                      </div>
                    )}
                </div>
                <div className="col-md-12">
                  <h6> Select Skills</h6>
                  <div className="categ-technology">
                    {skillsData?.map((skil) => {
                      return (
                        <div
                          class={`techno ${
                            storeSkills?.includes(skil?._id) ? "active" : ""
                          }`}
                          onClick={() =>
                            toggleSkillInArray(storeSkills, skil._id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {skil?.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="input-field price">
                    <TextInput
                      label="Price"
                      name="price"
                      type="number"
                      value={formik.values.price}
                      handleChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                    <div class="price-icon">$</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <TextInput
                    name="experience"
                    type="number"
                    label="Experience"
                    value={formik.values.experience}
                    handleChange={formik.handleChange}
                    error={
                      formik.touched.experience &&
                      Boolean(formik.errors.experience)
                    }
                    helperText={
                      formik.touched.experience && formik.errors.experience
                    }
                  />
                </div>
                <div className="col-md-6">
                  <div class="input-field language-field">
                    <h6>Language</h6>
                    <div class="language-checkbox">
                      {["US English", "German", "Italian", "French"].map(
                        (lang, index) => {
                          return (
                            <div key={index}>
                              <input
                                type="checkbox"
                                id=""
                                name="languages"
                                checked={formik?.values?.languages?.includes(
                                  lang
                                )}
                                onChange={(e) => handleCheckboxChange(e, lang)}
                              />
                              <label for="">{lang}</label>
                            </div>
                          );
                        }
                      )}
                      {formik.touched.languages &&
                        Boolean(formik.errors.languages) && (
                          <div
                            style={{
                              color: "red",
                              textAlign: "left",
                              marginLeft: "9px",
                              fontSize: "13px",
                              marginBottom: "-4px",
                              marginTop: "3px",
                            }}
                          >
                            {formik.touched.languages && (
                              <span>{formik.errors.languages}</span>
                            )}
                          </div>
                        )}
                      {/* <div>
                        <input type="checkbox" id="" name="" value="" />
                        <label for=""> US English</label>
                      </div>
                      <div>
                        <input type="checkbox" id="" name="" value="" />
                        <label for=""> German</label>
                      </div>
                      <div>
                        <input type="checkbox" id="" name="" value="" />
                        <label for=""> Italian</label>
                      </div>
                      <div>
                        <input type="checkbox" id="" name="" value="" />
                        <label for=""> French</label>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="form-btn setuprofile-btn">
                  CONTINUE
                </button>
              </div>
            </form>
          </div>
          {/* <img className="img-pot" src={Pot} alt="" />
          <img className="img-msg" src={Msg} alt="" /> */}
        </div>
        {/* <div className="right_img">
          <img src={RightBg} alt="bg" />
        </div> */}
      </section>
    </>
  );
};

export default EditExpertProfile;
