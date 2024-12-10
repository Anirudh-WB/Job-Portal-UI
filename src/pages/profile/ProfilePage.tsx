import React from "react";
import { getSessionValue } from "../../utilities/SessionStorageUtility";
import AcademicInfo from "./AcademicInfo";
import ExperienceInfo from "./ExperienceInfo";
import PersonalInfo from "./PersonalInfo";
import QuickLinks from "./QuickLinks";
import EmployeeSkillInfo from "./EmployeeSkillInfo";
import { Bounce, ToastContainer } from "react-toastify";

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
    <>
      <div className="py-10 px-48 flex flex-col gap-8">
        <PersonalInfo loginUserId={loginUserId} />
        <div className="flex gap-8 w-full">
          <QuickLinks />
          <div className="flex flex-col flex-1 gap-5">
            <AcademicInfo loginUserId={loginUserId} />
            <ExperienceInfo loginUserId={loginUserId} />
            <EmployeeSkillInfo loginUserId={loginUserId} />
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
