import "./App.css";
import "./helpers/styles.scss";
import { useState, useMemo} from "react";

import { Header } from "./blocks/Header";
import { Users } from "./blocks/Users";
import { Form } from "./blocks/Form";
import { getUsers } from "./helpers/API";


function App() {
  const [usersData, setUsersData] = useState(null);
  const [users, setUsers] = useState(null)
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  useMemo(() => {
    setIsLoading(true);
    
    getUsers(1)
    .then(data => {
      setUsersData(data);
      setUsers([...data.users]);
    })
    .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <Header />

      <Users 
        usersData={usersData}
        setUsersData={setUsersData}
        users={users}
        setUsers={setUsers}
        page={page}
        setPage={setPage}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />

      <Form
        usersData={usersData}
        setUsersData={setUsersData}
        users={users}
        setUsers={setUsers}
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default App
