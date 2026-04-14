import React from "react";
import HeroPage from "../SECTIONS/HeroPage";
import Navbar from "../components/Navbar";
import About from "../SECTIONS/About";
import Team from "../SECTIONS/Team";
import Footer from "../SECTIONS/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroPage />
      <About />
      <Team/>
      <Footer/>

      
    </div>
  );
};

export default Home;
