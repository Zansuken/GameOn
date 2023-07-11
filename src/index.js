import {
  validateBirthDate,
  validateEmail,
  validateLocation,
  validateNames,
  validateParticipations,
  validateTerms,
} from "./helpers.js";

const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal form
const launchModal = () => {
  modalbg.style.display = "block";
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form
const closeModal = () => {
  modalbg.style.display = "none";
};

// close modal event
closeBtn.addEventListener("click", closeModal);

// Form inputs
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDateInput = document.getElementById("birthdate");
const participationsInput = document.getElementById("quantity");
const locationInput = document.querySelectorAll(".checkbox-input");
const termsInput = document.getElementById("checkbox1");
const termsLabel = termsInput.nextElementSibling;
const subscribeInput = document.getElementById("checkbox2");
const subscribeLabel = subscribeInput.nextElementSibling;
const submitBtn = document.querySelector(".btn-submit");

termsInput.checked = false;

termsLabel.addEventListener(
  "mouseover",
  () => (termsLabel.style.cursor = "pointer")
);

subscribeLabel.addEventListener(
  "mouseover",
  () => (subscribeLabel.style.cursor = "pointer")
);

locationInput.forEach((chosenLocation) => {
  const label = chosenLocation.nextElementSibling;
  label.addEventListener("mouseover", () => (label.style.cursor = "pointer"));
});

let formState = {
  firstName: {
    value: "",
    isValid: false,
  },
  lastName: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  birthDate: {
    value: "",
    isValid: false,
  },
  participations: {
    value: 0,
    isValid: false,
  },
  chosenLocation: {
    value: null,
    isValid: false,
  },
  terms: {
    value: false,
    isValid: false,
  },
  subscribe: {
    value: false,
    isValid: true,
  },
};

const validStyle = "2px solid green";
const invalidStyle = "2px solid red";

const namesErrorMessage =
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const emailErrorMessage = "Veuillez entrer une adresse email valide.";
const birthDateErrorMessage = "Veuillez entrer une date de naissance valide.";
const participationsErrorMessage = "Veuillez entrer un nombre valide.";
const locationErrorMessage = "Veuillez choisir une ville.";
const termsErrorMessage = "Veuillez accepter les termes et conditions.";

const addErrorMessage = ({ element, inputId }, message) => {
  if (!document.getElementById(`${inputId}-error`)) {
    const errorMessage = document.createElement("span");
    // add id to errorMessage
    errorMessage.id = `${inputId}-error`;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "0.8rem";
    errorMessage.style.marginTop = "0.5rem";
    errorMessage.innerHTML = message;
    element.after(errorMessage);
  }
};

const removeErrorMessage = (inputId) => {
  const errorMessage = document.getElementById(`${inputId}-error`);
  if (errorMessage) {
    errorMessage.remove();
  }
};

const {
  firstName,
  lastName,
  email,
  birthDate,
  participations,
  chosenLocation,
  terms,
  subscribe,
} = formState;

const isFormValid = () =>
  firstName.isValid &&
  lastName.isValid &&
  email.isValid &&
  birthDate.isValid &&
  participations.isValid &&
  chosenLocation.isValid &&
  terms.isValid &&
  subscribe.isValid;

const setSubmitBtnDisabled = () => {
  submitBtn.setAttribute("disabled", true);
  submitBtn.style.cursor = "not-allowed";
  submitBtn.style.backgroundColor = "grey";
};

const setSubmitBtnEnabled = () => {
  submitBtn.removeAttribute("disabled");
  submitBtn.style.cursor = "pointer";
  submitBtn.style.backgroundColor = "#fe142f";
};

setSubmitBtnDisabled();

const setSubmitBtnState = (isEnabled) =>
  isEnabled ? setSubmitBtnEnabled() : setSubmitBtnDisabled();

const handleInputChange = ({
  input: { element, inputId },
  value,
  validationFunction,
  withStyle,
}) => {
  if (validationFunction) {
    const isValid = validationFunction(value);
    formState[inputId].isValid = isValid;
    if (withStyle) {
      if (isValid) {
        element.style.border = validStyle;

        switch (inputId) {
          case "firstName":
          case "lastName":
            removeErrorMessage(inputId);
            break;
          case "email":
            removeErrorMessage(inputId);
            break;
          case "birthDate":
            removeErrorMessage(inputId);
            break;
          case "participations":
            removeErrorMessage(inputId);
            break;
          case "chosenLocation":
            removeErrorMessage(inputId);
            break;
          case "terms":
            removeErrorMessage(inputId);
            break;
          default:
            break;
        }
      } else {
        element.style.border = invalidStyle;

        switch (inputId) {
          case "firstName":
          case "lastName":
            addErrorMessage({ element, inputId }, namesErrorMessage);
            break;
          case "email":
            addErrorMessage({ element, inputId }, emailErrorMessage);
            break;
          case "birthDate":
            addErrorMessage({ element, inputId }, birthDateErrorMessage);
            break;
          case "participations":
            addErrorMessage({ element, inputId }, participationsErrorMessage);
            break;
          case "chosenLocation":
            addErrorMessage({ element, inputId }, locationErrorMessage);
            break;
          case "terms":
            addErrorMessage({ element, inputId }, termsErrorMessage);
            break;
          default:
            break;
        }
      }
    }
  }
  formState[inputId].value = value;

  if (isFormValid()) {
    setSubmitBtnState(true);
  } else {
    setSubmitBtnState(false);
  }
};

firstNameInput.addEventListener("input", (e) =>
  handleInputChange({
    input: { element: firstNameInput, inputId: "firstName" },
    value: e.target.value,
    validationFunction: validateNames,
    withStyle: true,
  })
);

lastNameInput.addEventListener("input", (e) =>
  handleInputChange({
    input: { element: lastNameInput, inputId: "lastName" },
    value: e.target.value,
    validationFunction: validateNames,
    withStyle: true,
  })
);

emailInput.addEventListener("input", (e) =>
  handleInputChange({
    input: { element: emailInput, inputId: "email" },
    value: e.target.value,
    validationFunction: validateEmail,
    withStyle: true,
  })
);

birthDateInput.addEventListener("input", (e) =>
  handleInputChange({
    input: { element: birthDateInput, inputId: "birthDate" },
    value: e.target.value,
    validationFunction: validateBirthDate,
    withStyle: true,
  })
);

participationsInput.addEventListener("input", (e) =>
  handleInputChange({
    input: { element: participationsInput, inputId: "participations" },
    value: e.target.value,
    validationFunction: validateParticipations,
    withStyle: true,
  })
);

locationInput.forEach((chosenLocation) =>
  chosenLocation.addEventListener("change", () =>
    handleInputChange({
      input: { element: locationInput, inputId: "chosenLocation" },
      value: locationInput,
      validationFunction: validateLocation,
    })
  )
);

termsInput.addEventListener("change", () => {
  handleInputChange({
    input: { element: termsInput, inputId: "terms" },
    value: termsInput,
    validationFunction: validateTerms,
  });
});

subscribeInput.addEventListener("change", () => {
  handleInputChange({
    input: { element: subscribeInput, inputId: "subscribe" },
    value: subscribeInput,
  });
});
