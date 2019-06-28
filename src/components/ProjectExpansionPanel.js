import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { StatusPill } from "../custom-styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  content: {
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

const ProjectExpansionPanel = ({ component, project }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root} style={{ margin: "15px 10px" }}>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          classes={{ content: classes.content }}
          expandIcon={
            expanded ? (
              <FaMinusCircle color="#F26D5A" />
            ) : (
              <FaPlusCircle color="#4e72b7" />
            )
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <StatusPill status={project.projectStatus}>
            {project.projectStatus}
          </StatusPill>

          <p className={classes.heading}>{project.name}</p>
          <p className={classes.secondaryHeading}>
            {project.plans.length === 0
              ? `No Plans Submitted`
              : project.plans.length === 1
              ? `${project.plans.length} Plan Submitted`
              : `${project.plans.length} Plans Submitted`}
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{component}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
export default ProjectExpansionPanel;
