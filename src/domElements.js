// DOM elements:

export const editNavLink = document.querySelector(".edit-nav-link");
export const navToggleButton = document.querySelector(".toggle-nav");
export const navDialog = document.querySelector(".dialog");
export const dialogNavLinks = document.querySelectorAll(
  ".dialog__content__menu li a"
);
export const outerDialogBg = document.querySelector(".outer-dialog-bg");
export const modalbg = document.querySelector(".bground");
export const modal = document.querySelector(".content");
export const modalBody = document.querySelector(".modal-body");
export const modalBtn = document.querySelectorAll(".modal-btn");
export const formData = document.querySelectorAll(".formData");
export const closeBtn = document.querySelector(".close");
export const firstNameInput = document.getElementById("first");
export const lastNameInput = document.getElementById("last");
export const emailInput = document.getElementById("email");
export const birthDateInput = document.getElementById("birthdate");
export const participationsInput = document.getElementById("quantity");
export const locationInput = document.querySelectorAll("#radioGroup > input");
export const termsInput = document.getElementById("terms");
export const termsLabel = termsInput.nextElementSibling;
export const subscribeInput = document.getElementById("newsLetters");
export const subscribeLabel = subscribeInput.nextElementSibling;
export const inputs = {
  firstNameInput,
  lastNameInput,
  emailInput,
  birthDateInput,
  participationsInput,
  locationInput,
  termsInput,
  subscribeInput,
};
export const submitBtnContainer = document.querySelector(
  ".btn-container-submit"
);
export const submitBtn = document.querySelector(".btn-submit");
export const form = document.getElementById("form");
/**
 * Generates a success message and adds it to the form.
 *
 * @returns {void}
 */
export const generateSuccessMessage = () => {
  const message = document.createElement("p");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("success-message-container");
  message.classList.add("success-message");
  message.textContent = "Merci pour votre inscription";
  submitBtnContainer.style = "flex: 0";
  messageContainer.appendChild(message);
  form.prepend(messageContainer);
};
export const successMessage = document.querySelector(".success-message");
export const successMessageContainer = () =>
  document.querySelector(".success-message-container");
