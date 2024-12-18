import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import { Bounce, toast, ToastContainer } from "react-toastify";
import PersonalInfoUtility from "../../../utilities/profile/PersonalInfoUtility";
import EmploymentInfoUtility from "../../../utilities/profile/EmploymentInfoUtility";

type Props = {
  isEmploymentInfoOpen: boolean;
  setIsEmploymentInfoOpen: any;
  loginUserId: number;
};

function EmploymentInfoModal({
  isEmploymentInfoOpen,
  setIsEmploymentInfoOpen,
  loginUserId,
}: Props) {
  const utility = EmploymentInfoUtility(loginUserId);

  return (
    <>
      <Dialog
        open={isEmploymentInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsEmploymentInfoOpen((prev: boolean) => !prev)}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-1/2 rounded-3xl bg-white p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-end w-full">
                <CloseButton as="button" className="text-xl text-gray-500">
                  <RiCloseLargeFill />
                </CloseButton>
              </div>
              <DialogTitle as="h3" className="text-xl font-medium">
                Employment Info
              </DialogTitle>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="w-full flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold">
                      Current CTC <span className="text-red-600">*</span>
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={utility.employmentInfo.currentCTC}
                        id="currentCTC"
                        name="currentCTC"
                        className={`peer ${
                          utility.errorInfo.find(
                            (err) => err.fieldName === "currentCTC"
                          )
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={utility.onTextFieldChanged}
                      />
                      <label
                        htmlFor="currentCTC"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Current CTC
                      </label>
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "currentCTC"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "currentCTC"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold">
                      Expected CTC <span className="text-red-600">*</span>
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={utility.employmentInfo.expectedCTC}
                        id="expectedCTC"
                        name="expectedCTC"
                        className={`peer ${
                          utility.errorInfo.find(
                            (err) => err.fieldName === "expectedCTC"
                          )
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={utility.onTextFieldChanged}
                      />
                      <label
                        htmlFor="expectedCTC"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Expected CTC
                      </label>
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "expectedCTC"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "expectedCTC"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="noticePeriodId"
                  >
                    Notice Period <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="noticePeriodId"
                    id="noticePeriodId"
                    value={utility.employmentInfo.noticePeriodId}
                    onChange={utility.onSelectFieldChanged}
                    className={`peer ${
                      utility.errorInfo.find(
                        (err) => err.fieldName === "noticePeriodId"
                      )
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Notice Period</option>
                    {utility.noticePeriods.map((noticePeriod) => (
                      <option key={noticePeriod.id} value={noticePeriod.id}>
                        {noticePeriod.noticePeriodName}
                      </option>
                    ))}
                  </select>
                  {utility.errorInfo.find(
                      (error) => error.fieldName === "noticePeriodId"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "noticePeriodId"
                          )?.errorMessage
                        }
                      </span>
                    )}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button
                  className="text-blue-700"
                  onClick={() =>
                    setIsEmploymentInfoOpen((prev: boolean) => !prev)
                  }
                  //   onClick={() => dispatch(toggleEmploymentInfoModal())}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={() => {
                    utility.onEmploymentInfoSave();
                    // setIsEmploymentInfoOpen((prev: boolean) => !prev);
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

export default EmploymentInfoModal;
