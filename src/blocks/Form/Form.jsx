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
} from "../../API"
import {
  getHelperForEmail,
  getHelperForName,
  getHelperForPhone,
} from "../../helpers/getHelpers";
import {
  validateName,
  validatePhone,
  validateEmail,
} from "../../helpers/validate";

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
  const [isSuccessful, setIsSuccesful] = useState(true);

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
      isVisitedName && validateName(name)
      && isVisitedEmail && validateEmail(email)
      && isVisitedPhone && validatePhone(phone)
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
    setToken(null);
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
    postFormData(getFormData(), token)
    .then(() => {
      setSuccessVisible(true);
      getData(1);
      resetForms();
    })
    .catch(() => setIsSuccesful(false))
  }, [name, phone, email, position, isErrorFile, isFormFilledOut, token])

  const inputsData = [
    {
      name: "name",
      value: name,
      setValue: handleSetName,
      isError: isVisitedName && !validateName(name),
      label: "Your name",
      helperText: helpTextName,
      setIsVisited: setIsVisitedName,
      setOnBlur: handleBlur,
    },

    {
      name: "email",
      value: email,
      setValue: handleSetEmail,
      isError: isVisitedEmail && !validateEmail(email),
      label: "Email",
      helperText: helpTextEmail,
      setIsVisited: setIsVisitedEmail,
      setOnBlur: handleBlur,
    },

    {
      name: 'phone',
      value: phone,
      setValue: handleSetPhone,
      isError: isVisitedPhone && !validatePhone(phone),
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
    getHelperForName(
      validateName(name),
      name,
      setHelperForName,
    )
  }, [name])

  useEffect(() => {
    getHelperForEmail(
      validateEmail(email),
      setIsVisitedEmail,
      setHelperForEmail,
      email,
    )
  }, [email])

  useEffect(() => {
    getHelperForPhone(
      validatePhone(phone),
      isVisitedPhone,
      setHelperForPhone,
      phone,
    )
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
    <Successful isSuccessful={isSuccessful} />
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
          onClick={() => sendFormData()}
        >
          submit
        </Button>
      </div>
    </section>
  )}
}
