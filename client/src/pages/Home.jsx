import React from "react";
import Contact from "../components/Contact";
import Featured from "../components/Featured";
import Header from "../components/Header";
import PropertyType from "../components/PropertyType";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <PropertyType />
      <Featured />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
