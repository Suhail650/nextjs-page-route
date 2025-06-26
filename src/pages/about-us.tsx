import Image from "next/image";
import React from "react";
import { FaRocket, FaUsers, FaGlobe, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">About Us</h2>
        <p className="text-muted">
          Get to know our story, mission, and values.
        </p>
      </div>

      {/* Main Content */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <Image
            src="/about.jpeg"
            width={100}
            height={100}
            style={{ height: "50vh", width: "50vw" }}
            alt="Our Team"
            className="img-fluid rounded shadow object-fit-contain"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold">Who We Are</h3>
          <p>
            ShopEase is a modern e-commerce platform committed to delivering
            high-quality products at unbeatable prices. Our team works
            passionately to provide the best online shopping experience.
          </p>
          <p>
            Since our launch, we’ve grown into a trusted platform for thousands
            of customers, thanks to our customer-first approach and innovative
            practices.
          </p>
        </div>
      </div>

      {/* Icons Section */}
      <div className="row text-center">
        <div className="col-md-3 mb-4">
          <FaRocket size={40} className="text-primary mb-2" />
          <h5>Innovation</h5>
          <p className="text-muted">
            We leverage technology to lead the market.
          </p>
        </div>
        <div className="col-md-3 mb-4">
          <FaUsers size={40} className="text-success mb-2" />
          <h5>Community</h5>
          <p className="text-muted">
            Building strong relationships with our customers.
          </p>
        </div>
        <div className="col-md-3 mb-4">
          <FaGlobe size={40} className="text-info mb-2" />
          <h5>Global Reach</h5>
          <p className="text-muted">Serving customers all around the world.</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaHandshake size={40} className="text-warning mb-2" />
          <h5>Trust</h5>
          <p className="text-muted">
            Honesty and transparency are our foundation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
