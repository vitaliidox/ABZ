import './successful.scss';
import successImg from "../../assets/success-image.svg";
export const Successful = ({ isSuccessful }) => {
  return (
    <section className="successful">
      <h1 className="successful__title">
        {isSuccessful ? "User successfully registered" : "Registration error!"}
      </h1>

      {isSuccessful && (
        <img
          className="successful__img"
          src={successImg}
          alt="success"
        />
      )}
    </section>
  )
}
