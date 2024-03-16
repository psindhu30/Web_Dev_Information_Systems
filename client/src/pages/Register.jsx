import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import convertToBase64 from "../utils/convertImage";

// axios.defaults.baseURL = "http://localhost:5000/api"
//  "http://localhost:5000/api"
function Register({ title, signup, btntext }) {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
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
      const img =
        file ==
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

        // const submitButton = document.querySelector(".form-btn");
        // if (submitButton) {
        //   submitButton.setAttribute("disabled", "true");
        // }
        setIsSubmitting(true);
      console.log(file);
      const { data } = await toast.promise(
        axios.post("http://localhost:5000/api/auth/register", {
          username,
          country,
          city,
          phone,
          email,
          password,
          img,
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      if (signup) {
        return navigate("/login");
      }

      console.log(data);
      return;
    } catch (error) {
      console.log(error);
    }finally {
      setIsSubmitting(false); // Re-enable the button
    }
    // finally {
    //   const submitButton = document.querySelector(".form-btn");
    //   if (submitButton) {
    //     submitButton.removeAttribute("disabled");
    //   }
    // }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">{title}</h2>
        <form onSubmit={formSubmit} className="register-form">
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
            type="number"
            name="phone"
            className="form-input"
            placeholder="Enter your phone number"
            value={formDetails.phone}
            onChange={inputChange}
          />
          <div className="form-same-row">
          <input
            type="file"
            onChange={onUpload}
            name="profile-pic"
            id="profile-pic"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
            </div>
          
           <button type="submit" className="btn form-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : btntext}
          </button>
        </form>
        {signup && (
          <p>
            Already a user?{" "}
            <NavLink className="login-link" to={"/login"}>
              Log in
            </NavLink>
          </p>
        )}
      </div>
    </section>
  );
}

export default Register;
