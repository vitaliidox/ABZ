import "./users.scss";
import Button from '@mui/material/Button';
import { useCallback } from "react";
import { UserCard } from "../../components/UserCard";
import { getUsers } from "../../API";
import { Loader } from "../../components/Loader/Loader";

const cardsDuringLoading = [1, 1, 1, 1, 1, 1];

export const Users = ({
  usersData,
  setUsersData,
  users,
  setUsers,
  page,
  setPage,
  setIsLoading,
  isLoading,
  isError,
  setIsError,
}) => {


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

  const handleClick = useCallback((e) => {
    e.preventDefault()
    setLinksPage((prev) => prev + 1);
    getData(page + 1)
  }, []);

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

         {isLoading && cardsDuringLoading.map((e, ind) => (
          <Loader key={e + ind} />
        ))}
      </ul>

      <Button
        type="button"
        className="users__button button"
        disabled={!usersData?.links?.next_url}
        onClick={handleClick}
      >
        Show more
      </Button>
    </section>
  )
}
