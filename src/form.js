import {
  errorMessages,
  formDefaultState,
  formState,
  invalidStyle,
  validStyle,
} from "./constants.js";
import {
  form,
  inputs,
  modalbg,
  submitBtn,
  successMessageContainer,
} from "./domElements.js";
import { debounce } from "./helpers.js";

// Form states:

export let isFormValid = false;

export let isSubscriptionSuccess = false;

// Logic:

/**
 * Removes the error message associated with the specified input element.
 *
 * @param {string} inputId - The ID of the input element.
 * @returns {void}
 */
const removeErrorMessage = (inputId) => {
  const errorMessage = document.getElementById(`${inputId}-error`);
  if (!errorMessage) return;
  errorMessage.remove();
};

/**
 * Disables the submit button by setting the "disabled" attribute and applying styling.
 *
 * @returns {void}
 */
const setSubmitBtnDisabled = () => {
  submitBtn.setAttribute("disabled", true);
  submitBtn.style.cursor = "not-allowed";
  submitBtn.style.backgroundColor = "grey";
};

/**
 * Enables the submit button by removing the "disabled" attribute and applying styling.
 *
 * @returns {void}
 */
const setSubmitBtnEnabled = () => {
  submitBtn.removeAttribute("disabled");
  submitBtn.style.cursor = "pointer";
  submitBtn.style.backgroundColor = "#fe142f";
};

/**
 * Sets the state of the submit button based on the provided isEnabled flag.
 *
 * @param {boolean} isEnabled - Flag indicating whether the submit button should be enabled or disabled.
 * @returns {void}
 */
export const setSubmitBtnState = (isEnabled) =>
  isEnabled ? setSubmitBtnEnabled() : setSubmitBtnDisabled();

/**
 * Resets the form state by restoring the default values, removing error messages, and resetting styling.
 *
 * @returns {void}
 */
export const resetFormState = () => {
  Object.keys(formState).forEach((input) => {
    formState[input] = { ...formDefaultState[input] };
    removeErrorMessage(input);
  });
  Object.values(inputs)?.forEach(
    (input) =>
      !NodeList.prototype.isPrototypeOf(input) && (input.style.border = "none")
  );
  const formData = new FormData(form);
  form.reset();
  isFormValid = false;
  setSubmitBtnState(true);
  if (successMessageContainer()) {
    successMessageContainer().remove();
  }
};

/**
 * Launches the modal by displaying it, scrolling to the top of the page, and disabling body scrolling.
 *
 * @returns {void}
 */
export const launchModal = () => {
  modalbg.style.display = "block";
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
};

/**
 * Closes the modal by hiding it, enabling body scrolling, and resetting the form state.
 *
 * @returns {void}
 */
export const closeModal = () => {
  modalbg.style.display = "none";
  document.body.style.overflow = "auto";
  resetFormState();
};

/**
 * Adds an error message to the specified element with the provided message.
 *
 * @param {object} options - The options object containing the element and inputId.
 * @param {HTMLElement} options.element - The element to which the error message should be added.
 * @param {string} options.inputId - The ID of the input element.
 * @param {string} message - The error message to be displayed.
 * @returns {void}
 */
export const addErrorMessage = ({ element, inputId }, message) => {
  if (!document.getElementById(`${inputId}-error`)) {
    const errorMessage = document.createElement("span");
    errorMessage.id = `${inputId}-error`;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    errorMessage.innerHTML = message;
    if (inputId === "terms") {
      const wrapper = document.createElement("div");
      const br = document.createElement("br");
      wrapper.appendChild(errorMessage);
      wrapper.appendChild(br);
      wrapper.id = `${inputId}-error`;
      element.after(wrapper);
      return;
    }
    errorMessage.id = `${inputId}-error`;
    element.after(errorMessage);
  }
};

/**
 * Sets the value of the isSubscriptionSuccess variable.
 *
 * @param {boolean} value - The value to set for isSubscriptionSuccess.
 * @returns {void}
 */
export const setIsSubscriptionSuccess = (value) =>
  (isSubscriptionSuccess = value);

/**
 * Handles the input change event by updating the form state, performing validation, and applying styles.
 *
 * @param {object} options - The options object containing the input, value, validationFunction, and withStyle properties.
 * @param {object} options.input - The input object containing the element and inputId properties.
 * @param {HTMLElement} options.input.element - The input element.
 * @param {string} options.input.inputId - The ID of the input element.
 * @param {any} value - The new value of the input.
 * @param {function} validationFunction - The validation function to check the input value.
 * @param {boolean} withStyle - Flag indicating whether to apply styling to the input element.
 * @returns {void}
 */
export const handleInputChange = ({
  input: { element, inputId },
  value,
  validationFunction,
  withStyle,
}) => {
  debounce(() => {
    if (inputId === "subscribe") {
      formState[inputId].value = value;
      formState[inputId].isValid = true;
      return;
    }
    const isInputValid = validationFunction(value);

    formState[inputId].value = value;
    formState[inputId].isValid = isInputValid;

    const validStates = Object.values(formState).map((input) =>
      input === "subscribe" ? true : input.isValid
    );

    if (isInputValid) {
      if (withStyle) {
        element.style.border = validStyle;
      }

      removeErrorMessage(inputId);
    } else {
      if (withStyle) {
        element.style.border = invalidStyle;
      }

      addErrorMessage({ element, inputId }, errorMessages[inputId]);
    }
    isFormValid = validStates.every((state) => state);
    setSubmitBtnState(validStates.every((state) => state));
  }, 700)();
};

/**
 * Sets the visibility of the form inputs based on the provided isVisible flag.
 *
 * @param {boolean} isVisible - Flag indicating whether the form inputs should be visible or hidden.
 * @returns {void}
 */
export const setFormInputsVisibility = (isVisible) => {
  const formInputs = form.children;

  Array.from(formInputs).forEach((child, index) => {
    if (index !== form.children.length - 1) {
      isVisible
        ? (child.style.display = "block")
        : (child.style.display = "none");
    }
  });
};
