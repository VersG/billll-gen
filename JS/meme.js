document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".modal-pictures");
  const downloadBtn = document.getElementById("downloadBtn");
  let newX = 0,
    newY = 0,
    startX = 0,
    startY = 0;
  let draganddroptext;
  let lastTextClicked;
  let rotationInput = document.querySelector(".text-rotation-input");
  let rotateHandle;
  let currentRotateHandle;
  let isRotating = false;
  let isSizing = false;

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const newSrc = thumbnail.style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "");

      mainImage.style.backgroundImage = `url(${newSrc})`;
    });
  });

  mainImage.addEventListener("click", (event) => {
    if (event.target !== mainImage) return;
    if (isRotating) return;
    if (isSizing) return;

    const parent = document.createElement("span");
    parent.classList.add("modal-text-container");

    const text = document.createElement("div");
    text.classList.add("modal-text");
    text.setAttribute("contenteditable", "true");
    text.textContent = "Your Text";
    // Get click position relative to the div
    const rect = mainImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Set the position of the text
    parent.style.left = `${x}px`;
    parent.style.top = `${y}px`;
    draganddroptext = parent;
    lastTextClicked = parent;
    parent.addEventListener("mousedown", mouseDown);
    parent.addEventListener("touchstart", touchStart);

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.style.backgroundColor = "#ff4d6d";
    deleteBtn.style.color = "#fff";
    deleteBtn.style.position = "absolute";
    deleteBtn.style.top = -12.5 + "px";
    deleteBtn.style.right = -15 + "px";
    deleteBtn.style.width = "fit-content";
    deleteBtn.style.zIndex = "10"; // Ensure the button is on top
    deleteBtn.setAttribute("contenteditable", "false");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      parent.remove();
    });

    // Create Rotate Button
    rotateHandle = document.createElement("div");
    rotateHandle.classList.add("rotate-handle");
    rotateHandle.style.position = "absolute";
    rotateHandle.style.bottom = "-40px";
    rotateHandle.style.left = "45%";
    rotateHandle.style.backgroundColor = "#ffd200";
    rotateHandle.style.clipPath = "circle()";
    rotateHandle.style.cursor = "grab";
    rotateHandle.style.color = "black";
    rotateHandle.style.padding = "0px 5px";
    rotateHandle.style.fontSize = "20px";
    rotateHandle.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';
    rotateHandle.children[0].style.pointerEvents = "none";

    rotateHandle.addEventListener("mousedown", detecteMouseDirection);
    rotateHandle.addEventListener("touchstart", detecteMouseDirection);

    // Create Resize Dot
    const resizeDot = document.createElement("div");
    resizeDot.classList.add("resize-dot");

    resizeDot.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      isSizing = true;
      const initialWidth = parent.offsetWidth;
      const initialHeight = parent.offsetHeight;
      const initialFontSize = parseInt(window.getComputedStyle(text).fontSize);
      const initialMouseX = e.clientX;
      const initialMouseY = e.clientY;

      const resize = (e) => {
        const dx = e.clientX - initialMouseX;
        const dy = e.clientY - initialMouseY;

        const newWidth = initialWidth + dx;
        const newHeight = initialHeight + dy;

        const parentRect = parent.getBoundingClientRect();
        const mainImageRect = mainImage.getBoundingClientRect();

        if (
          newWidth > 50 &&
          newHeight > 20 &&
          parentRect.left + newWidth <= mainImageRect.right &&
          parentRect.top + newHeight <= mainImageRect.bottom
        ) {
          //parent.style.width = `${newWidth}px`;
          //parent.style.height = `${newHeight}px`;

          const widthRatio = newWidth / initialWidth;
          const heightRatio = newHeight / initialHeight;
          const newFontSize =
            initialFontSize * Math.min(widthRatio, heightRatio);
          mainImage.style.fontSize = `${newFontSize}px`;
        }
      };

      const stopResize = () => {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
        setTimeout(() => {
          isSizing = false;
        }, 250);
      };

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    });

    resizeDot.addEventListener("touchstart", (e) => {
      e.stopPropagation();
      isSizing = true;
      const initialWidth = parent.offsetWidth;
      const initialHeight = parent.offsetHeight;
      const initialFontSize = parseInt(window.getComputedStyle(text).fontSize);
      const touch = e.touches[0];
      const initialMouseX = touch.clientX;
      const initialMouseY = touch.clientY;

      const resize = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - initialMouseX;
        const dy = touch.clientY - initialMouseY;

        const newWidth = initialWidth + dx;
        const newHeight = initialHeight + dy;

        const parentRect = parent.getBoundingClientRect();
        const mainImageRect = mainImage.getBoundingClientRect();

        if (
          newWidth > 50 &&
          newHeight > 20 &&
          parentRect.left + newWidth <= mainImageRect.right &&
          parentRect.top + newHeight <= mainImageRect.bottom
        ) {
          //parent.style.width = `${newWidth}px`;
          //parent.style.height = `${newHeight}px`;

          const widthRatio = newWidth / initialWidth;
          const heightRatio = newHeight / initialHeight;
          const newFontSize =
            initialFontSize * Math.min(widthRatio, heightRatio);
          mainImage.style.fontSize = `${newFontSize}px`;
        }
      };

      const stopResize = () => {
        document.removeEventListener("touchmove", resize);
        document.removeEventListener("touchend", stopResize);
        setTimeout(() => {
          isSizing = false;
        }, 250);
      };

      document.addEventListener("touchmove", resize, { passive: false });
      document.addEventListener("touchend", stopResize);
    });

    deleteBtn.classList.add("text-meme-btn");
    rotateHandle.classList.add("text-meme-btn");
    resizeDot.classList.add("text-meme-btn");

    parent.appendChild(deleteBtn);
    parent.appendChild(text);
    parent.appendChild(rotateHandle);
    parent.appendChild(resizeDot);
    mainImage.appendChild(parent);
    text.focus();
    rotationInput.value = getRotation(lastTextClicked);
    currentRotateHandle = rotateHandle;

    //OnClick();
    document.querySelectorAll(".text-meme-btn").forEach((element) => {
      element.style.opacity = 0;
    });

    parent.children[0].style.opacity = 1;
    parent.children[2].style.opacity = 1;
    parent.children[3].style.opacity = 1;
  });

  downloadBtn.addEventListener("click", () => {
    for (
      let i = 0;
      i < document.querySelectorAll(".text-meme-btn").length;
      i++
    ) {
      document.querySelectorAll(".text-meme-btn")[i].style.opacity = 0;
    }

    // for (
    //   let i = 0;
    //   i < document.querySelectorAll(".rotate-handle").length;
    //   i++
    // ) {
    //   document.querySelectorAll(".rotate-handle")[i].style.opacity = 0;
    // }
    //const w = mainImage.style.width;

    const computedStyle = getComputedStyle(mainImage);

    // Get the width and height as strings (e.g., "200px")
    const widthString = computedStyle.width;
    const heightString = computedStyle.height;
    const fontSizeString = computedStyle.fontSize;

    // Convert the strings to numbers, removing the "px"
    const widthNumber = parseFloat(widthString);
    const heightNumber = parseFloat(heightString);
    const fontSizeNumber = parseFloat(fontSizeString);

    // Calculate the new dimensions
    const newWidth = widthNumber * 4;
    const newHeight = heightNumber * 4;
    const newFontSize = fontSizeNumber * 4;

    // Set the new dimensions with "px" appended
    mainImage.style.width = `${newWidth}px`;
    mainImage.style.height = `${newHeight}px`;
    mainImage.style.fontSize = `${newFontSize}px`;

    //mainImage.style.width =

    mainImage.style.position = "absolute";

    const textContainers = mainImage.querySelectorAll(".modal-text-container");

    textContainers.forEach((container) => {
      // Get current computed styles
      const computedStyle = getComputedStyle(container);

      // Get current left and top as strings (e.g., "100px")
      const leftString = computedStyle.left;
      const topString = computedStyle.top;

      // Convert strings to numbers
      const leftNumber = parseFloat(leftString);
      const topNumber = parseFloat(topString);

      // Calculate new positions
      const newLeft = leftNumber * 4;
      const newTop = topNumber * 4;

      // Apply new positions
      container.style.left = `${newLeft}px`;
      container.style.top = `${newTop}px`;
    });

    mainImage.style.border = "none";

    html2canvas(mainImage).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png", 1);
      link.download = "meme.png";
      link.click();
      mainImage.style.width = widthString;
      mainImage.style.height = heightString;
      mainImage.style.fontSize = fontSizeString;
      mainImage.style.position = "relative";
      textContainers.forEach((container) => {
        // Get current computed styles
        const computedStyle = getComputedStyle(container);

        // Get current left and top as strings (e.g., "100px")
        const leftString = computedStyle.left;
        const topString = computedStyle.top;

        // Convert strings to numbers
        const leftNumber = parseFloat(leftString);
        const topNumber = parseFloat(topString);

        // Calculate new positions
        const newLeft = leftNumber / 4;
        const newTop = topNumber / 4;

        // Apply new positions
        container.style.left = `${newLeft}px`;
        container.style.top = `${newTop}px`;
      });
      mainImage.style.border = "5px solid #ffd200";
      for (
        let i = 0;
        i < document.querySelectorAll(".text-meme-btn").length;
        i++
      ) {
        document.querySelectorAll(".text-meme-btn")[i].style.opacity = 1;
      }

      // for (
      //   let i = 0;
      //   i < document.querySelectorAll(".rotate-handle").length;
      //   i++
      // ) {
      //   document.querySelectorAll(".rotate-handle")[i].style.opacity = 1;
      // }
    });
  });

  function OnClick() {
    document.querySelectorAll(".modal-text-container").forEach((element) => {
      element.children[0].style.opacity = 0;
      element.children[2].style.opacity = 0;
      element.children[3].style.opacity = 0;
      element.addEventListener("mousedown", function () {
        // Add the highlight class to the currently clicked element
        this.children[0].style.opacity = 1;
        this.children[2].style.opacity = 1;
        this.children[3].style.opacity = 1;
      });
    });
  }

  function mouseDown(e) {
    if (isRotating) return;
    draganddroptext = e.target.parentElement;
    lastTextClicked = draganddroptext;
    rotationInput.value = getRotation(lastTextClicked);

    currentRotateHandle = draganddroptext.children[2];

    OnClick();

    //console.log(draganddroptext.children[0]);
    //console.log(lastTextClicked);

    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(e) {
    //console.log(isRotating);
    if (isRotating || !draganddroptext) return;

    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    let newLeft = draganddroptext.offsetLeft - newX;
    let newTop = draganddroptext.offsetTop - newY;

    // Ensure the child div doesn't go outside the parent div
    const parentRect = mainImage.getBoundingClientRect();
    const childRect = draganddroptext.getBoundingClientRect();

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + childRect.width > parentRect.width) {
      newLeft = parentRect.width - childRect.width;
    }
    if (newTop + childRect.height > parentRect.height) {
      newTop = parentRect.height - childRect.height;
    }

    draganddroptext.style.left = `${newLeft}px`;
    draganddroptext.style.top = `${newTop}px`;
  }

  function mouseUp(e) {
    document.removeEventListener("mousemove", mouseMove);

    draganddroptext = null;
  }

  function touchStart(e) {
    if (isRotating) return;
    if (e.touches.length === 1) {
      draganddroptext = e.target.parentElement;
      lastTextClicked = draganddroptext;
      rotationInput.value = getRotation(lastTextClicked);
      currentRotateHandle = draganddroptext.children[2];

      OnClick();

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;

      document.addEventListener("touchmove", touchMove, { passive: false });
      document.addEventListener("touchend", touchEnd);
    }
  }

  function touchMove(e) {
    if (isRotating || !draganddroptext) return;
    if (e.touches.length === 1) {
      e.preventDefault(); // Prevent page scrolling

      newX = startX - e.touches[0].clientX;
      newY = startY - e.touches[0].clientY;

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;

      let newLeft = draganddroptext.offsetLeft - newX;
      let newTop = draganddroptext.offsetTop - newY;

      // Ensure the child div doesn't go outside the parent div
      const parentRect = mainImage.getBoundingClientRect();
      const childRect = draganddroptext.getBoundingClientRect();

      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + childRect.width > parentRect.width) {
        newLeft = parentRect.width - childRect.width;
      }
      if (newTop + childRect.height > parentRect.height) {
        newTop = parentRect.height - childRect.height;
      }

      draganddroptext.style.left = `${newLeft}px`;
      draganddroptext.style.top = `${newTop}px`;
    }
  }

  function touchEnd(e) {
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("touchend", touchEnd);

    draganddroptext = null;
  }

  const currentTextSize = document.querySelector(".current-text-size");
  const increaseBtn = document.querySelector(".increase-size");
  const decreaseBtn = document.querySelector(".decrease-size");
  const memeText = document.querySelector(".modal-image");
  let currentSize = 25;

  increaseBtn.addEventListener("click", () => {
    currentSize++;
    UpdateTextSize();
  });

  decreaseBtn.addEventListener("click", () => {
    currentSize--;
    UpdateTextSize();
  });

  currentTextSize.addEventListener("input", () => {
    const newValue = currentTextSize.innerText;
    currentSize = newValue;
    UpdateTextSize();
  });

  function UpdateTextSize() {
    currentTextSize.textContent = currentSize;
    memeText.style.fontSize = currentSize + "px";
    //memeText.style.fontSize = currentSize / 16 + "em";
  }

  document
    .querySelector(".color-editor-black")
    .addEventListener("click", () => {
      ChangeFontColor("black");
    });

  document
    .querySelector(".color-editor-white")
    .addEventListener("click", () => {
      ChangeFontColor("white");
    });

  function ChangeFontColor(color) {
    //console.log(lastTextClicked);

    if (!lastTextClicked) {
      document.querySelectorAll(".modal-text").forEach((e) => {
        e.style.color = color;

        if (color == "black") {
          e.style.textShadow = "none";
        } else {
          e.style.textShadow =
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
        }
      });
    } else {
      lastTextClicked.children[1].style.color = color;

      if (color == "black") {
        lastTextClicked.children[1].style.textShadow = "none";
      } else {
        lastTextClicked.children[1].style.textShadow =
          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
      }
    }
  }
  let isBold = false;
  let isItalic = false;

  document
    .querySelector(".weight-editor strong")
    .addEventListener("click", () => {
      if (!lastTextClicked) return;
      isBold == false
        ? (lastTextClicked.style.fontWeight = "bold")
        : (lastTextClicked.style.fontWeight = "normal");
      isBold = !isBold;
    });

  document.querySelector(".weight-editor i").addEventListener("click", () => {
    if (!lastTextClicked) return;
    isItalic == false
      ? (lastTextClicked.style.fontStyle = "italic")
      : (lastTextClicked.style.fontStyle = "normal");
    isItalic = !isItalic;
  });

  const select = document.querySelector("#font-editor-select");

  select.addEventListener("change", () => {
    if (!lastTextClicked) return;
    lastTextClicked.style.fontFamily = select.value;
  });

  rotationInput.addEventListener("change", () => {
    if (!lastTextClicked) return;
    Rotate(rotationInput.value);
  });

  function Rotate(value) {
    lastTextClicked.children[1].style.transform = `rotate(${value}deg)`;
  }

  function getRotation(div) {
    const transform = window.getComputedStyle(div).transform;

    if (transform !== "none") {
      const values = transform.split("(")[1].split(")")[0].split(",");
      const a = values[0];
      const b = values[1];
      const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      return angle;
    } else {
      return 0;
    }
  }

  // let rotation;
  // let isClicking;

  // function startRotate(e) {
  //   rotateHandle.style.opacity = 0;
  //   rotation = getRotation(lastTextClicked.children[1]);

  //   mainImage.addEventListener("mousemove", () => {
  //     handleMovement(e);
  //   });
  //   mainImage.addEventListener("touchmove", handleMovement);

  //   // Reset previousPosition when touch ends or mouse leaves the area
  //   mainImage.addEventListener("mouseup", () => {
  //     previousPosition = { x: null, y: null };
  //     rotateHandle.style.opacity = 1;
  //     isClicking = false;
  //     console.log(isClicking);
  //   });
  //   mainImage.addEventListener(
  //     "touchend",
  //     () => (previousPosition = { x: null, y: null })
  //   );
  // }

  // let previousPosition = { x: null, y: null };

  // function handleMovement(event) {
  //   if (!isClicking) return;

  //   const currentPosition = getEventPosition(event);

  //   if (previousPosition.x !== null && previousPosition.y !== null) {
  //     const deltaX = currentPosition.x - previousPosition.x;
  //     //const deltaY = currentPosition.y - previousPosition.y;

  //     const directionX = deltaX > 0 ? 1 : -1;
  //     //const directionY = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;

  //     console.log("Direction X:", directionX); // 1 for right, -1 for left, 0 for no movement
  //     //console.log("Direction Y:", directionY); // 1 for down, -1 for up, 0 for no movement

  //     rotation += directionX * 3;
  //     Rotate(rotation);
  //   }

  //   previousPosition = currentPosition;
  // }

  // function getEventPosition(event) {
  //   let x, y;
  //   if (event.touches && event.touches.length > 0) {
  //     x = event.touches[0].clientX;
  //     y = event.touches[0].clientY;
  //   } else {
  //     x = event.clientX;
  //     y = event.clientY;
  //   }
  //   return { x, y };
  // }

  let rotation;

  function detecteMouseDirection() {
    mainImage.addEventListener("mousemove", mousemovemethod);
    mainImage.addEventListener("touchmove", mousemovemethod, {
      passive: false,
    });
    rotation = getRotation(lastTextClicked.children[1]);
    lastTextClicked.classList.add("non-selectable");
    mainImage.addEventListener("mouseup", mouseupmethod);
    mainImage.addEventListener("touchend", mouseupmethod);
  }

  var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {
      let pageX;
      if (e.type === "mousemove") {
        pageX = e.pageX;
      } else if (e.type === "touchmove") {
        e.preventDefault();
        pageX = e.touches[0].pageX;
      }

      if (pageX < oldx) {
        direction = "left";
        rotation -= 4;
      } else if (pageX > oldx) {
        direction = "right";
        rotation += 4;
      }
      Rotate(rotation);
      currentRotateHandle.style.opacity = 0;
      isRotating = true;
      //console.log(direction);
      oldx = pageX;
      mainImage.style.cursor = "grabbing";
    },
    mouseupmethod = function (e) {
      if (isRotating) {
        currentRotateHandle.style.opacity = 1;
      }
      setTimeout(() => {
        isRotating = false;
      }, 250);
      mainImage.removeEventListener("mousemove", mousemovemethod);
      mainImage.removeEventListener("touchmove", mousemovemethod);
      mainImage.style.cursor = "default";
      //console.log(isRotating);
    };

  document.querySelectorAll(".modal-pictures").forEach((e) => {
    e.addEventListener("click", () => {
      document.getElementById("mainImage").scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align the top of the target element with the top of the viewport
      });
    });
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const editableDiv = document.querySelector(".editable-div");
//   const resizeDot = document.querySelector(".resize-dot");

//   let isResizing = false;
//   let initialWidth,
//     initialHeight,
//     initialFontSize,
//     initialMouseX,
//     initialMouseY;

//   resizeDot.addEventListener("mousedown", (e) => {
//     isResizing = true;
//     initialWidth = editableDiv.offsetWidth;
//     initialHeight = editableDiv.offsetHeight;
//     initialFontSize = parseInt(window.getComputedStyle(editableDiv).fontSize);
//     initialMouseX = e.clientX;
//     initialMouseY = e.clientY;

//     document.addEventListener("mousemove", resize);
//     document.addEventListener("mouseup", stopResize);
//   });

//   const resize = (e) => {
//     if (!isResizing) return;

//     const dx = e.clientX - initialMouseX;
//     const dy = e.clientY - initialMouseY;

//     const newWidth = initialWidth + dx;
//     const newHeight = initialHeight + dy;

//     if (newWidth > 100 && newHeight > 50) {
//       editableDiv.style.width = `${newWidth}px`;
//       editableDiv.style.height = `${newHeight}px`;

//       // Calculate the new font size based on the ratio of the new dimensions to the initial dimensions
//       const widthRatio = newWidth / initialWidth;
//       const heightRatio = newHeight / initialHeight;
//       const newFontSize = initialFontSize * Math.min(widthRatio, heightRatio);
//       editableDiv.style.fontSize = `${newFontSize}px`;
//     }
//   };

//   const stopResize = () => {
//     isResizing = false;
//     document.removeEventListener("mousemove", resize);
//     document.removeEventListener("mouseup", stopResize);
//   };
// });
