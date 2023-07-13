import {
  birthDate,
  birthDateErrorMessage,
  chosenLocation,
  email,
  emailErrorMessage,
  firstName,
  formDefaultState,
  invalidStyle,
  lastName,
  locationErrorMessage,
  namesErrorMessage,
  participations,
  participationsErrorMessage,
  subscribe,
  terms,
  termsErrorMessage,
  validStyle,
} from "./constants.js";
import {
  birthDateInput,
  closeBtn,
  emailInput,
  firstNameInput,
  form,
  lastNameInput,
  locationInput,
  modalBtn,
  modalbg,
  participationsInput,
  submitBtn,
  subscribeInput,
  subscribeLabel,
  termsInput,
  termsLabel,
} from "./domElements.js";
import {
  validateBirthDate,
  validateEmail,
  validateLocation,
  validateNames,
  validateParticipations,
  validateTerms,
} from "./helpers.js";

export const editNav = () => {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// launch modal form
export const launchModal = () => {
  modalbg.style.display = "block";
};

// close modal form
export const closeModal = () => {
  modalbg.style.display = "none";
};

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

const setSubmitBtnState = (isEnabled) =>
  isEnabled ? setSubmitBtnEnabled() : setSubmitBtnDisabled();

export const handleInputChange = ({
  input: { element, inputId },
  value,
  validationFunction,
  withStyle,
}) => {
  if (validationFunction) {
    const isValid = validationFunction(value);
    formDefaultState[inputId].isValid = isValid;
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
  formDefaultState[inputId].value = value;
};

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeBtn.addEventListener("click", closeModal);

termsLabel.addEventListener("mouseover", () => {
  termsLabel.style.cursor = "pointer";
});

subscribeLabel.addEventListener("mouseover", () => {
  subscribeLabel.style.cursor = "pointer";
});

locationInput.forEach((chosenLocation) => {
  const label = chosenLocation.nextElementSibling;
  label.addEventListener("mouseover", () => {
    label.style.cursor = "pointer";
  });
});

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isFormValid()) {
    setSubmitBtnState(true);
  } else {
    setSubmitBtnState(false);
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
});
