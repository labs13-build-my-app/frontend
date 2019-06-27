import React from "react";
import { render, fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});
