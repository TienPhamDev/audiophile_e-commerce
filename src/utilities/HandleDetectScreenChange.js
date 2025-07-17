const handleDetectScreenChange = () => {
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== lastWidth) {
      location.reload();
    }
  });
};
export default handleDetectScreenChange;