import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import { Bounce, ToastContainer } from "react-toastify";
import SkillInfoUtility from "../../../utilities/profile/SkillInfoUtility";
import SkillInfoModalUtility from "../../../utilities/profile/SkillInfoModalUtility";

type Props = {
  isEmployeeSkillInfoOpen: boolean;
  setIsEmployeeSkillInfoOpen: any;
  loginUserId: number;
  employeeSkillInfoId: number;
};

function EmployeeSkillInfoModal({
  isEmployeeSkillInfoOpen,
  setIsEmployeeSkillInfoOpen,
  loginUserId,
  employeeSkillInfoId,
}: Props) {
  const utility = SkillInfoModalUtility(loginUserId,employeeSkillInfoId);

  return (
    <>
      <Dialog
        open={isEmployeeSkillInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsEmployeeSkillInfoOpen(false)}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-1/2 rounded-3xl bg-white p-10 backdrop-blur-2xl">
              <div className="flex justify-end w-full">
                <CloseButton
                  as="button"
                  className="text-xl text-gray-500"
                  onClick={() => setIsEmployeeSkillInfoOpen(false)}
                >
                  <RiCloseLargeFill />
                </CloseButton>
              </div>
              <DialogTitle as="h3" className="text-xl font-medium">
                IT Skills Info
              </DialogTitle>

              <div className="mt-4 flex flex-1 gap-5">
                {/* Skill Selection */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm">
                    Skills <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="skillId"
                    value={utility.skillInfo.skillId || ""}
                    onChange={utility.onSelectFieldChanged}
                    className="outline-none border rounded-md p-2"
                  >
                    <option value="">Select skills</option>
                    {utility.skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.skillName}
                      </option>
                    ))}
                  </select>
                  {utility.errorInfo.find(
                    (err) => err.fieldName === "skillId"
                  ) && (
                    <span className="text-red-600 text-sm">
                      Select a valid skill
                    </span>
                  )}
                </div>

                {/* Proficiency Level Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Proficiency <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="expertLevelId"
                    value={utility.skillInfo.expertLevelId || ""}
                    onChange={utility.onSelectFieldChanged}
                    className="outline-none border rounded-md p-2"
                  >
                    <option value="">Select proficiency</option>
                    {utility.exportLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.exportLevelName}
                      </option>
                    ))}
                  </select>
                  {utility.errorInfo.find(
                    (err) => err.fieldName === "expertLevelId"
                  ) && (
                    <span className="text-red-600 text-sm">
                      Select a valid proficiency
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button
                  className="text-blue-700"
                  onClick={() => setIsEmployeeSkillInfoOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={() => {
                    utility.onSkillInfoSave();
                    setIsEmployeeSkillInfoOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <ToastContainer
        containerId="employee__skill__info"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default EmployeeSkillInfoModal;
