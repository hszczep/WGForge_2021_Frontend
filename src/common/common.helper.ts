export const getUserNameFromEmail = (email: string) => email.substring(0, email.indexOf('@'));

const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
export const capitalizeFirstLetter = (string: string) =>
  string.charAt(FIRST_INDEX).toUpperCase() + string.slice(SECOND_INDEX);
