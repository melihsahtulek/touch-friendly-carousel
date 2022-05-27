window.addEventListener("load", () => {
  const carousel = document.querySelector('[data-name="carousel"]');
  const controlButtons = document.querySelectorAll(".carousel-control");

  let firstTouchX = 0,
    firstTouchY = 0,
    control = false,
    index = 0,
    width = carousel.clientWidth + 2;

  const move = (n) => {
    for (const elem of carousel.children) {
      if (elem.tagName.toLocaleLowerCase() === "div") {
        elem.style.transform = `translateX(${n}px)`;
      }
    }
  };

  const moveDirection = (n) => {
    return width + n > width ? "prev" : "next";
  };

  // EVENTS
  const nextItem = () => {};
  const prevItem = () => {};
  const touchStart = (evt) => {
    control = true;
    firstTouchX = evt.x - carousel.offsetLeft;
    firstTouchY = evt.y - carousel.offsetTop;
  };

  const touchMove = (evt) => {
    if (control) {
      move((firstTouchX - (evt.x - carousel.offsetLeft)) * -1 - index * width);
      let result = moveDirection((firstTouchX - (evt.x - carousel.offsetLeft)) * -1);
    }
  };
  const touchStop = () => {
    console.log("touchStop");
    control = false;
    index++;
    move(index * width * -1);
  };
  const touchCancel = () => {
    control = false;
  };

  carousel.addEventListener("mousedown", (evt) => touchStart(evt));
  carousel.addEventListener("mousemove", (evt) => touchMove(evt));
  carousel.addEventListener("mouseleave", (evt) => touchCancel(evt));
  carousel.addEventListener("mouseup", (evt) => touchStop(evt));
});
