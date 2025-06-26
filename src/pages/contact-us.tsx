import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Contact Us</h2>
        <p className="text-muted">
          We&apos;d love to hear from you. Reach out to us!
        </p>
      </div>

      {/* Contact Info and Form */}
      <div className="row">
        {/* Contact Info */}
        <div className="col-md-5 mb-4">
          <h4 className="mb-4">Get in Touch</h4>
          <div className="d-flex align-items-start mb-3">
            <FaMapMarkerAlt size={20} className="me-3 text-danger mt-1" />
            <div>
              <h6 className="mb-1">Address</h6>
              <p className="text-muted mb-0">
                1234 Market Street, Suite 100, San Francisco, CA
              </p>
            </div>
          </div>
          <div className="d-flex align-items-start mb-3">
            <FaPhone size={20} className="me-3 text-success mt-1" />
            <div>
              <h6 className="mb-1">Phone</h6>
              <p className="text-muted mb-0">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="d-flex align-items-start mb-3">
            <FaEnvelope size={20} className="me-3 text-primary mt-1" />
            <div>
              <h6 className="mb-1">Email</h6>
              <p className="text-muted mb-0">support@shopease.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <h4 className="mb-4">Send a Message</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows={5}
                placeholder="Type your message here..."
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
