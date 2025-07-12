import imgThumbnailHeadphone from "../assets/shared/desktop/image-category-thumbnail-headphones.png";
import imgThumbnailSpeaker from "../assets/shared/desktop/image-category-thumbnail-speakers.png";
import imgThumbnailEarphone from "../assets/shared/desktop/image-category-thumbnail-earphones.png";
import imgAbout from "../assets/shared/desktop/image-best-gear.jpg";
import data from "../data.json";
import processingCart from "../cart/processingCart.js";
import handleDetectScreenChange from "../utilities/HandleDetectScreenChange";
import HandleMenuButton from "../utilities/HandleMenuButton";
import "../style.css";
const ProductDetails = (slug) => {
  // Check if the cart exists in localStorage, if not, initialize it
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const howManyItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const product = data.find((item) => item.slug === slug);
  if (product === undefined) {
    return `<h1>Product not found</h1>`;
  }
  const productImg = `.${product.image.desktop}`;
  const productGalleryFirst = `.${product.gallery.first.desktop}`;
  const productGallerySecond = `.${product.gallery.second.desktop}`;
  const productGalleryThird = `.${product.gallery.third.desktop}`;


    const screenWidth = window.innerWidth;
  const isTablet = screenWidth <= 768;
  const isDesktop = screenWidth > 768;
  const content = `
    <div class="container">
      <header class="header-product-details">
        <div class='overlay-menu ${isDesktop ? "hidden" : ""}'></div>

        <nav>
        <button id='menu-button' class="menu-button ${
          isDesktop ? "hidden" : ""
        }">
          <svg id='menu-open' width="24" height="25" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v3H0V0zm0 9h24v3H0V9zm0 9h24v3H0v-3z" fill="#FFF" fill-rule="nonzero"/></svg>
          <svg id='menu-close' class="hidden" width="24" height="25" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.586L21.414 1 24 3.586 14.586 13 24 22.414l-2.586 2.586L12 15.414l-9.414 9.586L0 22.414 9.414 13 .586 3.586 3.172 1z" fill="#FFF" fill-rule="nonzero"/></svg>
        </button>
        <a href='/'><svg width="143" height="25" xmlns="http://www.w3.org/2000/svg"><path d="M7.363 20.385c1.63 0 3.087-.537 4.237-1.47l.414.994h3.739V5.853h-3.605l-.495 1.087c-1.16-.958-2.637-1.51-4.29-1.51C3.069 5.43 0 8.527 0 12.88c0 4.37 3.07 7.505 7.363 7.505zm.646-4.287c-1.811 0-3.143-1.37-3.143-3.206 0-1.824 1.32-3.195 3.143-3.195 1.812 0 3.144 1.37 3.144 3.195 0 1.836-1.332 3.206-3.144 3.206zm17.535 4.287c4.148 0 6.91-2.562 6.91-6.495V5.868h-4.836v7.811c0 1.47-.782 2.357-2.074 2.357-1.292 0-2.09-.873-2.09-2.357V5.868h-4.836v8.022c0 3.933 2.778 6.495 6.926 6.495zm16.328.015c1.636 0 3.093-.557 4.235-1.52l.456 1.044h3.58V.792H45.36v5.591a6.551 6.551 0 00-3.489-.976c-4.309 0-7.378 3.12-7.378 7.489 0 4.368 3.07 7.504 7.378 7.504zm.647-4.287c-1.812 0-3.143-1.381-3.143-3.217 0-1.835 1.331-3.216 3.143-3.216 1.812 0 3.143 1.38 3.143 3.216 0 1.836-1.331 3.217-3.143 3.217zM57.976 4.109V0h-4.763v4.109h4.763zm.037 15.815V5.868h-4.837v14.056h4.837zm10.097.46c4.563 0 7.872-3.146 7.872-7.488 0-4.357-3.31-7.489-7.872-7.489-4.579 0-7.873 3.132-7.873 7.489 0 4.342 3.294 7.489 7.873 7.489zm0-4.348c-1.764 0-3.029-1.281-3.029-3.14 0-1.858 1.265-3.139 3.029-3.139 1.763 0 3.028 1.292 3.028 3.14 0 1.858-1.265 3.139-3.028 3.139zM82.998 25v-5.534a6.56 6.56 0 003.423.934c4.293 0 7.362-3.125 7.362-7.504 0-4.38-3.069-7.489-7.362-7.489-1.669 0-3.155.578-4.31 1.578l-.605-1.117h-3.29V25h4.782zm2.776-8.887c-1.812 0-3.143-1.37-3.143-3.217s1.331-3.217 3.143-3.217c1.811 0 3.143 1.37 3.143 3.217 0 1.846-1.343 3.217-3.143 3.217zm15.065 3.811v-7.506c0-1.804.912-2.843 2.376-2.843 1.262 0 1.83.826 1.83 2.447v7.902h4.837V11.46c0-3.644-2.071-6.008-5.295-6.008-1.4 0-2.714.507-3.748 1.34v-6h-4.837v19.132h4.837zM117.574 4.11V0h-4.763v4.109h4.763zm.037 15.815V5.868h-4.837v14.056h4.837zm7.878 0V.792h-4.836v19.132h4.836zm9.851.461c3.523 0 6.364-2.004 7.352-5.212h-4.813c-.465.823-1.409 1.318-2.539 1.318-1.527 0-2.55-.834-2.866-2.446H142.9c.063-.435.1-.858.1-1.282 0-4.123-3.134-7.356-7.66-7.356-4.407 0-7.626 3.17-7.626 7.478 0 4.295 3.245 7.5 7.626 7.5zm2.896-9.021h-5.677c.391-1.396 1.372-2.163 2.781-2.163 1.46 0 2.471.758 2.896 2.163z" fill="#FFF" fill-rule="nonzero"/></svg></a>
        <ul id='menu-desktop' class="menu ${isTablet ? "hidden" : ""}">
          <li><a href="/">Home</a></li>
          <li><a href="/headphones">Headphones</a></li>
          <li><a href="/speakers">Speakers</a></li>
          <li><a href="/earphones">Earphones</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        
        <ul id="menu-tablet" class='menu ${isDesktop ? "hidden" : ""}'>
          <li class="category-item">
            <img src=${imgThumbnailHeadphone} alt="Headphones">
            <h3>HEADPHONES</h3>
            <a href="/headphones" class="btn-secondary"><span>SHOP</span> <span class="color-main"><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></span></a>
          </li>
          <li class="category-item">
            <img src=${imgThumbnailSpeaker} alt="Speakers">
            <h3>SPEAKERS</h3>
            <a href="/speakers" class="btn-secondary"><span>SHOP</span> <span class="color-main"><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></span></a>
          </li>
          <li class="category-item">
            <img src=${imgThumbnailEarphone} alt="Speaker">
            <h3>EARPHONES</h3>
            <a href="/earphones" class="btn-secondary"><span>SHOP</span> <span class="color-main"><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></span></a>
          </li>
        </ul>
          <button id='cart-button' class="cart-button">
            <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#FFF" fill-rule="nonzero"/></svg>
            <span class="cart-count color-main">(${howManyItemsInCart})</span>
          </button>

        </nav>
      </header>
      <main>
        <section class="product-details">
          <div class="product-details-image">
            <img src="${productImg}" alt="${product.name}" />
          </div>
          <div class="product-details-info">
            <h1>${product.name}</h1>
            <p>${product.description}</p>

            <p class="product-details-price">$ ${product.price}</p>
            <div class="product-details-quantity">
              <div class="quantity-buttons">
                <button class="" id="decrease">&minus;</button>
                <input type="number" id="quantity" disabled name="quantity" min="1" max="10" value="1">
                <button class="" id="increase">&plus;</button>
              </div>
              <button class="button-1" id="addToCart">ADD TO CART</button>
            </div>
          </div>
          <div class="product-details-features">
            <h2>FEATURES</h2>
            <p>${product.features}</p>
          </div>
          <div class="product-details-included">
            <h2>IN THE BOX</h2>
            <ul>
              ${product.includes
                .map(
                  (item) =>
                    `<li><span class="color-main">${item.quantity}x</span> ${item.item}</li>`
                )
                .join("")}
            </ul> 
          </div>
          <div class="product-details-gallery">
            
              <img src="${productGalleryFirst}" alt="Gallery Image 1">
              <img src="${productGallerySecond}" alt="Gallery Image 2">
            
              <img src="${productGalleryThird}" alt="Gallery Image 3">
          </div>
          <div class="product-details-others">
            <h2>YOU MAY ALSO LIKE</h2>
            <div class="product-details-others-items">
            ${product.others
              .map((item) => {
                const otherImg = `.${item.image.desktop}`;
                return `<div class="product-details-others-item">
                        <img src="${otherImg}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <a href="/${product.category}/${item.slug}" class="button-1">SEE PRODUCT</a>
                      </div>`;
              })
              .join("")}
              </div>
            
          </div>
        </section>
        <section class='categories'>
          <div class="category-item">
            <img src=${imgThumbnailHeadphone} alt="Headphones">
            <h3>HEADPHONES</h3>
            <a href="/headphones" class="btn-secondary"><span>SHOP</span> <span class="color-main"><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></span></a>
          </div>
          <div class="category-item">
            <img src=${imgThumbnailSpeaker} alt="Speakers">
            <h3>SPEAKERS</h3>
            <a href="/speakers" class="btn-secondary"><span>SHOP</span> <span class="color-main"><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></span></a>
          </div>
          <div class="category-item">
            <img src=${imgThumbnailEarphone} alt="Speaker">
            <h3>EARPHONES</h3>
            <a href="/earphones" class="btn-secondary"><span>SHOP</span> <span class="color-main"><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></span></a>
          </div>
        </section>

        <section class="about">
          <div class="about-text">
            <h2>Bringing you the <span class="color-main">best</span> audio gear</h2>
            <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
          </div>
          <img src=${imgAbout} alt="About Audiophile">
        </section>
      </main>
      <footer>
        <a href=""><svg width="143" height="25" xmlns="http://www.w3.org/2000/svg"><path d="M7.363 20.385c1.63 0 3.087-.537 4.237-1.47l.414.994h3.739V5.853h-3.605l-.495 1.087c-1.16-.958-2.637-1.51-4.29-1.51C3.069 5.43 0 8.527 0 12.88c0 4.37 3.07 7.505 7.363 7.505zm.646-4.287c-1.811 0-3.143-1.37-3.143-3.206 0-1.824 1.32-3.195 3.143-3.195 1.812 0 3.144 1.37 3.144 3.195 0 1.836-1.332 3.206-3.144 3.206zm17.535 4.287c4.148 0 6.91-2.562 6.91-6.495V5.868h-4.836v7.811c0 1.47-.782 2.357-2.074 2.357-1.292 0-2.09-.873-2.09-2.357V5.868h-4.836v8.022c0 3.933 2.778 6.495 6.926 6.495zm16.328.015c1.636 0 3.093-.557 4.235-1.52l.456 1.044h3.58V.792H45.36v5.591a6.551 6.551 0 00-3.489-.976c-4.309 0-7.378 3.12-7.378 7.489 0 4.368 3.07 7.504 7.378 7.504zm.647-4.287c-1.812 0-3.143-1.381-3.143-3.217 0-1.835 1.331-3.216 3.143-3.216 1.812 0 3.143 1.38 3.143 3.216 0 1.836-1.331 3.217-3.143 3.217zM57.976 4.109V0h-4.763v4.109h4.763zm.037 15.815V5.868h-4.837v14.056h4.837zm10.097.46c4.563 0 7.872-3.146 7.872-7.488 0-4.357-3.31-7.489-7.872-7.489-4.579 0-7.873 3.132-7.873 7.489 0 4.342 3.294 7.489 7.873 7.489zm0-4.348c-1.764 0-3.029-1.281-3.029-3.14 0-1.858 1.265-3.139 3.029-3.139 1.763 0 3.028 1.292 3.028 3.14 0 1.858-1.265 3.139-3.028 3.139zM82.998 25v-5.534a6.56 6.56 0 003.423.934c4.293 0 7.362-3.125 7.362-7.504 0-4.38-3.069-7.489-7.362-7.489-1.669 0-3.155.578-4.31 1.578l-.605-1.117h-3.29V25h4.782zm2.776-8.887c-1.812 0-3.143-1.37-3.143-3.217s1.331-3.217 3.143-3.217c1.811 0 3.143 1.37 3.143 3.217 0 1.846-1.343 3.217-3.143 3.217zm15.065 3.811v-7.506c0-1.804.912-2.843 2.376-2.843 1.262 0 1.83.826 1.83 2.447v7.902h4.837V11.46c0-3.644-2.071-6.008-5.295-6.008-1.4 0-2.714.507-3.748 1.34v-6h-4.837v19.132h4.837zM117.574 4.11V0h-4.763v4.109h4.763zm.037 15.815V5.868h-4.837v14.056h4.837zm7.878 0V.792h-4.836v19.132h4.836zm9.851.461c3.523 0 6.364-2.004 7.352-5.212h-4.813c-.465.823-1.409 1.318-2.539 1.318-1.527 0-2.55-.834-2.866-2.446H142.9c.063-.435.1-.858.1-1.282 0-4.123-3.134-7.356-7.66-7.356-4.407 0-7.626 3.17-7.626 7.478 0 4.295 3.245 7.5 7.626 7.5zm2.896-9.021h-5.677c.391-1.396 1.372-2.163 2.781-2.163 1.46 0 2.471.758 2.896 2.163z" fill="#FFF" fill-rule="nonzero"/></svg></a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/headphones">Headphones</a></li>
            <li><a href="/speakers">Speakers</a></li>
            <li><a href="/earphones">Earphones</a></li>
          </ul>
        </nav>
        <p>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
        <div class="socials">
          <a><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="#FFF" fill-rule="nonzero"/></svg></a>
          <a><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#FFF" fill-rule="nonzero"/></svg></a>      
          <a><svg width="24" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" fill="#FFF" fill-rule="nonzero"/></svg></a>
        </div>
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  `;

  return content;
};

const addToCart = (slug) => {
  const product = data.find((item) => item.slug === slug);
  const addToCartButton = document.getElementById("addToCart");
  const quantityInput = document.getElementById("quantity");
  const decreaseButton = document.getElementById("decrease");
  const increaseButton = document.getElementById("increase");

  let quantity = parseInt(quantityInput.value);

  decreaseButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
    }
  });

  increaseButton.addEventListener("click", () => {
    if (quantity < 10) {
      quantity++;
      quantityInput.value = quantity;
    }
  });

  addToCartButton.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    alert(`${quantity} ${slug} added to cart`);
    cart.push({
      slug: slug,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: {
        desktop: product.image.desktop,
        tablet: product.image.tablet,
        mobile: product.image.mobile,
      },
    });
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    document.location.reload();
  });
};

const initFuncProductDetails = (slug) => {
  addToCart(slug);
  handleDetectScreenChange();
  HandleMenuButton();
  processingCart();
};
export { ProductDetails, initFuncProductDetails };
