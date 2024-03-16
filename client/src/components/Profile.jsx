import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/newuser.css";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(
    userData.img ||
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [formDetails, setFormDetails] = useState({
    username: userData.username || "",
    email: userData.email || "",
    password: "",
    country: userData.country || "",
    city: userData.city || "",
    phone: userData.phone || "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, city, country, phone, email, password } = formDetails;
      if (!username || !city || !phone || !country || !email || !password) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }
      const { data } = await toast.promise(
        axios.put(
          `/user/updateuser/${userData._id}`,
          {
            username,
            country,
            city,
            phone,
            email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      setFormDetails({ ...data, password: "" });
      setFile(data.img);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, password: undefined })
      );
      return;
    } catch (error) {}
  };

  return (
    <div className="dashboard-container">
      {userData.isAdmin ? <AdminSidebar /> : <></>}
      <div className="new-user-container flex-center">
        <section className="register-section flex-center">
          <div className="register-container flex-center">
            <h2 className="form-heading">Profile</h2>
            {/* <img
              src={file}
              alt="profile"
              className="profile-pic"
            /> */}
            <form
              onSubmit={formSubmit}
              className="register-form"
            >
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="Enter your username"
                value={formDetails.username}
                onChange={inputChange}
              />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formDetails.email}
                onChange={inputChange}
              />
              <input
                type="text"
                name="city"
                className="form-input"
                placeholder="Enter your city name"
                value={formDetails.city}
                onChange={inputChange}
              />
              <input
                type="text"
                name="country"
                className="form-input"
                placeholder="Enter your country"
                value={formDetails.country}
                onChange={inputChange}
              />
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="Enter your phone number"
                value={formDetails.phone}
                onChange={inputChange}
              />
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formDetails.password}
                onChange={inputChange}
              />
              <button
                type="submit"
                className="btn form-btn"
              >
                update
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
