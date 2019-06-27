import React from "react";
import { render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import DeveloperList from "./DeveloperList";

describe("<DeveloperList />", () => {
  let propsObj = {
    user: { firstName: "name" },
    history: undefined
  };
  it("renders without crashing", () => {
    render(<DeveloperList {...propsObj} />);
  });
});
