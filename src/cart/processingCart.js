import "./cart.css";
const handleCartItem = () => {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(items);
  items.forEach((item, index) => {
    let quantity = item.quantity;
    const inputToalPrice = document.querySelector(".total-prices");
    const quantityInput = document.querySelectorAll(".cart-quantity")[index];
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
        inputToalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        const howManyItemsInCart = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.textContent = `${howManyItemsInCart}`;
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
        inputToalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        const howManyItemsInCart = currentCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.textContent = `${howManyItemsInCart}`;
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
        inputToalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        const howManyItemsInCart = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cartCount.textContent = `${howManyItemsInCart}`;
      }
    });
  });
};

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
          const imageSrc = `.${item.image.desktop}`;

          return `<li>
              <div class="cart-item-image-div">
                <img src="${imageSrc}" alt="${item.name}" class="cart-item-image">
              </div>
                <div class="cart-item-text-div"><span>${item.name}</span> <span>$ ${item.price}</span></div>
                <div class="quantity-buttons">
                  <button class="" id="cart-decrease">&minus;</button>
                  <input type="number" class="cart-quantity" disabled name="quantity" min="1" max="10" value=${item.quantity}>
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
          <span class="cart-title">Cart (<span id='cart-count' class="cart-count color-main">${howManyItemsInCart}</span>)</span>
          <button class="close-cart">Remove all</button>
        </div>
        <ul>${cartItems}</ul>
        <div class="total-div"><span>TOTAL</span><span class="total-prices">$ ${totalPrice.toFixed(
          2
        )}</span></div>
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

      const heroSectionText = document.querySelector(".hero-text");
      const isHomePage = document.location.pathname === "/";
      if (isHomePage) {
        heroSectionText.style.zIndex = "0";
      }

      document.body.style.overflowY = "hidden";

      handleCartItem();

      const checkoutButton = document.getElementById("checkout-button");
      checkoutButton.addEventListener("click", () => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (currentCart.length > 0) {
          localStorage.setItem("checkout", JSON.stringify(currentCart));
          document.location.href = "/checkout";
          window.location.href = "/checkout";
          window.location.replace(window.location.href);
        }
      });
      const closeCartButton = document.querySelector(".close-cart");
      closeCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        window.location.replace(window.location.href);
      });
    }
  });
};
export default processingCart;
