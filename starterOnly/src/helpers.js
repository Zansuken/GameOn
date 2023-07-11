export const validateNames = (value) => value.length > 2;

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateBirthDate = (date) => {
  const currentDate = new Date();
  const birthDate = new Date(date);
  return currentDate > birthDate;
};

export const validateParticipations = (number) => number >= 0;

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
