import "./users.scss";
import Button from '@mui/material/Button';
import { useCallback, useState } from "react";
import { UserCard } from "../../components/UserCard";
import { getUsers } from "../../helpers/API";
import { Loader } from "../../components/Loader/Loader";

export const Users = ({
  usersData,
  setUsersData,
  users,
  setUsers,
  page,
  setPage,
  setIsLoading,
  isLoading,
}) => {

  const [isError, setIsError] = useState(false);

  
  const setLinksPage = useCallback((page) => {
    setPage(page);
  },[])

  const getData = useCallback((page) => {
    setIsLoading(true);

    getUsers(page)
    .then(data => {
      setIsError(false);
      setUsersData(data);
      setUsers(prevUsers => [...prevUsers, ...data.users]);
    })
    .catch(() => setIsError(true))
    .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="users" id="users">
      <h1 className="users__title">
        Working with GET request
      </h1>

      {isError && (
        <h2>Something went wrong!</h2>
      )}

      <ul className="users__list">
        {usersData && users?.map((user) => (
          <UserCard
            key={user.id}
            data={user}
          />
        ))}

         {isLoading && [1,1,1,1,1,1].map((e, ind) => (
          <Loader key={e + ind} />
        ))}
      </ul>

      <Button
        type="button"
        className="users__button button"
        disabled={!usersData?.links?.next_url}
        onClick={(e) => {
          e.preventDefault()
          setLinksPage((prev) => prev + 1);
          getData(page + 1)
        }}
      >
        Show more
      </Button>
    </section>
  )
}
