document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = document.getElementById("carouselImgs");
  const images = carouselImages.querySelectorAll("img");
  const leftBtn = document.getElementById("carousel-left-btn");
  const rightBtn = document.getElementById("carousel-right-btn");
  const dotsContainer = document.querySelector(".carouselDots");

  let currentIndex = 0;
  let dots = [];

function createDots() {
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className =
      "w-4 h-4 rounded-full bg-white/60 cursor-pointer transition-all duration-300";
    if (index === currentIndex) {
      dot.classList.add("!bg-red-500", "scale-125", "shadow-[0_0_8px_#ef4444]");
    }
    dot.addEventListener("click", () => goToImage(index));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });
}

function initCarousel() {
  images.forEach((img, index) => {
    img.classList.remove("opacity-100");
    img.classList.add("opacity-0");
    if (index === currentIndex) {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    }
  });
  updateButtons();
  updateDots();
}

  function updateButtons() {
    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex === images.length - 1;
  }

function updateDots() {
  dots.forEach((dot, index) => {
    dot.className =
      "w-4 h-4 rounded-full bg-white/60 cursor-pointer transition-all duration-300";
    if (index === currentIndex) {
      dot.classList.add("!bg-red-500", "scale-125", "shadow-[0_0_8px_#ef4444]");
    }
  });
}

function goToImage(index) {
  if (index >= 0 && index < images.length && index !== currentIndex) {
    images[currentIndex].classList.remove("opacity-100");
    images[currentIndex].classList.add("opacity-0");

    currentIndex = index;

    images[currentIndex].classList.remove("opacity-0");
    images[currentIndex].classList.add("opacity-100");

    updateButtons();
    updateDots();
  }
}

  function nextImage() {
    if (currentIndex < images.length - 1) {
      goToImage(currentIndex + 1);
    }
  }

  function prevImage() {
    if (currentIndex > 0) {
      goToImage(currentIndex - 1);
    }
  }

  rightBtn.addEventListener("click", nextImage);
  leftBtn.addEventListener("click", prevImage);

  createDots();
  initCarousel();

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  });
});
