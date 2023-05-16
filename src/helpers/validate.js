/* eslint-disable no-useless-escape */
export const validateName = (name) => {
  return (
    name.length >= 2
    && name.length <= 60
    && /^[A-Za-z]{1}[A-Za-z\d]/.test(name)
  );
};

export const validateEmail = (email) => {
  const emailRegexRFC2822 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegexRFC2822.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegexRFC2822 = /^0\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d$/;
  
  return phoneRegexRFC2822.test(phone);
};
