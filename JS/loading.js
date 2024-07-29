document.addEventListener("DOMContentLoaded", function () {
  var images = document.images;
  let bgImages1 = [];
  if (document.querySelectorAll(".laboratory-img").length > 0) {
    bgImages1 = document.querySelectorAll(".laboratory-img");
  }

  let bgImages2 = [];
  if (document.querySelectorAll(".laboratory-image").length > 0) {
    bgImages2 = document.querySelectorAll(".laboratory-image");
  }

  let bgImages3 = [];
  if (document.querySelectorAll(".modal-pictures").length > 0) {
    bgImages3 = document.querySelectorAll(".modal-pictures");
  }

  var totalImages =
    images.length + bgImages1.length + bgImages2.length + bgImages3.length;
  var imagesLoaded = 0;

  console.log(totalImages);

  function checkIfAllImagesLoaded() {
    if (imagesLoaded === totalImages) {
      var loading = document.getElementById("loading");
      var content = document.getElementById("content");

      if (!window.location.href.includes("meme.html")) {
        if(typeof isPlaying !== 'undefined') {
          if (isPlaying) {
            content.style.display = "block"; // Show main content
          }
        }
      } else {
        content.style.display = "block"; // Show main content
      }

      loading.style.display = "none"; // Hide loading screen

      console.log(imagesLoaded);
    }
  }

  Array.from(images).forEach(function (image) {
    if (image.complete) {
      imagesLoaded++;
      checkIfAllImagesLoaded();
    } else {
      image.addEventListener("load", function () {
        imagesLoaded++;
        checkIfAllImagesLoaded();
      });
      image.addEventListener("error", function () {
        imagesLoaded++;
        checkIfAllImagesLoaded();
      });
    }
  });

  function handleBgElements(elements) {
    if (elements == 0) {
      return;
    }
    Array.from(elements).forEach(function (element) {
      var backgroundImage = window
        .getComputedStyle(element)
        .getPropertyValue("background-image");
      if (backgroundImage && backgroundImage !== "none") {
        var img = new Image();
        var bg = backgroundImage
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, "");
        img.src = bg;
        img.addEventListener("load", function () {
          imagesLoaded++;
          checkIfAllImagesLoaded();
        });
        img.addEventListener("error", function () {
          imagesLoaded++;
          checkIfAllImagesLoaded();
        });
      }
    });
  }

  handleBgElements(bgImages1);
  handleBgElements(bgImages2);
  handleBgElements(bgImages3);
});
