export const getUserNameFromEmail = (email: string) => email.substring(0, email.indexOf('@'));

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
