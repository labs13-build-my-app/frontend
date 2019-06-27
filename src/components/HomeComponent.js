import React, { useState } from "react";
import { Card, Button } from "../custom-styles";
import Expand from "./Expand";

const HomeComponent = () => {
  const [complete, setComplete] = useState("incomplete");
  return (
    <>
      <Card style={{ flexDirection: "column" }}>
        <h2>Get started with Build My App</h2>
        <p>
          Complete the walkthrough and learn how all the features of Build My
          App come together to form a connected workflow from app idea to app
          creation.
        </p>
        <Expand
          complete={complete}
          heading="How Do I Create a Project"
          //   subheading="See More"
          component={
            <>
              <img
                src="../../assets/images/createproject.png"
                alt="create a project"
              />
              <Button onClick={() => setComplete("completed")}>
                Mark Complete
              </Button>
            </>
          }
        />
      </Card>
    </>
  );
};
export default HomeComponent;
