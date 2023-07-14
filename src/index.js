import { errorMessages, formState, invalidStyle } from "./constants.js";
import {
  birthDateInput,
  closeBtn,
  editNavLink,
  emailInput,
  firstNameInput,
  form,
  generateSuccessMessage,
  inputs,
  lastNameInput,
  locationInput,
  modal,
  modalBody,
  modalBtn,
  modalbg,
  participationsInput,
  submitBtn,
  subscribeInput,
  subscribeLabel,
  successMessageContainer,
  termsInput,
  termsLabel,
} from "./domElements.js";
import {
  addErrorMessage,
  closeModal,
  handleInputChange,
  isFormValid,
  isSubscriptionSuccess,
  launchModal,
  resetFormState,
  setFormInputsVisibility,
  setIsSubscriptionSuccess,
  setSubmitBtnState,
} from "./form.js";
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

// Events listeners:

editNavLink?.addEventListener("click", editNav);

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
      input: {
        element: chosenLocation.parentElement,
        inputId: "chosenLocation",
      },
      value: locationInput,
      validationFunction: validateLocation,
    })
  )
);

termsInput.addEventListener("change", () => {
  handleInputChange({
    input: { element: termsInput, inputId: "terms" },
    value: termsInput.checked,
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
  // TODO: fix the success message container not being removed
  console.log(successMessageContainer);
  if (isSubscriptionSuccess) {
    // successMessageContainer.remove();
    closeModal();
    setFormInputsVisibility(true);
    setIsSubscriptionSuccess(false);
    setSubmitBtnState(true);
    submitBtn.setAttribute("value", "C'est parti");
    form.reset();
    resetFormState();
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  if (isFormValid) {
    setIsSubscriptionSuccess(true);

    setFormInputsVisibility(false);

    submitBtn.setAttribute("value", "Fermer");

    generateSuccessMessage(modalBody);
  } else {
    setIsSubscriptionSuccess(false);
    setSubmitBtnState(false);
    Object.values(formState).forEach(({ isValid, id }) => {
      switch (id) {
        case "chosenLocation":
          if (!isValid) {
            addErrorMessage(
              { element: locationInput[0].parentElement, inputId: id },
              errorMessages[id]
            );
          }
          break;
        case "terms":
          if (!isValid) {
            addErrorMessage(
              { element: termsLabel, inputId: id },
              errorMessages[id]
            );
          }

        default:
          if (!isValid) {
            inputs[`${id}Input`].style.border = invalidStyle;
            addErrorMessage(
              { element: inputs[`${id}Input`], inputId: id },
              errorMessages[id]
            );
          }
          break;
      }
    });
  }
});
