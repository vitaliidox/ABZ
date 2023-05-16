/* eslint-disable no-useless-escape */
import "./form.scss";
import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { Input } from "../../components/Input";
import { InputFile } from "../../components/InputFile";
import { RadioButton } from "../../components/RadioButton";
import { Successful } from "../../components/Successful/Successful";
import { 
  getPositions,
  getToken,
  postFormData,
  getUsers,
} from "../../helpers/API";

export const Form = ({
  setUsersData,
  setUsers,
  setPage,
}) => {
  const [name, setName] = useState("");
  const [helpTextName, setHelpTextName] = useState("Enter name and surname");
  const [isVisitedName, setIsVisitedName] = useState(false);

  const [email, setEmail] = useState("");
  const [helpTextEmail, setHelpTextEmail] = useState("Enter Email");
  const [isVisitedEmail, setIsVisitedEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [helpTextPhone, setHelpTextPhone] = useState("+38 (XXX) XXX - XX - XX");
  const [isVisitedPhone, setIsVisitedPhone] = useState(false);

  const [file, setFile] = useState(null);
  const [isErrorFile, setIsErrorFile] = useState(true);
  const [isVisitedFile, setIsVisitedFile] = useState(false);

  const [position, setPosition] = useState(null);
  const [positionsList, setPositionsList] = useState(null);
  const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
  const [token, setToken] = useState(null);

  const handleSetName = useCallback((arg) => {
    setName(arg);
  }, []);

  const handleSetEmail = useCallback((arg) => {
    setEmail(arg);
  }, []);

  const handleSetPhone = useCallback((arg) => {
    setPhone(arg);
  }, []);

  const handleSetPosition = useCallback((event) => {
    setPosition(event.target.value);
  }, [])


  const setHelperForName = useCallback((arg) => {
    setHelpTextName(arg);
  },[])

  const setHelperForEmail = useCallback((arg) => {
    setHelpTextEmail(arg);
  },[])

  const setHelperForPhone = useCallback((arg) => {
    setHelpTextPhone(arg);
  },[])


  const validateName = useCallback(() => {
    return (
      name.length >= 2
      && name.length <= 60
      && /^[A-Za-z]{1}[A-Za-z\d]/.test(name)
    );
  }, [name]);

  const validateEmail = useCallback(() => {
    const emailRegexRFC2822 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegexRFC2822.test(email);
  }, [email]);

  const validatePhone = useCallback(() => {
    const phoneRegexRFC2822 = /^0\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d$/;
    
    return phoneRegexRFC2822.test(phone);
  }, [phone]);
  

  const getHelperForName = useCallback(() => {
    if (!validateName()) {
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
  },[name])

  const getHelperForEmail = useCallback(() => {
    if (!validateEmail()) {
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
  },[email])

  const getHelperForPhone = useCallback(() => {
    if (!validatePhone()) {
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

      setHelperForPhone("Enter valid Email");
    } else {
      setHelperForPhone("The Phone is verified");
    }
  },[phone])

  const handleBlur = useCallback((e) => {
    switch (e.target.name) {
      case "name":
        setIsVisitedName(true);
        break;
      case "email":
        setIsVisitedEmail(true);
        break;
      case "phone":
      setIsVisitedPhone(true);
      break;
    }
  }, [])


  const setSuccessVisible = useCallback((arg) => {
    setIsVisibleSuccess(arg);
  }, [])

  const isFormFilledOut = useCallback(() => {
    return (
      isVisitedName && validateName()
      && isVisitedEmail && validateEmail()
      && isVisitedPhone && validatePhone()
      && !isErrorFile && isVisitedFile
      && position
    )
  }, [name, phone, email, isErrorFile, isVisitedFile, position])

  const resetForms = useCallback(() => {
    setName("");
    setIsVisitedName(false);
    setEmail("");
    setIsVisitedEmail(false);
    setPhone("")
    setFile(null);
    setIsVisitedFile(null);
    setIsVisitedPhone(false);
    setPosition(null);
  },[])

  const getFormData = useCallback(() => {
    const formData = new FormData();

    if (isFormFilledOut()) {
      formData.append('position_id', position);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', `+38${phone}`);
      formData.append('photo', file);

      return(formData);
    }
  }, [name, phone, email, position, isErrorFile, isFormFilledOut]);

  const getData = useCallback((page) => {
    getUsers(page)
    .then(data => {
     
      setUsersData(data);
      setUsers([...data.users]);
      setPage(1)
    });
  }, [])

  const sendFormData = useCallback(() => {
    console.log(token);

    postFormData(getFormData(), token)
    .then(() => {
      setSuccessVisible(true);
      resetForms();
      getData(1);
    })
  }, [name, phone, email, position, isErrorFile, isFormFilledOut, token])

  const inputsData = [
    {
      name: "name",
      value: name,
      setValue: handleSetName,
      isError: isVisitedName && !validateName(),
      label: "Your name",
      helperText: helpTextName,
      setIsVisited: setIsVisitedName,
      setOnBlur: handleBlur,
    },

    {
      name: "email",
      value: email,
      setValue: handleSetEmail,
      isError: isVisitedEmail && !validateEmail(),
      label: "Email",
      helperText: helpTextEmail,
      setIsVisited: setIsVisitedEmail,
      setOnBlur: handleBlur,
    },

    {
      name: 'phone',
      value: phone,
      setValue: handleSetPhone,
      isError: isVisitedPhone && !validatePhone(),
      label: 'Phone',
      helperText: helpTextPhone,
      setIsVisited: setIsVisitedPhone,
      setOnBlur: handleBlur,
    },
  ]

  useEffect(() => {
    if (isFormFilledOut()) {
      getToken()
      .then(data => {
        setToken(data.token)
      })
    }
  }, [isFormFilledOut])

  useEffect(() => {
    getHelperForName();
  }, [name])

  useEffect(() => {
    getHelperForEmail();
  }, [email])

  useEffect(() => {
    getHelperForPhone();
  }, [phone])

  useEffect(() => {
    let success;

    if (isVisibleSuccess) {
      success = setTimeout(() => {
        setSuccessVisible(false)
      }, 3000);
    }

    return () => clearTimeout(success);
  }, [isVisibleSuccess])

  useEffect(() => {
    getPositions()
    .then(data => setPositionsList(data.positions));
  }, [])

  
  {return isVisibleSuccess ? (
    <Successful />
  ) : (
    <section className="form" id="sign-up">
      <h1 className="form__title">
        Working with POST request
      </h1>

      <div className="form__wrapper">
        {inputsData.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            value={input.value}
            setValue={input.setValue}
      
            isError={input.isError}
            label={input.label}
            helperText={input.helperText}
            setIsVisited={input.setIsVisited}
            setOnBlur={input.setOnBlur}
          />
        ))}

        <form
          className="form__radio-wrapper"
          id="position"
          onClick={handleSetPosition}
        >
          <label className="form__position">
            Select your position
          </label>

          {positionsList && positionsList.map((position) => (
            <RadioButton
              key={position.id}
              id={position.id}
              position={position.name}
            />
          ))}
        </form>
        
        <InputFile
          file={file}
          setFile={setFile}
          isError={isErrorFile}
          setIsError={setIsErrorFile}
          isVisited={isVisitedFile}
          setIsVisited={setIsVisitedFile}
        />

        <Button
          className="button form__button"
          disabled={!isFormFilledOut() && !token}
          onClick={() => {
            sendFormData()
          }}
        >
          submit
        </Button>
      </div>
    </section>
  )}
}
