const emailInput = document.getElementById("email");
const erreurMsg = document.getElementById("emailError");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailValidation() {
  const emailValue = emailInput.value.trim();
  if (!emailPattern.test(emailValue)) {
    erreurMsg.classList.remove("invisible");
    emailInput.classList.add("border-red-500");
    return false;
  } else {
    erreurMsg.classList.add("invisible");
    emailInput.classList.remove("border-red-500");
    alert(
      "Merci pour votre abonnement ! Préparez-vous à recevoir notre meilleur contenu visuel."
    );
    return true;
  }
}

document.getElementById("email").addEventListener("input", function () {
  const emailInput = this;
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailInput.classList.remove("border-red-500", "border-green-500");
    erreurMsg.classList.add("invisible");
    return;
  }

  if (emailPattern.test(emailValue)) {
    emailInput.classList.remove("border-red-500");
    emailInput.classList.add("border-green-500");
  }
});
