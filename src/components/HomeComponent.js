import React, { useState } from "react";
import { Card, Button } from "../custom-styles";
import Expand from "./Expand";
import { images } from "./Images";
const HomeComponent = () => {
  const setTutorial = () => {
    !localStorage.getItem("ProjectOwnerTutorial") &&
      localStorage.setItem("ProjectOwnerTutorial", "incomplete");
    !localStorage.getItem("DeveloperTutorial") &&
      localStorage.setItem("DeveloperTutorial", "incomplete");
  };
  setTutorial();
  console.log(localStorage.getItem("ProjectOwnerTutorial"));
  const [projectOwnerComplete, setProjectOwnerComplete] = useState(
    localStorage.getItem("ProjectOwnerTutorial")
  );
  const [developerComplete, setDeveloperComplete] = useState(
    localStorage.getItem("DeveloperTutorial")
  );
  const [close, setClose] = useState(false);

  return (
    <>
      <Card style={{ flexDirection: "column" }}>
        <h2>Getting started with Build My App</h2>
        <p>
          Complete the walkthrough and learn how all the features of Build My
          App come together to form a connected workflow from app idea to app
          creation.
        </p>
        <Expand
          close={close}
          complete={projectOwnerComplete}
          heading="Getting Started as a Project Owner"
          //   subheading="See More"
          component={
            <>
              {/* <h3>
                On your dashboard below your profile card there is an option to
                "Create a Project"
              </h3> */}
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "30%", padding: "10px" }}>
                  On your dashboard below your profile card there is an option
                  to "Create a Project"
                </h3>
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.createproject}
                    alt="create a project"
                  />
                </div>
              </Card>

              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.projectdetails}
                    alt="add details"
                  />
                </div>
                <h3 style={{ width: "30%", padding: "10px" }}>
                  Here you will fill out the details of your project.{" "}
                  <span style={{ color: "red" }}>
                    *Hint for the best results add as much detail as possible,{" "}
                  </span>
                  this will give your project the best chance at finding a great
                  developer.
                </h3>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "30%", padding: "10px" }}>
                  Now on your dashboard a project card will appear with the name
                  of your project, its current status as well as how many plans
                  have been submitted
                </h3>
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.projectcard}
                    alt="create a project"
                  />
                </div>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.acceptplan}
                    alt="add details"
                  />
                </div>
                <h3 style={{ width: "30%", padding: "10px" }}>
                  Once once a developer submits a plan for your project, you can
                  accept or decline their plan.
                  {/* To do so, click on your project
                  card to expand it, then click on your expanded card to be
                  brought to your project page. */}
                </h3>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "30%", padding: "10px" }}>
                  Once you accept a plan from a developer the status of your
                  project will update
                </h3>
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.projectinprogress}
                    alt="create a project"
                  />
                </div>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.markprojectcompleted}
                    alt="add details"
                  />
                </div>
                <h3 style={{ width: "30%", padding: "10px" }}>
                  After a developer has finished the job, you will receive an
                  email update. You can now inspect their work and update your
                  project to complete.
                </h3>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "70%", padding: "10px" }}>
                  After your project is completed you will be able to leave
                  feedback about your developer
                </h3>
                <div style={{ width: "30%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.addfeedback}
                    alt="create a project"
                  />
                </div>
              </Card>

              <div>
                <Button
                  backgroundColor="#F26D5A"
                  center
                  large
                  color="white"
                  onClick={() => {
                    setProjectOwnerComplete("completed");
                    localStorage.removeItem("ProjectOwnerTutorial");
                    localStorage.setItem("ProjectOwnerTutorial", "completed");
                    setClose(!close);
                  }}
                >
                  Complete Module
                </Button>
              </div>
            </>
          }
        />
        <Expand
          close={close}
          complete={developerComplete}
          heading="Getting Started as a Developer"
          //   subheading="See More"
          component={
            <>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "70%", padding: "10px" }}>
                  On your sidebar, you have a list of menu options. To find a
                  project that fits your needs, click "View Available Projects"
                </h3>
                <div style={{ width: "30%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.menuoptions}
                    alt="create a project"
                  />
                </div>
              </Card>

              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <div style={{ width: "70%" }}>
                  <video
                    style={{ maxWidth: "100%", height: "auto" }}
                    autoPlay
                    loop
                  >
                    <source src={images.walkthrough} type="video/mp4" />
                  </video>
                </div>
                <h3 style={{ width: "30%", padding: "10px" }}>
                  Once you find a project that you like, you can reach out
                  directly to the Project Owner or submit your plan directly on
                  the project page.
                </h3>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "30%", padding: "10px" }}>
                  You can view a list of all of your plans on your dashboard,
                  here is where you will be able keep track of your ongoing
                  projects
                </h3>
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.planslist}
                    alt="create a project"
                  />
                </div>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.selectedplan}
                    alt="create a project"
                  />
                </div>
                <h3 style={{ width: "30%", padding: "10px" }}>
                  If a Project Owner selects your plan, the status on your plan
                  card will update to "selected"
                </h3>
              </Card>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px"
                }}
              >
                <h3 style={{ width: "30%", padding: "10px" }}>
                  After your work is completed, you can click on the plan card
                  to update the status by marking it as completed and notify the
                  Project Owner
                </h3>
                <div style={{ width: "70%" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={images.selectedplanextended}
                    alt="create a project"
                  />
                </div>
              </Card>

              <div>
                <Button
                  backgroundColor="#F26D5A"
                  center
                  large
                  color="white"
                  onClick={() => {
                    setDeveloperComplete("completed");
                    localStorage.removeItem("DeveloperTutorial");
                    localStorage.setItem("DeveloperTutorial", "completed");
                    setClose(!close);
                  }}
                >
                  Complete Module
                </Button>
              </div>
            </>
          }
        />
      </Card>
    </>
  );
};
export default HomeComponent;
