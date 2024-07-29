document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("header");
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");

    // Randomize starting position
    const startX = Math.random() * (containerWidth - 50); // Ensure circle stays within bounds
    circle.style.left = `${startX}px`;
    circle.style.top = `-50px`; // Start above the top of the container

    container.appendChild(circle);

    // Animate the circle
    animateCircle(circle);
  }

  function animateCircle(circle) {
    let start = null;
    const duration = Math.random() * 4000 + 2000; // Random duration between 2 and 6 seconds
    const startX = parseFloat(circle.style.left);
    const endX = Math.random() * (containerWidth - 50); // Random end position
    const startY = -50;
    const endY = containerHeight;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);

      // Calculate current position
      const currentX = startX + (endX - startX) * percent;
      const currentY = startY + (endY - startY) * percent;

      circle.style.left = `${currentX}px`;
      circle.style.top = `${currentY}px`;

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        container.removeChild(circle);
      }
    }

    requestAnimationFrame(step);
  }

  // Create circles at intervals
  setInterval(createCircle, 500);
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".bear-effect-container");
  const numBears = 10; // Number of $BEAR elements to create

  for (let i = 0; i < numBears; i++) {
    const bear = document.createElement("div");
    bear.classList.add("bear-effect");
    bear.textContent = "BILL";

    // Set random position
    bear.style.top = `${Math.random() * 100}%`;
    bear.style.left = `${Math.random() * 100}%`;

    // Set random animation delay
    bear.style.animationDelay = `${Math.random() * 5}s`;

    // Set random font size
    bear.style.fontSize = `${Math.random() * 20 + 10}px`;

    container.appendChild(bear);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const content = this.nextElementSibling;
      const openItem = document.querySelector(".accordion-item.open");

      if (openItem && openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".accordion-content").style.maxHeight = 0;
        openItem.querySelector(".accordion-content").style.padding = "0 20px";
      }

      item.classList.toggle("open");
      if (item.classList.contains("open")) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px 20px";
      } else {
        content.style.maxHeight = 0;
        content.style.padding = "0 20px";
      }
    });
  });
});

document.getElementById("copy-button").addEventListener("click", function () {
  // Create a temporary textarea element
  var tempTextarea = document.createElement("textarea");
  // Set its value to the text you want to copy
  tempTextarea.value = document.getElementById("text-to-copy").textContent;
  // Append it to the body
  document.body.appendChild(tempTextarea);
  // Select the text
  tempTextarea.select();
  // Copy the text
  document.execCommand("copy");
  // Remove the temporary textarea
  document.body.removeChild(tempTextarea);

  // Get the button element
  var copyButton = document.getElementById("copy-button");
  // Save the original text
  var originalText = copyButton.textContent;
  // Change the button text
  copyButton.textContent = "Copied!";

  // Set a timeout to change the text back after 2 seconds (2000 milliseconds)
  setTimeout(function () {
    copyButton.textContent = originalText;
  }, 500);
});
