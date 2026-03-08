import React from "react";
import "./Districts.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Districts() {
  const districts = [
    { name: "Thiruvananthapuram", img: "/images/trivandrum/cover.jpg" },
    { name: "Kollam", img: "/images/kollam/cover.jpg" },
    { name: "Pathanamthitta", img: "/public/images/pathanamthitta/cover.jpg" },
    { name: "Alappuzha", img: "/images/alappuzha/cover.jpg" },
    { name: "Kottayam", img: "/images/kottayam/cover.jpg" },
    { name: "Idukki", img: "/images/idukki/cover.jpg" },
    { name: "Ernakulam", img: "/images/eranakulam/cover.jpg" },
    { name: "Thrissur", img: "/images/thrissur/cover.jpg" },
    { name: "Palakkad", img: "/images/palakkad/cover.jpg" },
    { name: "Malappuram", img: "/images/malappuram/cover.jpg" },
    { name: "Kozhikode", img: "/images/kozhikkode/cover.jpg" },
    { name: "Wayanad", img: "/images/wayanad/cover.jpg" },
    { name: "Kannur", img: "/images/kannur/cover.jpg" },
    { name: "Kasaragod", img: "/images/kasaragod/cover.jpg" },
  ];

  return (
    <>
      <Navbar />
      <div className="districts-page">
        <div className="districts-vignette"></div>
        
        <h1 className="district-main-heading">Districts of Kerala</h1>
        <p className="district-sub-heading">Choose a gateway to the unknown</p>

        <div className="district-grid">
          {districts.map((item) => (
            <Link 
              to={`/districts/${item.name.toLowerCase()}`} 
              key={item.name} 
              className="district-link"
            >
              <div className="district-card-mystic">
                <div className="dist-img-wrapper">
                  <img src={item.img} alt={item.name} />
                  <div className="dist-overlay"></div>
                </div>
                <h3>{item.name}</h3>
              </div>
            </Link>
            
          ))}
          
        </div>
      </div>
    </>
  );
}