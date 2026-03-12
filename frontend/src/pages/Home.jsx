import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import Navbar from "../components/Navbar";

export default function Home() {
  useEffect(() => {
    // Initialize Bootstrap Carousel manually to ensure it works with React
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

      {/* --- HERO CAROUSEL --- */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          
          {/* Slide 1 */}
          <div className="carousel-item active">
            {/* Direct path to public/padayani.jpg */}
            <img src="/padayani.jpg" className="d-block w-100 hero-img" alt="Unseen Rituals" />
            <div className="carousel-caption">
              <h2>Unseen Rituals</h2>
              <p>Discover forgotten cultural paths.</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            {/* Direct path to public/temple4.jpg */}
            <img src="/temple4.jpg" className="d-block w-100 hero-img" alt="Ancient Echoes" />
            <div className="carousel-caption">
              <h2>Ancient Echoes</h2>
              <p>Temples that whisper secrets of centuries.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            {/* Direct path to public/Adivasi-Tribes-of-Wayanad.png */}
            <img src="/Adivasi-Tribes-of-Wayanad.png" className="d-block w-100 hero-img" alt="Tribal Legends" />
            <div className="carousel-caption">
              <h2>Tribal Legends</h2>
              <p>Stories of identity, roots, and resilience.</p>
            </div>
          </div>

        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* --- EXPLORE SECTION --- */}
      <section className="explore-section">
        <h2>Explore the Unknown</h2>
        <div className="explore-grid">
          
          <div className="explore-card">
            {/* Direct path to public/explore1.jpg */}
            <img src="/explore1.jpg" alt="Mystic Forest" />
            <div className="explore-overlay">“Every forest hides a forgotten tale.”</div>
          </div>

          <div className="explore-card">
            {/* Direct path to public/explore2.jpg */}
            <img src="/explore2.jpg" alt="Ancient Ruins" />
            <div className="explore-overlay">“The past never dies — it waits.”</div>
          </div>

          <div className="explore-card">
            {/* Direct path to public/explore3.jpg */}
            <img src="/explore3.jpg" alt="Silent Echoes" />
            <div className="explore-overlay">“Mysteries breathe in silence.”</div>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <p>© 2026 Unveiling Kerala — Revealing the Unknown</p>
      </footer>
    </div>
  );
}