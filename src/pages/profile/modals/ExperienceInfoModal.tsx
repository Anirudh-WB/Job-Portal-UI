import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExperienceInfoUtility from "../../../utilities/profile/ExperienceInfoUtility";
import ExperienceInfoModalUtility from "../../../utilities/profile/ExperienceInfoModalUtility";
import { getExperienceInfoByUserIdAsync } from "../../../services/profile/ExperienceInfoService";

type Props = {
  isExperienceInfoOpen: boolean;
  setIsExperienceInfoOpen: any;
  loginUserId: number;
  experienceInfoId: number;
};

function ExperienceInfoModal({
  isExperienceInfoOpen,
  setIsExperienceInfoOpen,
  loginUserId,
  experienceInfoId,
}: Props) {
  const utility = ExperienceInfoModalUtility(loginUserId, experienceInfoId);

  return (
    <>
      <Dialog
        open={isExperienceInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsExperienceInfoOpen((prev: boolean) => !prev)}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-1/2 rounded-3xl bg-white p-10">
              <div className="flex justify-end w-full">
                <CloseButton
                  as="button"
                  className="text-xl text-gray-500"
                  onClick={() => setIsExperienceInfoOpen(false)}
                >
                  <RiCloseLargeFill />
                </CloseButton>
              </div>
              <DialogTitle as="h3" className="text-xl font-medium">
                Experiences
              </DialogTitle>
              <div className="mt-4 flex flex-col gap-4">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={utility.experienceInfo.companyName}
                    onChange={utility.onTextFieldChanged}
                    className="outline-none border rounded-md p-2"
                  />
                  {utility.errorInfo.find(
                    (err) => err.fieldName === "companyName"
                  ) && (
                    <span className="text-red-600 text-sm">
                      Enter company name
                    </span>
                  )}
                </div>

                {/* Designation */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Designation <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="designationId"
                    value={utility.experienceInfo.designationId}
                    onChange={utility.onSelectFieldChanged}
                    className="outline-none border rounded-md p-2"
                  >
                    <option value="">Select Designation</option>
                    {utility.designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.designationName}
                      </option>
                    ))}
                  </select>
                  {utility.errorInfo.find(
                    (err) => err.fieldName === "designationId"
                  ) && (
                    <span className="text-red-600 text-sm">
                      Select designation
                    </span>
                  )}
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isCurrentlyWorking"
                    checked={utility.experienceInfo.isCurrentlyWorking}
                    onChange={utility.onCheckBoxFieldChange}
                    className="form-checkbox"
                  />
                  I am currently working in this company
                </label>

                {/* Dates */}
                <div className="flex gap-4">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="font-semibold text-sm">
                      Start Date <span className="text-red-600">*</span>
                    </label>
                    <DatePicker
                      selected={
                        utility.experienceInfo.startDate
                          ? new Date(
                              utility.experienceInfo.startDate.toString()
                            )
                          : null
                      }
                      onChange={(date: Date | null) =>
                        utility.onDateFieldChanged("startDate", date)
                      }
                      className="outline-none border rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <label className="font-semibold text-sm">
                      End Date{" "}
                      {!utility.experienceInfo.isCurrentlyWorking && (
                        <span className="text-red-600">*</span>
                      )}
                    </label>
                    <DatePicker
                      selected={
                        utility.experienceInfo.endDate
                          ? new Date(utility.experienceInfo.endDate.toString())
                          : null
                      }
                      onChange={(date: Date | null) =>
                        utility.onDateFieldChanged("endDate", date)
                      }
                      placeholderText={
                        utility.experienceInfo.isCurrentlyWorking
                          ? "Present"
                          : "End Date"
                      }
                      className="outline-none border rounded-md p-2 w-full"
                      disabled={utility.experienceInfo.isCurrentlyWorking}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={utility.experienceInfo.description}
                    onChange={utility.onTextAreaChanged}
                    className="outline-none border rounded-md p-2 resize-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="text-blue-700"
                  onClick={() => setIsExperienceInfoOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md"
                  onClick={() => {
                    utility.onExperienceInfoSave();
                    setIsExperienceInfoOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ExperienceInfoModal;
