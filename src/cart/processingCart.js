import "./cart.css";
const handleCartItem = () => {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(items);
  items.forEach((item, index) => {
    let quantity = item.quantity;
    const inputToalPrice = document.getElementById("totalPrice");
    const quantityInput = document.querySelectorAll("#cart-quantity")[index];
    const decreaseButton = document.querySelectorAll("#cart-decrease")[index];
    const increaseButton = document.querySelectorAll("#cart-increase")[index];
    const cartCount = document.getElementById("cart-count");
    // quantityInput.value = quantity;
    decreaseButton.addEventListener("click", () => {
      if (quantity >= 1) {
        quantity--;
        quantityInput.value = quantity;
        items[index].quantity = quantity;
        const totalPrice = items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        inputToalPrice.value = `$${totalPrice.toFixed(2)}`;
        const howManyItemsInCart = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.value = `${howManyItemsInCart}`;
        localStorage.setItem("cart", JSON.stringify(items));
      }
      if (quantity < 1) {
        items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(items));

        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartModal = document.querySelector(".cart-modal");
        const totalPrice = currentCart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        inputToalPrice.value = `$${totalPrice.toFixed(2)}`;
        const howManyItemsInCart = currentCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.value = `${howManyItemsInCart}`;
        if (currentCart.length === 0) {
          document.location.reload();
        }
        // Remove the cart item from the modal
        if (cartModal) {
          const cartItem = cartModal.querySelectorAll("li")[index];
          if (cartItem) {
            cartItem.remove();
          }
        }
      }
    });
    increaseButton.addEventListener("click", () => {
      if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
        items[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(items));
        const totalPrice = items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        inputToalPrice.value = `$${totalPrice.toFixed(2)}`;
        const howManyItemsInCart = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.value = `${howManyItemsInCart}`;
      }
    });
  });
};

const processingCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartButtonElement = document.getElementById("cart-button");

  console.log(cart);

  cartButtonElement.addEventListener("click", () => {
    if (cart.length > 0) {
      const processingCart = cart.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.name === item.name);
        if (existingItem) {
          existingItem.quantity += item.quantity;
          return acc;
        }

        if (!acc.some((i) => i.name === item.name)) {
          acc.push({ ...item });
        }

        return acc;
      }, []);

      localStorage.setItem("cart", JSON.stringify(processingCart));

      // Create cart modal content
      const processingCartItems = JSON.parse(localStorage.getItem("cart"));
      const cartItems = processingCartItems
        .map((item) => {
          return `<li>${item.name} - $${item.price} - 
                <div class="quantity-buttons">
                  <button class="" id="cart-decrease">&minus;</button>
                  <input type="number" id="cart-quantity" disabled name="quantity" min="1" max="10" value=${item.quantity}>
                  <button class="" id="cart-increase">&plus;</button>
                </div>
              </li>`;
        })
        .join("");
      // Calculate total price
      const totalPrice = processingCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const howManyItemsInCart = processingCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      // Create cart modal
      const cartContent = `
        <div class="cart-header">
          <span class="cart-title">Cart (<input disabled type='text' id='cart-count' value=${howManyItemsInCart} />)</span>
          <button class="close-cart">Remove all</button>
        </div>
        <ul>${cartItems}</ul>
        <p>Total: <input type='text' id='totalPrice' disabled value=$${totalPrice.toFixed(
          2
        )}></p>
        <button id="checkout-button" class="button-1">Checkout</button>
      `;
      const cartModal = document.createElement("div");
      cartModal.className = "cart-modal";
      cartModal.innerHTML = cartContent;

      const cartOverlay = document.createElement("div");
      cartOverlay.className = "cart-overlay";
      cartOverlay.appendChild(cartModal);

      const header = document.getElementsByTagName("header")[0];
      header.appendChild(cartOverlay);

      document.body.style.overflow = "hidden";
      handleCartItem();

      const checkoutButton = document.getElementById("checkout-button");
      checkoutButton.addEventListener("click", () => {
        alert("Proceeding to checkout...");

        // Here you can implement the checkout logic
      });
      const closeCartButton = document.querySelector(".close-cart");
      closeCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        document.location.reload();
      });
    } else {
      alert("Your cart is empty");
    }
  });
};
export default processingCart;
