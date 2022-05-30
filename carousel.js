window.addEventListener("load", () => {
  const carousel = document.querySelector('[data-name="carousel"]');
  const controlButtons = document.querySelectorAll(".carousel-control");

  let firstTouchX = 0,
    control = false,
    index = 0,
    width = carousel.clientWidth + 2,
    direction = "next",
    lastMoveX = 0,
    maxCount = 0;

  const move = (n, obj) => {
    lastMoveX = n;
    maxCount = 0;

    if (obj.delay) {
      for (const elem of carousel.children) {
        if (elem.tagName.toLocaleLowerCase() === "div") {
          elem.style.transition = ".25s";
        }
      }
    } else {
      for (const elem of carousel.children) {
        if (elem.tagName.toLocaleLowerCase() === "div") {
          elem.style.transition = "none";
        }
      }
    }

    for (const elem of carousel.children) {
      if (elem.tagName.toLocaleLowerCase() === "div") {
        maxCount++;
        elem.style.transform = `translateX(${n}px)`;
      }
    }
  };

  const moveDirection = (n) => {
    direction = width + n > width ? "prev" : "next";
  };

  const nextItem = () => {};
  const prevItem = () => {};

  const touchStart = (evt) => {
    control = true;
    firstTouchX = (evt.x || evt.touches[0].clientX) - carousel.offsetLeft;
  };

  const touchMove = (evt) => {
    if (control) {
      move((firstTouchX - ((evt.x || evt.touches[0].clientX) - carousel.offsetLeft)) * -1 - index * width, { delay: false });
      moveDirection((firstTouchX - ((evt.x || evt.touches[0].clientX) - carousel.offsetLeft)) * -1);
    }
  };

  const touchStop = () => {
    control = false;
    let minMove = Math.abs(width * index + lastMoveX) > 100;

    if (direction === "next" && minMove && index + 1 < maxCount) {
      index++;
    }

    if (direction === "prev" && minMove && index > 0) {
      index--;
    }

    move(index * width * -1, { delay: true });
  };

  const touchCancel = () => {
    touchStop();
  };

  // MOUSE EVENTS

  carousel.addEventListener("mousedown", (evt) => touchStart(evt));
  carousel.addEventListener("mousemove", (evt) => touchMove(evt));
  carousel.addEventListener("mouseleave", (evt) => touchCancel(evt));
  carousel.addEventListener("mouseup", (evt) => touchStop(evt));

  // TOUCH EVENTS

  carousel.addEventListener("touchstart", (evt) => touchStart(evt));
  carousel.addEventListener("touchmove", (evt) => touchMove(evt));
  carousel.addEventListener("touchcancel", (evt) => touchCancel(evt));
  carousel.addEventListener("touchend", (evt) => touchStop(evt));
});
