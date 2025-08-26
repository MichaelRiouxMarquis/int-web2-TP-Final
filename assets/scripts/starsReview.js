document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("star-rating");
  const ratingValue = document.getElementById("rating-value");
  const hiddenInput = document.getElementById("selected-rating");
  const submitBtn = document.getElementById("soumettreEtoile");
  const starSuccessMessage = document.getElementById("etoileSuccessMessage");
  const starFailMessage = document.getElementById("etoileFailMessage");
  const form = document.querySelector("form");
  let currentRating = 0;
  let hoverRating = 0;

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("div");
    star.className = "text-3xl cursor-pointer text-gray-400";
    star.innerHTML = "☆";
    star.dataset.value = i;

    star.addEventListener("mouseover", function () {
      hoverRating = parseInt(this.dataset.value);
      updateStars();
    });

    star.addEventListener("mouseout", function () {
      hoverRating = 0;
      updateStars();
    });

    star.addEventListener("click", function () {
      currentRating = parseInt(this.dataset.value);
      hiddenInput.value = currentRating;
      ratingValue.textContent = `${currentRating}/5`;
      updateStars();
    });

    container.appendChild(star);
  }

  function getColorClass(rating) {
    if (rating <= 2) return "text-red-500";
    if (rating === 3) return "text-yellow-400";
    return "text-green-500";
  }

  function updateStars() {
    const stars = container.children;
    const ratingToUse = hoverRating || currentRating;
    const colorClass = getColorClass(ratingToUse);

    for (let i = 0; i < stars.length; i++) {
      if (i < ratingToUse) {
        stars[i].innerHTML = "★";
        stars[i].classList.remove(
          "text-gray-400",
          "text-red-500",
          "text-yellow-400",
          "text-green-500"
        );
        stars[i].classList.add(colorClass);
      } else {
        stars[i].innerHTML = "☆";
        stars[i].classList.remove(
          "text-red-500",
          "text-yellow-400",
          "text-green-500"
        );
        stars[i].classList.add("text-gray-400");
      }
    }
  }

  updateStars();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    starFailMessage.classList.add("invisible");
    const rating = hiddenInput.value || 0;

    if (rating < 1) {
      starFailMessage.classList.remove("invisible");
      return;
    }

    starSuccessMessage.classList.remove("invisible");

    submitBtn.disabled = true;
    submitBtn.style.pointerEvents = "none";
    submitBtn.classList.add("opacity-50");
    const stars = container.children;
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.pointerEvents = "none";
      stars[i].classList.add("opacity-50");
    }
  });
});
