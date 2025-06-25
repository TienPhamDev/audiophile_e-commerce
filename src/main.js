import Home from "./routes/home";
import Headphones from "./routes/Headphones";
import Speakers from "./routes/Speakers";
import Earphones from "./routes/Earphones";
import ProductDetails from "./routes/ProductDetails";
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

    return;
  }
  // Get the current path and determine the route ,static route
  const route = routes[path] || Home; // Default to Home if no route matches
  const content = route();

  // Render the content in the app element
  document.getElementById("app").innerHTML = content;
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
