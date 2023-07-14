import { termsInput } from "./domElements.js";

// Helpers functions:

/**
 * Checks if a value is empty (contains only whitespace characters).
 *
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 */
const isEmpty = (value) => value.trim() === "";

/**
 * Validates a name value by checking if it has a length greater than 2 and is not empty.
 *
 * @param {string} value - The name value to validate.
 * @returns {boolean} - True if the name is valid, false otherwise.
 */
export const validateNames = (value) => value.length > 2 && !isEmpty(value);

/**
 * Validates an email address by checking if it matches the email format and is not empty.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && !isEmpty(email);
};

/**
 * Validates a birth date by checking if it is a valid date and is not empty.
 *
 * @param {string} date - The birth date to validate.
 * @returns {boolean} - True if the birth date is valid, false otherwise.
 */
export const validateBirthDate = (date) => {
  const currentDate = new Date();
  const birthDate = new Date(date);
  return currentDate > birthDate && !isEmpty(date);
};

/**
 * Validates the number of participations by checking if it is a non-negative number and is not empty.
 *
 * @param {number} number - The number of participations to validate.
 * @returns {boolean} - True if the number of participations is valid, false otherwise.
 */
export const validateParticipations = (number) =>
  number >= 0 && !isEmpty(number);

/**
 * Validates the selected locations by checking if at least one location is checked.
 *
 * @param {object} locations - The locations object containing the checked property for each location.
 * @returns {boolean} - True if at least one location is checked, false otherwise.
 */
export const validateLocation = (locations) =>
  Object.values(locations).some((location) => location.checked);

/**
 * Validates the terms input by checking if it is checked.
 *
 * @returns {boolean} - True if the terms input is checked, false otherwise.
 */
export const validateTerms = () => termsInput.checked;

/**
 * Creates a debounced version of a function that delays its execution until after a specified delay.
 *
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} - The debounced version of the function.
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
