import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-light text-dark pt-5">
      <div className="container">
        <div className="row">
          {/* About BookHub */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">About BookHub</h5>
            <p>
              <strong>BookHub</strong> is your go-to online bookstore, offering a wide range of novels, 
              academic resources, and literary gems. We deliver stories and knowledge straight to your 
              doorstep — because every great journey starts with a book.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-decoration-none text-dark">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-decoration-none text-dark">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-decoration-none text-dark">Books</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-decoration-none text-dark">Contact</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i> BookHub HQ, Literary Lane, Pune, India
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i> support@BookHub.in
              </li>
              <li>
                <i className="fas fa-phone me-2"></i> +91-98765-43210
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="text-center mb-3">
          <a href="#" className="text-dark me-3"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="#" className="text-dark me-3"><i className="fab fa-twitter fa-lg"></i></a>
          <a href="#" className="text-dark me-3"><i className="fab fa-instagram fa-lg"></i></a>
          <a href="#" className="text-dark me-3"><i className="fab fa-linkedin fa-lg"></i></a>
          <a href="#" className="text-dark"><i className="fab fa-github fa-lg"></i></a>
        </div>

        {/* Copyright */}
        <div className="text-center py-3 border-top">
          &copy; {new Date().getFullYear()} BookHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
