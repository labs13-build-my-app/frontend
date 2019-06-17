import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

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
    color: "#4085FC",
    borderLeft: "5px solid #4085FC",
    marginLeft: 0
  },
  navBar: {
    top: 0,
    width: "305px",
    position: "fixed",
    minHeight: "100vh",
    textAlign: "left",
    backgroundImage: "linear-gradient(to top right, #B1CAF8, #B1CAF8)"
  },
  logo: {
    width: "245px",
    height: "auto",
    margin: "45px 0 75px",
    marginLeft: "25px",
    marginRight: "15px"
  }
}));

const auth = new Auth();

const NavContainer = ({ isSignedIn, isToken, newUser, user, role }) => {
  const [nav, setNav] = useState([]);

  const [active, setActive] = useState("Home");
  //need to set initial active tab to current page. Maybe get current URL path and match to .route in navLinks and then set active to that .label

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
        label: "Projects",
        icon: "fa fa-project-diagram"
      },
      { route: "/developers", label: "Developers", icon: "fa fa-address-book" }
    ];
    if (isToken) {
      navLinks.push(
        {
          route: newUser ? "/signup" : `/profile/${user.id}`,
          label: "Profile",
          state: { id: user.id, role },
          icon: "fa fa-user"
        },
        {
          route: "/",
          state: "logout",
          label: "Logout",
          icon: "fa fa-user-slash"
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
  }, [isSignedIn, isToken, newUser]);

  return (
    <div className={classes.navBar}>
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
  );
};

export default NavContainer;
