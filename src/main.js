import { Home, initFuncHome } from "./screens/home";
import { Headphones, initFuncHeadphones } from "./screens/Headphones";
import { Speakers, initFuncSpeakers } from "./screens/Speakers";
import { Earphones, initFuncEarphones } from "./screens/Earphones";
import {
  ProductDetails,
  initFuncProductDetails,
} from "./screens/ProductDetails";

// Initialize the cart in localStorage
// If the cart is not already initialized, set it to an empty array
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Define the routes for the application
const routes = {
  "/": Home,
  "/headphones": Headphones,
  "/speakers": Speakers,
  "/earphones": Earphones,
};

const navigateTo = (path) => {
  history.pushState(null, null, path);
  router();
};

const router = () => {
  // Check if the current path is a product details page
  const path = window.location.pathname;
  // dynamic routing
  // Check if the path includes product categories
  // and extract the slug for product details
  if (
    path.includes("/headphones/") ||
    path.includes("/speakers/") ||
    path.includes("/earphones/")
  ) {
    const slug = path.split("/").pop();

    const productDetailsPage = ProductDetails(slug);
    document.querySelector("#app").innerHTML = productDetailsPage;
    initFuncProductDetails(slug);
    return;
  }
  // Get the current path and determine the route ,static route
  const route = routes[path] || Home; // Default to Home if no route matches

  const content = route();

  // Render the content in the app element
  document.getElementById("app").innerHTML = content;
  // Initialize the home page or any other route that requires initialization
  if (route === Home) {
    initFuncHome();
  }
  if (route === Headphones) {
    initFuncHeadphones();
  }
  if (route === Speakers) {
    initFuncSpeakers();
  }
  if (route === Earphones) {
    initFuncEarphones();
  }
};

// Handle browser navigation (back/forward buttons)
window.addEventListener("popstate", router);

// Handle initial page load and link navigation
window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const path = e.target.href;
      navigateTo(path);
    }
  });

  // Call the router to render the initial page
  router();
});
