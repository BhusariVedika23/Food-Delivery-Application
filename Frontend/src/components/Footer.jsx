import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5 className="fw-bold">ABOUT GreenBites</h5>
            <ul className="list-unstyled">
              <li>Who We Are</li>
              <li>Blog</li>
              <li>Work With Us</li>
              <li>Investor Relations</li>
              <li>Report Fraud</li>
              <li>Press Kit</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">GreenBites</h5>
            <ul className="list-unstyled">
              <li>GreenBites</li>
              <li>Blinkit</li>
              <li>Feeding India</li>
              <li>Hyperpure</li>
              <li>GreenBites Live</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">FOR RESTAURANTS</h5>
            <ul className="list-unstyled">
              <li>Partner With Us</li>
              <li>Apps For You</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">LEARN MORE</h5>
            <ul className="list-unstyled">
              <li>Privacy</li>
              <li>Security</li>
              <li>Terms</li>
            </ul>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col md={12} className="text-center">
            <ul className="list-inline">
              <li className="list-inline-item">
                <i className="bi bi-linkedin"></i>
              </li>
              <li className="list-inline-item">
                <i className="bi bi-instagram"></i>
              </li>
              <li className="list-inline-item">
                <i className="bi bi-youtube"></i>
              </li>
              <li className="list-inline-item">
                <i className="bi bi-twitter"></i>
              </li>
              <li className="list-inline-item">
                <i className="bi bi-facebook"></i>
              </li>
            </ul>
          </Col>
        </Row>
        
      </Container>
    </footer>
  );
};

export default Footer;
