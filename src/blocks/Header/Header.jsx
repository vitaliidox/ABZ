import "./header.scss";
import Logo from "../../assets/logo/Logo.svg";

import { Button } from "@mui/material";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__wrapper-nav">
          <a
            href="/ABZ/"
            className="header__logo-link"
          >
            <img
              src={Logo}
              alt="logo"
              className="header__logo"
            />
          </a>

          <nav className="header__navigation">
            <Button className="button" href="#users">
              Users
            </Button>

            <Button className="button" href="#sign-up">
              Sign up
            </Button>
          </nav>
        </div>
      </div>
      
      <section className="header__banner">
        <div className="header__content">
          <h1 className="header__title">
            Test assignment for front-end developer
          </h1>

          <p className="header__description">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>

          <Button className="button" href="#sign-up">
            Sign up
          </Button>
        </div>
      </section>
    </header>
  )
}
