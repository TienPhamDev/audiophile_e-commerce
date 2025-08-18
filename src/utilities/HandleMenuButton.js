const HandleMenuButton = () => {
  const menuButton = document.getElementById("menu-button");
  const svgClose = document.getElementById("menu-close");
  const svgOpen = document.getElementById("menu-open");
  const menuTablet = document.getElementById("menu-tablet");
  const overlay = document.querySelector(".overlay-menu");

  const screenWidth = window.innerWidth;
  const isTablet = screenWidth <= 768;
  const isDesktop = screenWidth > 768;
  const isMobile = screenWidth <= 431;
  const funcHideMenu = () => {
    svgClose.classList.toggle("hidden");
    svgOpen.classList.toggle("hidden");
    menuTablet.classList.toggle("hidden");
    menuTablet.style.transform = "translateY(0)";
    menuTablet.style.transition = "transform 0.3s ease";
    overlay.style.display = "none";
    document.body.style.overflowY = "auto";
  };
  menuButton.addEventListener("click", () => {
    svgClose.classList.toggle("hidden");
    svgOpen.classList.toggle("hidden");
    menuTablet.classList.toggle("hidden");
    if (menuTablet.classList.contains("hidden")) {
      if (isMobile) {
        menuTablet.style.transform = "translateY(110%)";
      }
      if (isTablet && !isMobile) {
        menuTablet.style.transform = "translateY(130%)";
        menuTablet.style.transition = "transform 0.3s ease";
        overlay.style.display = "block";
        document.body.style.overflowY = "hidden";
      }

      menuTablet.style.transition = "transform 0.3s ease";
      overlay.style.display = "block";
      document.body.style.overflowY = "hidden";
    } else {
      menuTablet.style.transform = "translateY(0)";
      menuTablet.style.transition = "transform 0.3s ease";
      overlay.style.display = "none";
      document.body.style.overflowY = "auto";
    }
    // if (
    //   isMobile &&
    //   !isDesktop &&
    //   !isTablet &&
    //   !menuTablet.classList.contains("hidden")
    // ) {
    //   menuTablet.style.transform = "translateY(130%)";
    // }
    // menuTablet.style.transform = "translateY(130%)";
    // menuTablet.style.transition = "transform 0.3s ease";
    // hero.style.filter = "blur(3px)";
    // document.body.style.overflowY = "hidden";
  });
  // Close the menu when clicking outside of it
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("overlay-menu")) {
      funcHideMenu();
    }
  });

  // Close the menu when clicking on cart button
  const cartButton = document.getElementById("cart-button");
  cartButton.addEventListener("click", () => {
    if (menuTablet.classList.contains("hidden") && !isDesktop) {
      funcHideMenu();
    }
  });
};

export default HandleMenuButton;
