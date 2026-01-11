import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import Navbar from "../components/Navbar";

import img1 from "../assets/padayani.jpg";
import img2 from "../assets/temple4.jpg";
import img3 from "../assets/Adivasi-Tribes-of-Wayanad.png";

import explore1 from "../assets/explore1.jpg";
import explore2 from "../assets/explore2.jpg";
import explore3 from "../assets/explore3.jpg";

export default function Home() {
  useEffect(() => {
    // 🔥 Carousel auto-run
    const carouselElement = document.getElementById("heroCarousel");
    if (carouselElement && window.bootstrap) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);

  return (
    <div className="home-container">
      <Navbar />

      {/* CAROUSEL */}
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100 hero-img" alt="slide1" />
            <div className="carousel-caption">
              <h2>Unseen Rituals</h2>
              <p>Discover forgotten cultural paths.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={img2} className="d-block w-100 hero-img" alt="slide2" />
            <div className="carousel-caption">
              <h2>Ancient Echoes</h2>
              <p>Temples that whisper secrets of centuries.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={img3} className="d-block w-100 hero-img" alt="slide3" />
            <div className="carousel-caption">
              <h2>Tribal Legends</h2>
              <p>Stories of identity, roots, and resilience.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

     

      {/* EXPLORE SECTION */}
      <section className="explore-section">
        <h2>Explore the Unknown</h2>

        <div className="explore-grid">
          <div className="explore-card">
            <img src={explore1} alt="explore1" />
            <div className="explore-overlay">
              “Every forest hides a forgotten tale.”
            </div>
          </div>

          <div className="explore-card">
            <img src={explore2} alt="explore2" />
            <div className="explore-overlay">
              “The past never dies — it waits.”
            </div>
          </div>

          <div className="explore-card">
            <img src={explore3} alt="explore3" />
            <div className="explore-overlay">
              “Mysteries breathe in silence.”
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Unveiling Kerala — Revealing the Unknown</p>
      </footer>
    </div>
  );
}

