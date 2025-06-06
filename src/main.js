import Home from "./routes/home";

const routes = {
  "/": Home,
};

const navigateTo = (path) => {
  history.pushState(null, null, path);
  router();
};

const router = () => {
  const path = window.location.pathname;
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
