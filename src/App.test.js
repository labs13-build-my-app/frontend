import React from "react";
import App from "./App";
import ProfileCard from "./newApp/profile/general/ProfileCard";
import ProfileContainer from "./newApp/profile/general/ProfileContainer";
import { DeveloperPage } from "./newApp/profile/roles/DeveloperPage";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("hello world", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/project-owner-id-50"]}>
        <App />
      </MemoryRouter>
    );

    getByText(/50/i);
  });

  it("testing ProfileContainer", () => {
    const id = 50;
    const { getByText } = render(
      <MemoryRouter initialEntries={[`developer-id-${id}`]}>
        <ProfileContainer id={id} component={DeveloperPage} />
      </MemoryRouter>
    );

    getByText(/50/i);
  });

  // it("display profile card", () => {
  //   const user = {
  //     id: 50,
  //     firstName: "Dennis",
  //     lastName: "Orbison",
  //     email: "orbison.dennis@gmail.com",
  //     profileIMG: "img.com",
  //     role: "Developer",
  //     skills: "React, React Native",
  //     devType: "Mobile"
  //   };
  //   const { getByText } = render(<ProfileCard user={user} />);

  //   getByText(/50/i);
  //   getByText("Dennis");
  //   getByText("Orbison");
  //   getByText("orbison.dennis@gmail.com");
  //   getByText(/img.com/i);
  //   getByText(/Developer/i);
  //   getByText(/React, React Native/i);
  //   getByText(/Mobile/i);
  // });
});
