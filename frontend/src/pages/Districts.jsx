import React from "react";
import "./Districts.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Districts() {
  const districts = [
    { name: "Thiruvananthapuram", img: "/public/images/trivandrum/cover.jpg" },
    { name: "Kollam", img: "/public/images/kollam/cover.jpg" },
    { name: "Pathanamthitta", img: "/public/images/pathanamthitta/cover.jpg" },
    { name: "Alappuzha", img: "/public/images/alappuzha/cover.jpg" },
    { name: "Kottayam", img: "/public/images/kottayam/cover.jpg" },
    { name: "Idukki", img: "/public/images/idukki/cover.jpg" },
    { name: "Ernakulam", img: "/public/images/eranakulam/cover.jpg" },
    { name: "Thrissur", img: "/public/images/thrissur/cover.jpg" },
    { name: "Palakkad", img: "/public/images/palakkad/cover.jpg" },
    { name: "Malappuram", img: "/public/images/malappuram/cover.jpg" },
    { name: "Kozhikode", img: "/public/images/kozhikkode/cover.jpg" },
    { name: "Wayanad", img: "/public/images/wayanad/cover.jpg" },
    { name: "Kannur", img: "/public/images/kannur/cover.jpg" },
    { name: "Kasaragod", img: "/public/images/kasaragod/cover.jpg" },
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