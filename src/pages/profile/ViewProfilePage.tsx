import { useParams } from "react-router-dom";
import LayoutComponent from "../../components/LayoutComponent";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import PersonalInfoUtility from "../../utilities/profile/PersonalInfoUtility";
import ViewProfileUtility from "../../utilities/profile/ViewProfileUtility";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";
import { getSessionValue } from "../../utilities/SessionStorageUtility";
import PersonalInfo from "./PersonalInfo";
import QuickLinks from "./QuickLinks";
import AcademicInfo from "./AcademicInfo";
import ExperienceInfo from "./ExperienceInfo";
import EmployeeSkillInfo from "./EmployeeSkillInfo";
import React from "react";

const ViewProfilePage = () => {
  const params = useParams();
  const paramId = params.id ? parseInt(params.id, 10) : 0;
  
  return (
    <>
      <div className="py-10 px-48 flex flex-col gap-8">
        <PersonalInfo loginUserId={paramId} />
        <div className="flex gap-8 w-full">
          <QuickLinks />
          <div className="flex flex-col flex-1 gap-5">
            <AcademicInfo loginUserId={paramId} />
            <ExperienceInfo loginUserId={paramId} />
            <EmployeeSkillInfo loginUserId={paramId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfilePage;
