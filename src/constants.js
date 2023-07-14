export const validStyle = "2px solid green";
export const invalidStyle = "2px solid red";

const namesErrorMessage =
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const emailErrorMessage = "Veuillez entrer une adresse email valide.";
const birthDateErrorMessage = "Veuillez entrer une date de naissance valide.";
const participationsErrorMessage = "Veuillez entrer un nombre valide.";
const locationErrorMessage = "Veuillez choisir une ville.";
const termsErrorMessage = "Veuillez accepter les termes et conditions.";

export const errorMessages = {
  firstName: namesErrorMessage,
  lastName: namesErrorMessage,
  email: emailErrorMessage,
  birthDate: birthDateErrorMessage,
  participations: participationsErrorMessage,
  chosenLocation: locationErrorMessage,
  terms: termsErrorMessage,
};

export const formDefaultState = {
  firstName: {
    id: "firstName",
    value: "",
    isValid: false,
  },
  lastName: {
    id: "lastName",
    value: "",
    isValid: false,
  },
  email: {
    id: "email",
    value: "",
    isValid: false,
  },
  birthDate: {
    id: "birthDate",
    value: "",
    isValid: false,
  },
  participations: {
    id: "participations",
    value: 0,
    isValid: false,
  },
  chosenLocation: {
    id: "chosenLocation",
    value: null,
    isValid: false,
  },
  terms: {
    id: "terms",
    value: false,
    isValid: false,
  },
  subscribe: {
    id: "subscribe",
    value: false,
    isValid: true,
  },
};

export const formState = {
  firstName: {
    id: "firstName",
    value: "",
    isValid: false,
  },
  lastName: {
    id: "lastName",
    value: "",
    isValid: false,
  },
  email: {
    id: "email",
    value: "",
    isValid: false,
  },
  birthDate: {
    id: "birthDate",
    value: "",
    isValid: false,
  },
  participations: {
    id: "participations",
    value: 0,
    isValid: false,
  },
  chosenLocation: {
    id: "chosenLocation",
    value: null,
    isValid: false,
  },
  terms: {
    id: "terms",
    value: false,
    isValid: false,
  },
  subscribe: {
    id: "subscribe",
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
} = formState;
