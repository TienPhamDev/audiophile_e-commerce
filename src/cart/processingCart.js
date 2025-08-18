import URL from "../screens/URL";
import "./cart.css";

const processingCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartButtonElement = document.getElementById("cart-button");

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("cart-overlay")) {
      const cartOverlay = document.querySelector(".cart-overlay");
      if (cartOverlay) {
        cartOverlay.remove();
        document.body.style.overflow = "auto";
        document.location.reload();
      }
    }
  });
  cartButtonElement.addEventListener("click", () => {
    window.location.href = `${URL}/cart`;
  });
};

export default processingCart;
