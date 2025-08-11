import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Section2.css'; // Import custom CSS

function Section2() {
  return (
    <div className="section2-container py-4">
      <div className="position-relative section2-banner">
        {/* Banner Image */}
        <img
          src="../assests/baner2.jpg"
          alt="Banner"
          className="img-fluid w-100 banner-img"
        />

        {/* Black Overlay */}
        <div className="overlay"></div>

        {/* Text on Banner */}
        <div className="banner-text text-white text-center px-3">
          <h2 className="banner-title mb-3">Why Choose BookHub?</h2>
          <p className="banner-description lead">
            BookHub is your trusted companion for all things books. From timeless classics to the latest bestsellers,
            we offer a curated collection delivered right to your doorstep. Enjoy effortless browsing, fast delivery,
            and a reading experience like never before — all from the comfort of your home.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Section2;
