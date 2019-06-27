import React from "react";
import { render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import ProjectView from "./ProjectView";

describe("<ProjectView />", () => {
  let propsObj = {
    match: { params: { project_id: "52" } },
    user: { id: "51", firstName: "name" },
    name: "name",
    description: "description",
    budget: "budget",
    dueDate: "dueDate",
    isLoading: false,
    isSignedIn: true,
    role: "role",
    email: "email",
    image_url: "image",
    history,
    firstName: "firstName",
    lastName: "lastName",
    projectOwnerAvatar: "image"
  };
  it("renders without crashing", () => {
    render(<ProjectView {...propsObj} />);
  });
});
