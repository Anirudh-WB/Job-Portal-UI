import React from "react";
import SkillInfoUtility from "../../utilities/profile/SkillInfoUtility";
import { FiEdit2 } from "react-icons/fi";

type Props = { loginUserId: number };

function EmployeeSkillInfo({ loginUserId }: Props) {
  const utility = SkillInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg" id="IT-skills">
            Skill Info
          </h2>

          {/* {hasAccess && ( */}
          <button
            className="font-semibold text-blue-700"
            // onClick={() => {
            //   utility.setSkillToEdit({
            //     name: "",
            //     version: NaN,
            //     lastUsed: NaN,
            //     experience: {
            //       year: 0,
            //       month: 0,
            //     },
            //   });
            //   dispatch(toggleItSkillsModal());
            // }}
          >
            Add details
          </button>
          {/* )} */}
        </div>
        <div className="flex items-center gap-1 flex-wrap text-sm text-gray-700">
          <div className="w-full">
            <div className="border-b w-full flex py-1 text-gray-700">
              <h4 className="w-1/5">Skills</h4>
              <h4 className="w-1/5">Experience</h4>
              {/* {hasAccess && <h4 className="w-1/5"> </h4>} */}
            </div>

            <div className="w-full flex flex-col gap-5 font-medium mt-4">
              {utility.skillInfoViewModel?.map((skill, index) => (
                <div className="w-full flex" key={index}>
                  <p className="w-1/5">{skill.skillName}</p>
                  <p className="w-1/5">${skill.expertLevelName}</p>
                  {/* {hasAccess && ( */}
                  <p className="w-1/5 text-center">
                    <button
                    // onClick={() => {
                    //   utility.setSkillToEdit(skill);
                    //   dispatch(toggleItSkillsModal());
                    // }}
                    >
                      <FiEdit2 className="text-sm text-gray-700" />
                    </button>
                  </p>
                  {/* )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <ItSkillsModal
        skills={utility.itSkills}
        setSkills={utility.setItSkills}
        skillToEdit={utility.skillToEdit}
      /> */}
    </>
  );
}

export default EmployeeSkillInfo;
