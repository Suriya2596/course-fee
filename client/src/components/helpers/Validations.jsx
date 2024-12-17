export const validatePassword = (value) => {
  const emailRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const isValidPws = emailRegex.test(value);
  return isValidPws;
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validateName = (value) => {
  const regex = /^[A-Za-z\s]+$/; // Allows alphabets and spaces
  return regex.test(value.trim());
};

export const validateNumber = (value) => {
  if (String(value) === ".") {
    return false;
  } else {
    const regex = /^[0-9]*$/;
    return regex.test(value);
  }
};

export const validateMobileRegex = (value) => {
  const mobileRegex = /^[6789]\d{9}$/;
  return mobileRegex.test(value);
};