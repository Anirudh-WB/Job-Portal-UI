import React from "react";
import { getSessionValue } from "../../utilities/SessionStorageUtility";
import AcademicInfo from "./AcademicInfo";
import ExperienceInfo from "./ExperienceInfo";
import PersonalInfo from "./PersonalInfo";
import QuickLinks from "./QuickLinks";
import EmployeeSkillInfo from "./EmployeeSkillInfo";
import { Bounce, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  let loginUserId: number = Number(getSessionValue("loginUserId"));
  const params = useParams();
  const paramId = params.id ? parseInt(params.id, 10) : 0;

  if (isNaN(loginUserId)) {
    // If loginUserId is not a valid number, assign 0 as the default value
    loginUserId = 0;
  }

  const removeCUD = () => {
    const userId = getSessionValue("loginUserId");
    const userRole = getSessionValue("userRole");
    return userId === paramId && userRole === "jobseaker";
  };
  const isRemoveCUD = removeCUD();
  return (
    <>
      <div className="py-10 px-48 flex flex-col gap-8">
        <PersonalInfo
          loginUserId={paramId ? paramId : loginUserId}
          isRemoveCUD={isRemoveCUD}
        />
        <div className="flex gap-8 w-full">
          <QuickLinks />
          <div className="flex flex-col flex-1 gap-5">
            <AcademicInfo
              loginUserId={paramId ? paramId : loginUserId}
              isRemoveCUD={isRemoveCUD}
            />
            <ExperienceInfo
              loginUserId={paramId ? paramId : loginUserId}
              isRemoveCUD={isRemoveCUD}
            />
            <EmployeeSkillInfo
              loginUserId={paramId ? paramId : loginUserId}
              isRemoveCUD={isRemoveCUD}
            />
          </div>
        </div>
      </div>

      <ToastContainer
        // containerId="personal__info__toast"
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default ProfilePage;
