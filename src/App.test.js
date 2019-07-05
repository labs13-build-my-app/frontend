import React from "react";
import App from "./App";
import ProfileCard from "./newApp/profile/general/ProfileCard";
import ProfileContent from "./newApp/profile/general/ProfileContent";
import ProfileContainer from "./newApp/profile/general/ProfileContainer";
import {
  DeveloperPage,
  ProjectOwnerPage,
  AdminPage
} from "./newApp/profile/roles";
import { MemoryRouter, Route } from "react-router-dom";
import { render, fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import RouteContainer from "./newApp/RouteContainer";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("Testing Project Owner Route", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/project-owner-id-50"]}>
        <App />
      </MemoryRouter>
    );

    getByText(/50/i);
  });

  it("testing ProfileContainer", () => {
    const id = 500;
    const type = "developer";
    const user = {
      id: id,
      firstName: "Oscar",
      lastName: "Ramos",
      email: "oramcar@gmail.com",
      profileIMG: "img.com",
      role: type,
      skills: "one, two, punch",
      devType: "mobile"
    };
    const { getByText } = render(
      <ProfileContainer id={id} component={DeveloperPage}>
        {(id, component) => {
          const UserProfile = component;
          return (
            <ProfileContent id={id}>
              {() => <UserProfile user={user} />}
            </ProfileContent>
          );
        }}
      </ProfileContainer>
    );
    getByText(/500/i);
  });

  it("Display Developer Content", () => {
    const id = 500;
    const type = "developer";
    const role =
      type === "developer"
        ? "Developer"
        : type === "project-owner"
        ? "Project Owner"
        : type === "admin"
        ? "Admin"
        : null;

    const Component =
      type === "developer"
        ? DeveloperPage
        : type === "project-owner"
        ? ProjectOwnerPage
        : type === "admin"
        ? AdminPage
        : null;

    const user = {
      id: id,
      firstName: "Dennis",
      lastName: "Orbison",
      email: "orbison.dennis@gmail.com",
      profileIMG: "img.com",
      role: role
      // skills: "one, two, punch",
      // devType: "mobile"
    };
    const { getByText } = render(
      <MemoryRouter initialEntries={[`/${type}-id-${id}`]}>
        <Component user={user} />
      </MemoryRouter>
    );
    getByText("500");
    getByText("Dennis");
    getByText("Orbison");
    getByText(/orbison.dennis@gmail.com/i);
    getByText(/img.com/i);
    getByText("Developer");
    // getByText(/500/i);
    // getByText(/500/i);
  });

  it("display profile card", () => {
    const user = {
      id: 50,
      firstName: "Dennis",
      lastName: "Orbison",
      email: "orbison.dennis@gmail.com",
      profileIMG: "img.com",
      role: "Developer",
      skills: "React, React Native",
      devType: "Mobile"
    };
    const { getByText } = render(<ProfileCard user={user} />);

    getByText(/50/i);
    getByText("Dennis");
    getByText("Orbison");
    getByText("orbison.dennis@gmail.com");
    getByText(/img.com/i);
    getByText(/Developer/i);
    getByText(/React, React Native/i);
    getByText(/Mobile/i);
  });
});
