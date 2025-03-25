/**
 * Checks if the given text is not empty.
 *
 * @param {string} text - The text to be checked.
 * @returns {boolean} - Returns true if the text is not empty, otherwise false.
 */
export const isTextNotEmpty = (text) => {
  if (text && text.trim().length > 0) {
    return true;
  }
  return false;
};

/**
 * Validates an email address using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email = email.trim();
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};
