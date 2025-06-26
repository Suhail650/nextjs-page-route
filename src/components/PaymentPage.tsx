"use client";

import styles from "../styles/payment.module.css";
import React, { useEffect, useState } from "react";
import {
  BsCreditCard2Front,
  BsLockFill,
  BsPersonCircle,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/cartSlice";

export default function PaymentPage() {
  const [showCVV, setShowCVV] = useState(false);
  const [price, setPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [timer, setTimer] = useState(15);
  const [purchaseStatus, setPurchaseStatus] = useState<
    "pending" | "success" | "failed" | "none"
  >("none");

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const priceParam = searchParams.get("totalpaymentamount") ?? "0";
    if (priceParam) {
      setPrice(parseFloat(priceParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const shipping = (15 / 100) * price;
    setShippingPrice(shipping);
    setTotalPrice(price + shipping);
  }, [price]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (showPinModal) {
      setTimer(15);
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setShowPinModal(false);
            setPurchaseStatus("failed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [showPinModal]);

  useEffect(() => {
    if (purchaseStatus === "success") {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [purchaseStatus, router]);

  const nameRegex = /^[A-Za-z\s'-]{2,50}$/;

  const validateName = (value: string) => {
    if (value.trim() === "") {
      setNameError("Name is required");
    } else if (!nameRegex.test(value)) {
      setNameError("Enter a valid name");
    } else {
      setNameError("");
    }
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length === 1) {
      if (parseInt(digits) > 1) return "0" + digits + "/";
      return digits;
    }
    if (digits.length >= 2) {
      const month = parseInt(digits.slice(0, 2));
      if (month < 1 || month > 12) return "";
    }
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleCVVChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length > 4) return;
    setCvv(digits);
    if (digits.length !== 3) {
      setCvvError("CVV must be exactly 3 digits");
    } else {
      setCvvError("");
    }
  };

  const isFormInvalid =
    !nameRegex.test(name.trim()) ||
    cvv.length !== 3 ||
    cardNumber.length < 19 ||
    expiry.length !== 5;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateName(name);
    if (isFormInvalid) {
      alert("Please fix the errors before submitting.");
      return;
    }
    setShowPinModal(true);
    setTimer(15);
  };

  const isPinValid = /^\d{4}$/.test(pin);

  const handlePinSubmit = () => {
    setShowPinModal(false);
    if (pin.length === 4 && isPinValid) {
      setPurchaseStatus("success");
      dispatch(clearCart());
    } else {
      setPurchaseStatus("failed");
      setPin("");
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Payment Form */}
        <div className="col-lg-8">
          <div className={`${styles.card} shadow-sm`}>
            <div className="card-body">
              <h4 className="mb-4">
                <BsCreditCard2Front className="me-2 text-primary" />
                Payment Details
              </h4>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name on Card</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsPersonCircle />
                    </span>
                    <input
                      type="text"
                      className={`${styles.inputField} form-control ${
                        nameError ? "is-invalid" : ""
                      }`}
                      placeholder="Card Holder Name"
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setName(value);
                        validateName(value);
                      }}
                      required
                    />
                    {nameError && (
                      <div className="invalid-feedback">{nameError}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsCreditCard2Front />
                    </span>
                    <input
                      type="text"
                      className={`${styles.inputField} form-control`}
                      placeholder="xxxx xxxx xxxx xxxx"
                      value={cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setCardNumber(formatted);
                      }}
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className={`${styles.inputField} form-control`}
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value);
                        setExpiry(formatted);
                      }}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <div className="input-group">
                      <input
                        type={showCVV ? "text" : "password"}
                        className={`${styles.inputField} form-control ${
                          cvvError ? "is-invalid" : ""
                        }`}
                        placeholder="_ _ _"
                        value={cvv}
                        onChange={(e) => handleCVVChange(e.target.value)}
                        maxLength={3}
                        required
                      />
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowCVV(!showCVV)}
                      >
                        {showCVV ? <BsEyeSlash /> : <BsEye />}
                      </span>
                      {cvvError && (
                        <div className="invalid-feedback">{cvvError}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <FaCcVisa size={32} className="text-primary" />
                    <FaCcMastercard size={32} className="text-danger" />
                    <FaPaypal size={32} className="text-info" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={isFormInvalid}
                >
                  <BsLockFill className="me-2" />
                  Pay Securely
                </button>
              </form>
              {showPinModal && (
                <div
                  className="modal fade show"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center">
                      <div className="modal-header">
                        <h5 className="modal-title w-100">Enter 4-digit PIN</h5>
                      </div>
                      <div className="modal-body">
                        <p
                          className={`text-${timer <= 5 ? "danger" : "muted"}`}
                        >
                          Time remaining: {timer}s
                        </p>
                        <input
                          type="password"
                          className={`${styles.inputField} form-control text-center mb-3`}
                          maxLength={4}
                          value={pin}
                          onChange={(e) =>
                            setPin(e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="_ _ _ _"
                        />
                        <button
                          className="btn btn-success"
                          onClick={handlePinSubmit}
                          disabled={!isPinValid}
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {purchaseStatus === "success" && (
                <div
                  className="modal show"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  tabIndex={-1}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center">
                      <div className="modal-header border-0">
                        <h5 className="modal-title w-100 text-success">
                          🎉 Payment Successful!
                        </h5>
                      </div>
                      <div className="modal-body">
                        <p className="fs-5">Thank you for your purchase!</p>
                        <p className="text-muted">
                          You will be redirected to the homepage shortly.
                        </p>
                      </div>
                      <div className="modal-footer border-0 justify-content-center">
                        <button
                          className="btn btn-primary px-4"
                          onClick={() => router.replace("/")}
                        >
                          Go to Homepage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {purchaseStatus === "failed" && (
                <div
                  className="modal fade show"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center">
                      <div className="modal-body">
                        <h4 className="text-danger">❌ Payment Failed!</h4>
                        <p className="text-muted">
                          PIN was incorrect or time expired.
                        </p>
                        <button
                          className="btn btn-secondary mt-3"
                          onClick={() => setPurchaseStatus("none")}
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className={`${styles.card} shadow-sm`}>
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{price.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>₹{shippingPrice.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </li>
              </ul>
              <div className="text-muted mt-3 small">
                By clicking &quot;Pay Securely&quot;, you agree to our terms and
                conditions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
