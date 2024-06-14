function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// récupérer la span close
const btnClose = document.getElementsByClassName("close")[0]; // [0] = before et [1] = after

// fermeture de la modal lors du clic sur le bouton span close
btnClose.onclick = function() {
  modalbg.style.display = "none";
}

// récupérer l'info du prénom
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const quantity = document.getElementById("quantity");
const radioBtn = document.getElementsByName("location");
const checkbox = document.getElementById("checkbox1");
const contactForm = document.getElementById("contactForm");


// fonction qui valide le prenom
function isFirstNameValid() {
  const isValid = first.value.length >= 2; 
  if(!isValid) {
    displayError(first, "le prénom est invalide");
  } else {
    hideError(first);
  } 
  return isValid;
}

// fonction qui valide le nom
function isLastNameValid() {
  const isValidLast = last.value.length >= 2; 
  if(!isValidLast) {
    displayError(last, "le nom est invalide");
  } else {
    hideError(last);
  } 
  return isValidLast;
}

// fonction qui valide l'email
function isEmailValid() {
  const emailSchema = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailSchema.test(email.value)) {
    displayError(email, "L'email est invalide");
    return false;
  } else {
    hideError(email);
    return true;
  } 
}


// fonction qui valide la date
function validateBirthdate(birthdate) {
  if(!birthdate.value) {
    displayError(birthdate, "La date de naissance est obligatoire");
    return false;
  }

  const birthInput = new Date(birthdate.value);
  const today = new Date();
  const age = today.getFullYear() - birthInput.getFullYear();
  const monthDifference = today.getMonth() - birthInput.getMonth();
  const dayDifference = today.getDate() - birthInput.getDate();

  // Vérifier si la date est dans le futur
  if (birthInput > today) {
      displayError(birthdate, "La date de naissance ne peut pas être dans le futur.");
      return false;
  }

  // Vérifier si la date est valide
  if (isNaN(birthInput.getTime())) {
      displayError(birthdate, "La date de naissance est invalide.");
      return false;
  }

  // Vérifier l'âge (par exemple, 18 ans)
  if (age < 18 || (age === 18 && monthDifference < 0) || (age === 18 && monthDifference === 0 && dayDifference < 0)) {
      displayError(birthdate, "Vous devez avoir au moins 18 ans.");
      return false;
  }

  hideError(birthdate);
  return true;
}

// fonction qui vérifie si c'est un nombre
function isQuantityValid() {
  const quantityValue = quantity.value;
  if(isNaN(quantityValue)) {
    displayError(quantity, "Ce n'est pas un nombre")
  } else {
    hideError(quantity);
    return true;
  }
}

// fonction qui vérifie si un bouton radio est séectionné
function isRadioSelected(){
  let selected = false;

  for (const radio of radioBtn) {
    if(radio.checked){
      selected = true;
      break;
    }
  }

  if(!selected){
    displayError(radioBtn[0], "Veuillez sélectionner un choix")
  }else{
    hideError(radioBtn[0]);
    return true;
  }

}

// fonction qui vérifie si la case condition est cochée
function isConditionChecked(){
  const isChecked = checkbox.checked;
  if(!isChecked){
    displayError(checkbox, "Veuillez accepter les conditions")
  }else{
    hideError(checkbox);
    return true;
  }
}

// fonction qui gère l'affichage du message de succès
function displaySuccessMessage() {
  const successContent = document.createElement("div");
  const successMessage = document.createElement("span");
  successMessage.innerHTML = "Merci pour votre inscription";
  const successBtn = document.createElement("input");
  successBtn.setAttribute("type", "button");
  successBtn.classList.add("button", "btn-submit");
  successBtn.value = "Fermer";
  successContent.appendChild(successMessage);
  successContent.appendChild(successBtn);
  contactForm.replaceWith(successContent);
}

function isFormValid() {
  const _isFirstValid = isFirstNameValid();
  const _isLastNameValid = isLastNameValid();
  const _isEmailValid = isEmailValid();
  const _validateBirthdate = validateBirthdate(birthdate);
  const _isQuantityValid = isQuantityValid();
  const _isRadioSelected = isRadioSelected();
  const _isConditionChecked = isConditionChecked();
  return _isFirstValid && _isLastNameValid && _isEmailValid && _validateBirthdate && _isQuantityValid && _isRadioSelected && _isConditionChecked;
}

// gestion de la soummission
const btnSubmit = document.getElementsByClassName("btn-submit")[0];
btnSubmit.addEventListener("click", function(event) {
  event.preventDefault();
  if(isFormValid()) {
    displaySuccessMessage();
  }
});

// gestion des erreurs
function displayError(input, errorMessage) {
  const formData = input.parentNode;
  formData.setAttribute("data-error-visible", "true");
  formData.setAttribute("data-error", errorMessage);
}

// cacher les erreurs
function hideError(input) {
  const formData = input.parentNode;
  formData.removeAttribute("data-error-visible");
  formData.removeAttribute("data-error");
}