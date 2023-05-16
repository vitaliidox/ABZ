  export const getHelperForName = (
    validateName,
    name,
    setHelperForName,
  ) => {
    if (!validateName) {
      if (name.length > 60) {
        setHelperForName("The name is too long");
        return;
      } 
      
      if (name.length === 1) {
        setHelperForName("The name is too short");
        return;
      }

      setHelperForName("Enter name and surname");
    } else {
      setHelperForName("The name is verified");
    }
  };

  export const getHelperForEmail = (
    validateEmail,
    isVisitedEmail,
    setHelperForEmail,
    email,
  ) => {
    if (!validateEmail) {
      if (!isVisitedEmail) {
        setHelperForEmail("Enter Email");
        return;
      }

      if (email.length === 0) {
        setHelperForEmail("Enter Email");
        return;
      }
      
      setHelperForEmail("Enter valid Email");
    } else {
      setHelperForEmail("The Email is verified");
    }
  };

  export const getHelperForPhone = (
    validatePhone,
    isVisitedPhone,
    setHelperForPhone,
    phone,
  ) => {
    if (!validatePhone) {
      if (!isVisitedPhone) {
        setHelperForPhone("+38 (XXX) XXX - XX - XX");
        return;
      }

      if (/[a-zA-Z]/.test(phone)) {
        setHelperForPhone("Enter only numbers");
        return;
      }

      if (phone.length > 0 && phone.charAt(0) !== '0') {
        setHelperForPhone("Start the number with '0'");
        return;
      }

      if (phone.length !== 10 && phone.length > 0) {
        setHelperForPhone("Wrong length numbers");
        return;
      }

      setHelperForPhone("Enter phone number");
    } else {
      setHelperForPhone("The phone is verified");
    }
  };


