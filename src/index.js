import { errorMessages, formState, invalidStyle } from "./constants.js";
import {
  birthDateInput,
  closeBtn,
  dialogNavLinks,
  editNavLink,
  emailInput,
  firstNameInput,
  form,
  generateSuccessMessage,
  inputs,
  lastNameInput,
  locationInput,
  modalBody,
  modalBtn,
  navDialog,
  navToggleButton,
  outerDialogBg,
  participationsInput,
  submitBtn,
  subscribeInput,
  subscribeLabel,
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

let isNavDialogOpening = false;

navToggleButton.onclick = () => {
  if (isNavDialogOpening) return;
  navDialog.show();
  isNavDialogOpening = true;
  outerDialogBg.style.display = "block";
  outerDialogBg.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
  });
};

outerDialogBg.addEventListener("click", () => {
  navDialog.classList.add("hide");
  outerDialogBg.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 700,
    fill: "forwards",
  });
  setTimeout(() => {
    outerDialogBg.style.display = "none";
  }, 700);
});

dialogNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const currentActiveLink = document.querySelector(
      ".dialog__content__menu li a.active"
    );
    if (currentActiveLink) {
      currentActiveLink.classList.remove("active");
    }
    link.classList.add("active");
    navDialog.classList.add("hide");
    outerDialogBg.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 700,
      fill: "forwards",
    });
    setTimeout(() => {
      outerDialogBg.style.display = "none";
    }, 700);
  });
});

navDialog.addEventListener("webkitAnimationEnd", (event) => {
  if (event.animationName === "hide") {
    navDialog.classList.remove("hide");
    navDialog.close();
    isNavDialogOpening = false;
  }
});

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
    input: { element: termsLabel, inputId: "terms" },
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
  if (isSubscriptionSuccess) {
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

    // Do something with the data when the form is valid
    console.log(data);
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
