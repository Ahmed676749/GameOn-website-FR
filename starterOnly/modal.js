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

// fonction qui valide le prenom
function isFirstNameValid() {
  const isValid = first.value.length >= 2; 
  if(!isValid) {
    displayError(first);
  } else {
    hideError(first);
  } 
  return isValid;
}

// fonction qui valide le nom
function isLastNameValid() {
  const isValid = last.value.length >= 2; 
  if(!isValid) {
    displayError(last);
  } else {
    hideError(last);
  } 
  return isValid;
}

function isFormValid() {
  return isFirstNameValid() && isLastNameValid();
}

// gestion de la soummission
const btnSubmit = document.getElementsByClassName("btn-submit")[0];
btnSubmit.addEventListener("click", function(event) {
  event.preventDefault();
  if(isFormValid()) {
    alert('ok');
  } else {
    alert("no ok");
  }
});

// gestion des erreurs
function displayError(input) {
  const formData = input.parentNode;
  formData.setAttribute("data-error-visible", "true");
  formData.setAttribute("data-error", "Le prénom est invalide");
  formData.setAttribute("data-error", "Le nom est invalide");
}

// cacher les erreurs
function hideError(input) {
  const formData = input.parentNode;
  formData.removeAttribute("data-error-visible");
  formData.removeAttribute("data-error");
}