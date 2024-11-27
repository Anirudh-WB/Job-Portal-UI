import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PersonalInfoPage from "./PersonalInfoPage";
import AddressInfoPage from "./AddressInfoPage";
import AcademicInfoPage from "./AcademicInfoPage";
import ExperienceInfoPage from "./ExperienceInfoPage";
import EmploymentInfoPage from "./EmploymentInfoPage";
import EmployeeSkillPage from "./EmployeeSkillPage";
import { getSessionValue } from "../../utilities/SessionStorageUtility";

const ProfilePage = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // const loginUserId : number = getSessionValue("loginUserId");
  //alert(loginUserId);
  let loginUserId: number = Number(getSessionValue("loginUserId"));

  if (isNaN(loginUserId)) {
    // If loginUserId is not a valid number, assign 0 as the default value
    loginUserId = 0;
  }
  return (
    <LayoutComponent>
      <h2>Profile</h2>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Personal information
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <PersonalInfoPage loginUserId={loginUserId} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Address Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddressInfoPage loginUserId={loginUserId} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Academic Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AcademicInfoPage loginUserId={loginUserId} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Experience Info Page
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExperienceInfoPage loginUserId={loginUserId} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Employment Info Page
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmploymentInfoPage loginUserId={loginUserId} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Employee Skill Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmployeeSkillPage loginUserId={loginUserId} />
          </AccordionDetails>
        </Accordion>
      </div>
    </LayoutComponent>
  );
};

export default ProfilePage;
