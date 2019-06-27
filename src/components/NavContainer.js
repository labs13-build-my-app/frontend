import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { MenuButtonClose, MenuButtonOpen } from "../custom-styles";

const useStyles = makeStyles(theme => ({
  link: {
    display: "flex",
    alignItems: "center",
    color: "white",
    textDecoration: "none",
    marginLeft: "5px",
    "&:hover": {
      color: "#4085FC",
      borderLeft: "5px solid #4085FC",
      marginLeft: 0
    }
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing(2)
  },
  selectedLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    marginLeft: "5px",
    color: "#F26D5A",
    borderLeft: "5px solid #F26D5A",
    marginLeft: 0
  },
  navBar: {
    top: 0,
    width: "25%",
    position: "fixed",
    minHeight: "100vh",
    textAlign: "left",
    backgroundImage: "linear-gradient(to top right, #001740, #001740)"
  },
  closeNavBar: {
    "@media (max-width: 750px)": {
      display: "none"
    }
  },
  logo: {
    width: " 90%",
    height: "auto",
    padding: "10% 5%"
  }
}));

const auth = new Auth();

const NavContainer = ({
  isSignedIn,
  isToken,
  newUser,
  user,
  role,
  setDisplayNav,
  displayNav
}) => {
  const [nav, setNav] = useState([]);

  const [navIsOpen, setNavIsOpen] = useState(true);

  const [active, setActive] = useState("Home");

  const classes = useStyles();

  useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    const navLinks = [
      { route: `/profile/${user.id}`, label: "Home", icon: "fa fa-home" },
      {
        route: "/projects/proposals",
        label: "View Available Projects",
        icon: "fa fa-project-diagram"
      },
      {
        route: "/developers",
        label: "Find A Developer",
        icon: "fa fa-address-book"
      }
    ];
    if (isToken) {
      navLinks.push(
        {
          route: newUser ? "/signup" : `/profile/${user.id}`,
          label: "My Dashboard",
          state: { id: user.id, role },
          icon: "fa fa-user"
        },
        {
          route: "/",
          state: "logout",
          label: "Logout",
          icon: "fas fa-sign-out-alt"
        }
      );
    } else {
      navLinks.push({
        route: isToken ? "/signup" : "/callback",
        label: "Login/Signup",
        state: "sign on",
        icon: "fa fa-user"
      });
    }
    setNav(navLinks);
  }, [isSignedIn, isToken, newUser, role, user.id]);

  function openNav() {
    setNavIsOpen(true);
    // setDisplayNav(prevState => ({
    //   ...prevState,
    //   nav: false
    // }));
  }
  console.log("Frogsssssssss", displayNav);

  function closeNav() {
    setNavIsOpen(false);
    // setDisplayNav(prevState => ({
    //   ...prevState,
    //   nav: true,
    //   width: "100%",
    //   marginLeft: "0%"
    // }));
  }

  return (
    <>
      <MenuButtonOpen onClick={() => openNav()}>☰</MenuButtonOpen>
      {navIsOpen ? (
        <div className={navIsOpen ? classes.navBar : classes.closeNavBar}>
          <MenuButtonClose onClick={() => closeNav()}>&times;</MenuButtonClose>
          <img
            src={require("../assets/images/logo.png")}
            alt="logo"
            className={classes.logo}
          />
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              listStyleType: "none"
            }}
          >
            {nav.map(link => {
              return (
                <Link
                  key={link.label}
                  className={
                    active === link.label ? classes.selectedLink : classes.link
                  }
                  onClick={() => setActive(link.label)}
                  to={{ pathname: link.route, state: link.state }}
                >
                  <Icon
                    className={clsx(classes.icon, link.icon)}
                    style={{ marginLeft: "40px" }}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </>
  );
};
export default NavContainer;
