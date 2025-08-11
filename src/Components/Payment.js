import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice, products } = location.state || {
    totalPrice: 0,
    products: [],
  };

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) {
      return false;
    }
    const expirationDate = new Date(year, month - 1);
    const today = new Date();
    return expirationDate >= new Date(today.getFullYear(), today.getMonth());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cardNumber || !cardHolderName || !expiration || !cvv) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }

    if (!validateExpirationDate(expiration)) {
      setError("Expiration date is invalid or in the past.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError("User is not logged in.");
      setIsSubmitting(false);
      return;
    }

    const orderPayload = {
      id: userId,
      items: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const orderResponse = await axios.post(
        `http://localhost:5050/customer/createOrder`,
        orderPayload,
        config
      );

      const orderId = orderResponse.data.orderId;

      if (!orderId) throw new Error("Order ID not received");

      const paymentPayload = {
        orderId,
        amount: totalPrice,
      };

      const paymentResponse = await axios.post(
        `http://localhost:5050/customer/processPayment`,
        paymentPayload,
        config
      );

      if (paymentResponse.data.status === "PAID") {
        toast.success("Payment successful!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => navigate(`/viewcart/${userId}`), 1500);
      } else {
        throw new Error("Payment status is not PAID");
      }
    } catch (error) {
      setError("Failed to complete the transaction. Please try again.");
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <MDBContainer fluid className="py-5 gradient-custom" style={{ backgroundColor: "#f5f7fa" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6" lg="5">
          <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
            <MDBCardBody>
              {/* Top Logo */}
              <div className="text-center mb-4">
                <img
                  src="../assests/paymentGateway.jpeg"
                  alt="Payment Gateway"
                  style={{ width: "30%", height: "20%" }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                <MDBRow className="gy-3">
                  <MDBCol size="12">
                    <MDBInput
                      label="Card Number"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="12">
                    <MDBInput
                      label="Cardholder's Name"
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="6">
                    <MDBInput
                      label="Expiration (MM/YYYY)"
                      type="text"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="08/2026"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="6">
                    <MDBInput
                      label="CVV"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      required
                    />
                  </MDBCol>

                  {error && (
                    <MDBCol size="12" className="text-danger text-center">
                      {error}
                    </MDBCol>
                  )}

                  <MDBCol size="12" className="text-center mt-3">
                    <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
                  </MDBCol>

                  <MDBCol size="12" className="text-center">
                    <MDBBtn
                      color="info"
                      rounded
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      style={{ minWidth: "120px" }} // fixed width to prevent size change
                    >
                      {isSubmitting ? (
                        <span style={{ visibility: "visible" }}>Processing...</span>
                      ) : (
                        <span style={{ visibility: "visible" }}>
                          <MDBIcon fas icon="arrow-right" />
                        </span>
                      )}
                    </MDBBtn>

                  </MDBCol>
                </MDBRow>
              </form>

              {/* Bottom Icons */}
              <div className="text-center mt-4">
                <img
                  src="../assests/payment1.png"
                  alt="Payment Options"
                  style={{ width: "50%"}}
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}
