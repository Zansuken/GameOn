export const validStyle = "2px solid green";
export const invalidStyle = "2px solid red";

export const namesErrorMessage =
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
export const emailErrorMessage = "Veuillez entrer une adresse email valide.";
export const birthDateErrorMessage =
  "Veuillez entrer une date de naissance valide.";
export const participationsErrorMessage = "Veuillez entrer un nombre valide.";
export const locationErrorMessage = "Veuillez choisir une ville.";
export const termsErrorMessage = "Veuillez accepter les termes et conditions.";

export const formDefaultState = {
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

export const {
  firstName,
  lastName,
  email,
  birthDate,
  participations,
  chosenLocation,
  terms,
  subscribe,
} = formDefaultState;
