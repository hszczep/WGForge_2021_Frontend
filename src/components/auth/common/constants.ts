export const VALIDATION_ERRORS_MESSAGES = {
  EMAIL: 'Wrong email format - test@test.com',
  PASSWORD: 'At least 5 characters A-Z, a-z, 0-9',
};

export const VALIDATION_REG_EXPS = {
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD: /^(?=.*[A-Za-z0-9])(?=.{5,})/,
};
