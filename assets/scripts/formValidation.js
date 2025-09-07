document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pokerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    // Regex
    const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    const regexUsername = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]+$/;

    // Prénom
    const firstName = document.getElementById("firstName");
    if (!firstName.value.trim()) {
      showError("firstName", "Le prénom est obligatoire");
      isValid = false;
    } else if (!regexName.test(firstName.value)) {
      showError(
        "firstName",
        "Caractères invalides : lettres, espace, apostrophe et tiret seulement"
      );
      isValid = false;
    }

    // Nom
    const lastName = document.getElementById("lastName");
    if (!lastName.value.trim()) {
      showError("lastName", "Le nom est obligatoire");
      isValid = false;
    } else if (!regexName.test(lastName.value)) {
      showError(
        "lastName",
        "Caractères invalides : lettres, espace, apostrophe et tiret seulement"
      );
      isValid = false;
    }

    // Ville
    const city = document.getElementById("city");
    if (!city.value.trim()) {
      showError("city", "La ville est obligatoire");
      isValid = false;
    } else if (!regexName.test(city.value)) {
      showError("city", "Caractères invalides pour la ville");
      isValid = false;
    }

    // Pseudo
    const username = document.getElementById("username");
    if (!username.value.trim()) {
      showError("username", "Le pseudo est obligatoire");
      isValid = false;
    } else if (!regexUsername.test(username.value)) {
      showError(
        "username",
        "Caractères invalides : lettres, chiffres, apostrophe et tiret seulement"
      );
      isValid = false;
    }

    // Email
    const email = document.getElementById("email");
    if (!email.value.trim()) {
      showError("email", "L'email est obligatoire");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError("email", "Format d'email invalide");
      isValid = false;
    }

    // Mot de passe
    const password = document.getElementById("password");
    const pwd = password.value || "";
    if (!pwd) {
      showError("password", "Le mot de passe est obligatoire");
      isValid = false;
    } else {
      const missing = [];
      if (pwd.length < 8) missing.push("au moins 8 caractères");
      if (!/[A-Z]/.test(pwd)) missing.push("au moins 1 majuscule");
      if (!/[@$!%*?&._-]/.test(pwd))
        missing.push("au moins 1 caractère spécial (@$!%*?&._-)");
      if (missing.length) {
        const last = missing.pop();
        const msg = missing.length ? missing.join(", ") + " et " + last : last;
        showError("password", "Le mot de passe doit contenir : " + msg);
        isValid = false;
      }
    }

    // Date de naissance
    const birthdate = document.getElementById("birthdate");
    if (!birthdate.value) {
      showError("birthdate", "La date de naissance est obligatoire");
      isValid = false;
    } else {
      const today = new Date();
      const dob = new Date(birthdate.value);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 18) {
        showError("birthdate", "Vous devez avoir au moins 18 ans");
        isValid = false;
      }
    }

    // Type de joueur 
    const playerType = document.getElementById("playerType");
    if (!playerType.value) {
      showError("playerType", "Veuillez sélectionner un type de joueur");
      isValid = false;
    }

    // Acceptation des règles
    const acceptRules = document.getElementById("acceptRules");
    if (!acceptRules || !acceptRules.checked) {
      showError("acceptRules", "Vous devez accepter les règles du site");
      isValid = false;
    }

    if (isValid) {
      alert("Formulaire validé avec succès 🎉");
      clearErrors();
      form.reset();
    }
  });

  function showError(id, message) {
    const errEl = document.getElementById(`error-${id}`);
    if (errEl) {
      errEl.innerText = message;
      errEl.classList.remove("hidden");
    } else {

      const input = document.getElementById(id);
      const container = input
        ? input.closest("div") || input.parentElement
        : null;
      if (container) {
        const p = document.createElement("p");
        p.className = "text-red-500 text-sm mt-1";
        p.innerText = message;
        container.appendChild(p);
      }
    }

    const element = document.getElementById(id);
    if (!element) return;
    if (element.type === "radio" || element.type === "checkbox") {
      element.classList.add("ring-1", "ring-red-500", "rounded-sm");
    } else {
      element.classList.add("border-red-500", "border-1");
      element.setAttribute("aria-invalid", "true");
    }
  }

  function clearErrors() {
    document.querySelectorAll("[id^='error-']").forEach((el) => {
      el.classList.add("hidden");
      el.innerText = "";
    });

    document
      .querySelectorAll(
        ".col-span-12 p.text-red-500, .col-span-6 p.text-red-500, .col-span-4 p.text-red-500"
      )
      .forEach((p) => {
        if (!p.id) p.remove();
      });

    document.querySelectorAll("input, select, textarea").forEach((input) => {
      input.classList.remove(
        "border-red-500",
        "border-1",
        "ring-1",
        "ring-red-500",
        "rounded-sm"
      );
      input.removeAttribute("aria-invalid");
    });
  }
});
