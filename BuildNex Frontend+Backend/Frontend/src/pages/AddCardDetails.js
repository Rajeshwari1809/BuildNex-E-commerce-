import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const priceToPay = location.state.priceToPay;

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });
  const spanStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const handleCardInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const payAndOrder = () => {
    fetch("http://localhost:8080/api/user/order?userId=" + user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
      console.log(res);

        
      });
    });
  };

  const payForOrder = () => {
    payAndOrder();
    toast.success("Products Ordered Sucessfully!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/home");
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color custom-bg-text">
            <h5 class="card-title text-center">Payment Details</h5>
          </div>
          <div class="card-body text-color custom-bg">
            <form onSubmit={payForOrder}>
              <div class="mb-3">
                <label for="name" class="form-label">
                  <b> Cardholder Name</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="cardName"
                  onChange={handleCardInput}
                  value={card.cardName}
                  required
                  placeholder="Enter cardholder's name"
                  pattern="[A-Za-z ]+"
                  title="Please enter a valid cardholder's name (letters and spaces only)"
                />
              </div>
              <div class="mb-3">
                <label for="cardNumber" class="form-label">
                  <b> Card Number</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  onChange={handleCardInput}
                  value={card.cardNumber}
                  required
                  placeholder="Enter card number (16 digits)"
                  pattern="[0-9]{16}"
                  title="Please enter a valid 16-digit card number"
                />
              </div>

              <div class="mb-3">
                <label for="validThrough" class="form-label">
                  <b>Valid Through</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="validThrough"
                  name="validThrough"
                  onChange={handleCardInput}
                  value={card.validThrough}
                  required
                  placeholder="Enter valid through (MM/YY)"
                />
              </div>

              <div class="mb-3">
                <label for="cvv" class="form-label">
                  <b>CVV</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="cvv"
                  name="cvv"
                  onChange={handleCardInput}
                  value={card.cvv}
                  required
                  placeholder="Enter CVV (3 digits)"
                  pattern="[0-9]{3}"
                  title="Please enter a valid 3-digit CVV"
                />
              </div>

              <input
                type="submit"
                class="btn custom-bg-text bg-color"
                value={"Pay Rs : " + priceToPay}
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
