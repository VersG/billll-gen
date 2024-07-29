document.addEventListener("DOMContentLoaded", function () {
  const backgrounds = document.querySelectorAll(".laboratory-background");
  const skins = document.querySelectorAll(".laboratory-skin");
  const mouths = document.querySelectorAll(
    ".laboratory-mouth .laboratory-image"
  );
  const eyes = document.querySelectorAll(".laboratory-eye .laboratory-image");
  const glasses = document.querySelectorAll(
    ".laboratory-glasse .laboratory-image"
  );
  const clothes = document.querySelectorAll(
    ".laboratory-clothe .laboratory-image"
  );
  const heads = document.querySelectorAll(".laboratory-head .laboratory-image");
  //const colors = ["#597cff", "#ffd200", "#00a36c", "#ff4d6d"];

  //ChangeBackground();
  ChangeItem(backgrounds, "pfp-background");
  ChangeItem(skins, "pfp-skin");
  ChangeItem(mouths, "pfp-mouth");
  ChangeItem(eyes, "pfp-eyes");
  ChangeItem(glasses, "pfp-glasses");
  ChangeItem(clothes, "pfp-clothes");
  ChangeItem(heads, "pfp-head");

  scroll(".laboratory-backgrounds-wraper", ".scroll-backgrounds");
  scroll(".laboratory-skins-wraper", ".scroll-skins");
  scroll(".laboratory-mouths-wraper", ".scroll-mouths");
  scroll(".laboratory-eyes-wraper", ".scroll-eyes");
  scroll(".laboratory-clothes-wraper", ".scroll-clothes");
  scroll(".laboratory-heads-wraper", ".scroll-heads");
  scroll(".laboratory-glasses-wraper", ".scroll-glasses");

  document.querySelector(".random-button").addEventListener("click", () => {
    document.getElementById(
      "pfp-background"
    ).style.backgroundImage = `url(${backgrounds[
      getRandomInt(0, backgrounds.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    document.getElementById("pfp-skin").style.backgroundImage = `url(${skins[
      getRandomInt(0, skins.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    document.getElementById("pfp-mouth").style.backgroundImage = `url(${mouths[
      getRandomInt(0, mouths.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    document.getElementById("pfp-eyes").style.backgroundImage = `url(${eyes[
      getRandomInt(0, eyes.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    document.getElementById(
      "pfp-glasses"
    ).style.backgroundImage = `url(${glasses[
      getRandomInt(0, glasses.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    document.getElementById(
      "pfp-clothes"
    ).style.backgroundImage = `url(${clothes[
      getRandomInt(0, clothes.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    document.getElementById("pfp-head").style.backgroundImage = `url(${heads[
      getRandomInt(0, heads.length)
    ].style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "")})`;

    // document.querySelector(
    //   ".pfp-elements.pfp-background"
    // ).style.backgroundColor = colors[getRandomInt(0, colors.length)];
  });

  document.querySelector(".download-button").addEventListener("click", () => {
    const w = document.querySelector(".pfp").style.width;
    document.querySelector(".pfp").style.height = "1024px";
    document.querySelector(".pfp").style.width = "1024px";
    document.querySelector(".pfp").style.border = "none";
    html2canvas(document.querySelector(".pfp")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "pfp.png";
      link.click();
      document.querySelector(".pfp").style.height = w;
      document.querySelector(".pfp").style.width = w;
      document.querySelector(".pfp").style.border = "5px solid white";
    });
  });
});

// function ChangeBackground() {
//   const backgrounds = document.querySelectorAll(".laboratory-background");
//   const pfpBackground = document.querySelector(".pfp-elements.pfp-background");

//   backgrounds.forEach((background) => {
//     background.addEventListener("click", function () {
//       const newColor = window.getComputedStyle(this).backgroundColor;
//       pfpBackground.style.backgroundColor = newColor;
//     });
//   });
// }

function ChangeItem(skins, item) {
  const mainSkin = document.getElementById(item);
  skins.forEach((skin) => {
    skin.addEventListener("click", () => {
      const newSrc = skin.style.backgroundImage.slice(4, -1).replace(/"/g, "");
      mainSkin.style.backgroundImage = `url(${newSrc})`;
    });
  });
}

function scroll(wraper, scrolltype) {
  const scrollRight = document.querySelector(".scroll-right" + scrolltype);
  const scrollLeft = document.querySelector(".scroll-left" + scrolltype);
  const scrollWrapper = document.querySelector(wraper);

  function updateButtonVisibility() {
    if (
      scrollWrapper.scrollLeft + scrollWrapper.clientWidth >=
      scrollWrapper.scrollWidth
    ) {
      scrollRight.classList.add("hidden-lab");
    } else {
      scrollRight.classList.remove("hidden-lab");
    }
  }

  function updateLeftButtonVisibility() {
    if (scrollWrapper.scrollLeft > 0) {
      scrollLeft.classList.remove("hidden-lab");
    } else {
      scrollLeft.classList.add("hidden-lab");
    }
  }

  scrollRight.onclick = function () {
    document.querySelector(wraper).scrollBy({
      left: 80,
      behavior: "smooth",
    });
  };

  scrollLeft.onclick = function () {
    document.querySelector(wraper).scrollBy({
      left: -80,
      behavior: "smooth",
    });
  };

  // Update button visibility on scroll
  scrollWrapper.addEventListener("scroll", updateButtonVisibility);
  scrollWrapper.addEventListener("scroll", updateLeftButtonVisibility);

  // Initial check
  updateButtonVisibility();
  updateLeftButtonVisibility();
}

function getRandomInt(min, max) {
  min = Math.ceil(min); // Round up from min
  max = Math.floor(max); // Round down from max
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
  // Function to create and animate the bear text
  function createBearText() {
    const bearText = document.createElement("div");
    bearText.classList.add("bear-text");
    bearText.textContent = "BILL";
    document.body.appendChild(bearText);

    // Randomize position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    bearText.style.left = `${posX}px`;
    bearText.style.top = `${posY}px`;

    // Randomize size
    const fontSize = Math.random() * (40 - 20) + 20; // Random font size between 20 and 60
    bearText.style.fontSize = `${fontSize}px`;

    // Animation
    bearText.animate(
      [
        { opacity: 1, transform: "scale(0.2)" },
        { opacity: 1, transform: "scale(1.25)" },
        { opacity: 0, transform: "scale(2)" },
      ],
      {
        duration: 2000 + Math.random() * 1000, // Duration between 2 to 3 seconds
        easing: "ease-in-out",
        iterations: 1,
        fill: "forwards", // Ensure the element remains at the end keyframe
      }
    );

    // Remove the element after animation
    bearText.addEventListener("animationend", () => {
      bearText.remove();
    });
  }

  // Function to repeatedly create bear text
  function repeatBearText() {
    setInterval(() => {
      createBearText();
    }, 2000); // Interval between each creation (in milliseconds)
  }

  // Start creating bear text
  repeatBearText();
});
