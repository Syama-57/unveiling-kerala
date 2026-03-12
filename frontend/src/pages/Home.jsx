import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import Navbar from "../components/Navbar";

export default function Home() {
  useEffect(() => {
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

      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            {/* Added /images/ based on your screenshot structure */}
            <img src="/myth/padayani.jpg" className="d-block w-100 hero-img" alt="slide1" />
            <div className="carousel-caption">
              <h2>Unseen Rituals</h2>
              <p>Discover forgotten cultural paths.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/myth/temple4.jpg" className="d-block w-100 hero-img" alt="slide2" />
            <div className="carousel-caption">
              <h2>Ancient Echoes</h2>
              <p>Temples that whisper secrets of centuries.</p>
            </div>
          </div>

          <div className="carousel-item">
            {/* Matches the specific name in your screenshot */}
            <img src="/myth/Adivasi-Tribes-of-Wayanad.png" className="d-block w-100 hero-img" alt="slide3" />
            <div className="carousel-caption">
              <h2>Tribal Legends</h2>
              <p>Stories of identity, roots, and resilience.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="explore-section">
        <h2>Explore the Unknown</h2>
        <div className="explore-grid">
          <div className="explore-card">
            {/* Added /myth/ based on your screenshot folder */}
            <img src="/myth/explore1.jpg" alt="explore1" />
            <div className="explore-overlay">“Every forest hides a forgotten tale.”</div>
          </div>
          <div className="explore-card">
            <img src="/myth/explore2.jpg" alt="explore2" />
            <div className="explore-overlay">“The past never dies — it waits.”</div>
          </div>
          <div className="explore-card">
            <img src="/myth/explore3.jpg" alt="explore3" />
            <div className="explore-overlay">“Mysteries breathe in silence.”</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Unveiling Kerala — Revealing the Unknown</p>
      </footer>
    </div>
  );
}