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
import ExperienceInfoModalUtility from "../../../utilities/profile/ExperienceInfoModalUtility";
import { Bounce, ToastContainer } from "react-toastify";

type Props = {
  isExperienceInfoOpen: boolean;
  toggleModal: any;
  loginUserId: number;
  experienceInfoId: number;
};

function ExperienceInfoModal({
  isExperienceInfoOpen,
  toggleModal,
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
        onClose={toggleModal}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-1/2 rounded-3xl bg-white p-10">
              <div className="flex justify-end w-full">
                <CloseButton as="button" className="text-xl text-gray-500">
                  <RiCloseLargeFill />
                </CloseButton>
              </div>
              <DialogTitle as="h3" className="text-xl font-medium">
                Experiences
              </DialogTitle>
              <div className="mt-4 flex flex-col gap-4">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="companyName"
                  >
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className={`peer ${
                      utility.errorInfo.find(
                        (err) => err.fieldName === "companyName"
                      )
                        ? "border-red-500 text-red-500"
                        : "border-gray-300"
                    }`}
                    value={utility.experienceInfo.companyName}
                    onChange={utility.onTextFieldChanged}
                  />
                  {utility.errorInfo.find(
                    (error) => error.fieldName === "companyName"
                  ) && (
                    <span className="text-xs text-red-500">
                      {
                        utility.errorInfo.find(
                          (error) => error.fieldName === "companyName"
                        )?.errorMessage
                      }
                    </span>
                  )}
                </div>

                {/* Designation */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="designationId"
                  >
                    Designation <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="designationId"
                    id="designationId"
                    className={`peer ${
                      utility.errorInfo.find(
                        (err) => err.fieldName === "designationId"
                      )
                        ? "border-red-500 "
                        : "border-gray-300"
                    }`}
                    value={utility.experienceInfo.designationId}
                    onChange={utility.onSelectFieldChanged}
                  >
                    <option value="">Select Designation</option>
                    {utility.designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.designationName}
                      </option>
                    ))}
                  </select>
                  {utility.errorInfo.find(
                    (error) => error.fieldName === "designationId"
                  ) && (
                    <span className="text-xs text-red-500">
                      {
                        utility.errorInfo.find(
                          (error) => error.fieldName === "designationId"
                        )?.errorMessage
                      }
                    </span>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isCurrentlyWorking"
                    id="isCurrentlyWorking"
                    checked={utility.experienceInfo.isCurrentlyWorking}
                    onChange={(e) => {
                      utility.onCheckBoxFieldChange(e);
                      if (e.target.checked) {
                        utility.clearErrorForField("endDate");
                      }
                    }}
                    className="w-fit"
                  />
                  <label
                    className="flex items-center gap-2 w-fit"
                    htmlFor="isCurrentlyWorking"
                  >
                    I am currently working in this company
                  </label>
                </div>

                {/* Dates */}
                <div className="flex gap-4">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label
                      className="font-semibold text-sm"
                      htmlFor="startDate"
                    >
                      Start Date <span className="text-red-600">*</span>
                    </label>
                    <DatePicker
                      name="startDate"
                      id="startDate"
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "startDate"
                        )
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                      selected={
                        utility.experienceInfo.startDate
                          ? new Date(
                              utility.experienceInfo.startDate.toString()
                            )
                          : null
                      }
                      onChange={(date: Date | null) => {
                        // Update the date field
                        utility.onDateFieldChanged("startDate", date);

                        // Remove the error if the date is valid
                        if (date) {
                          utility.clearErrorForField("startDate"); // Use this to clear the error
                        }
                      }}
                    />
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "startDate"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "startDate"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-1/2">
                    <label className="font-semibold text-sm" htmlFor="endDate">
                      End Date{" "}
                      {!utility.experienceInfo.isCurrentlyWorking && (
                        <span className="text-red-600">*</span>
                      )}
                    </label>
                    <DatePicker
                      name="endDate"
                      id="endDate"
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "endDate"
                        )
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                      selected={
                        utility.experienceInfo.endDate
                          ? new Date(utility.experienceInfo.endDate.toString())
                          : null
                      }
                      onChange={(date: Date | null) => {
                        // Update the date field
                        utility.onDateFieldChanged("endDate", date);

                        // Remove the error if the date is valid
                        if (date) {
                          utility.clearErrorForField("endDate"); // Use this to clear the error
                        }
                      }}
                      placeholderText={
                        utility.experienceInfo.isCurrentlyWorking
                          ? "Present"
                          : "End Date"
                      }
                      disabled={utility.experienceInfo.isCurrentlyWorking}
                    />
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "endDate"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "endDate"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={utility.experienceInfo.description}
                    onChange={utility.onTextAreaChanged}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-4">
                <button className="text-blue-700" onClick={toggleModal}>
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md"
                  onClick={() => {
                    utility.onExperienceInfoSave().then((res) => {
                      if (res) {
                        toggleModal();
                      }
                    });
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
        containerId="experience__info__toast"
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default ExperienceInfoModal;
