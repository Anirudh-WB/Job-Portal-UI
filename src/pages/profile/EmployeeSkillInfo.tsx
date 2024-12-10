import SkillInfoUtility from "../../utilities/profile/SkillInfoUtility";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import EmployeeSkillInfoModal from "./modals/EmployeeSkillInfoModal";

type Props = { loginUserId: number };

function EmployeeSkillInfo({ loginUserId }: Props) {
  const utility = SkillInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg" id="skill-info">
            IT Skills
          </h2>
          <button
            className="font-semibold text-blue-700"
            onClick={() => {
              utility.onAddSkillInfoSave();
            }}
          >
            Add Details
          </button>
        </div>

        {/* Skills List */}
        <div className="flex items-center flex-wrap text-sm text-gray-700">
          <div className="w-full">
            {/* Header Row */}
            <div className="border-b w-full flex py-1 text-gray-700">
              <h4 className="w-1/4">Skills</h4>
              <h4 className="w-1/4 flex justify-center">Experience</h4>
            </div>

            {/* Skills Data */}
            <div className="w-full flex flex-col font-medium">
              {utility.skillInfoViewModel.length > 0 ? (
                utility.skillInfoViewModel.map((skillInfo) => (
                  <div
                    key={skillInfo.id}
                    className="flex items-center w-full py-2 border-b"
                  >
                    {/* Skill Name */}
                    <h4 className="w-1/2">{skillInfo.skillName}</h4>
                    {/* Experience Level */}
                    <h4 className="w-1/2 flex justify-center">
                      {skillInfo.expertLevelName}
                    </h4>

                    {/* Action Buttons */}
                    <div className="w-full flex gap-2 ml-auto">
                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          utility.onSkillInfoEdit(skillInfo.id);
                        }}
                        className="w-1/2 flex items-center justify-center text-gray-700 hover:text-blue-600"
                        aria-label="Edit Skill"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => utility.onSkillInfoDelete(skillInfo.id)}
                        className="w-1/2 flex items-center justify-center text-gray-700 hover:text-red-600"
                        aria-label="Delete Skill"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No skills added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EmployeeSkillInfoModal
        isEmployeeSkillInfoOpen={utility.isEmployeeSkillInfoOpen}
        toggleModal={utility.toggleModal}
        loginUserId={loginUserId}
        employeeSkillInfoId={utility.employeeSkillInfoId}
      />
    </>
  );
}

export default EmployeeSkillInfo;
