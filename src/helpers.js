import { locationInput, termsInput } from "./domElements.js";

const isEmpty = (value) => value.trim() === "";

export const validateNames = (value) => value.length > 2 && !isEmpty(value);

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && !isEmpty(email);
};

export const validateBirthDate = (date) => {
  const currentDate = new Date();
  const birthDate = new Date(date);
  return currentDate > birthDate && !isEmpty(date);
};

export const validateParticipations = (number) =>
  number >= 0 && !isEmpty(number);

export const validateLocation = () => {
  let checked = false;
  locationInput.forEach((chosenLocation) => {
    if (chosenLocation.checked) {
      checked = true;
    }
  });
  return checked;
};

export const validateTerms = () => termsInput.checked;
