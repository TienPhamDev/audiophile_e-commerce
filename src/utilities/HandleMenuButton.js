const HandleMenuButton = () => {
  const menuButton = document.getElementById("menu-button");
  const svgClose = document.getElementById("menu-close");
  const svgOpen = document.getElementById("menu-open");
  const menu = document.getElementById("menu");

  menuButton.addEventListener("click", () => {
    svgClose.classList.toggle("hidden");
    svgOpen.classList.toggle("hidden");
    menu.classList.toggle("hidden");
  });
};

export default HandleMenuButton;
