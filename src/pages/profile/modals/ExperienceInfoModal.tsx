import React, { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  isExperienceInfoOpen: boolean;
  setIsExperienceInfoOpen: any;
  loginUserId: number;
};

function ExperienceInfoModal({
  isExperienceInfoOpen,
  setIsExperienceInfoOpen,
  loginUserId,
}: Props) {
  const utility = PersonalInfoUtility(loginUserId);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isPresent, setIsPresent] = useState(false);

  const handleCheckboxChange = () => {
    setIsPresent(!isPresent);
    if (!isPresent) {
      setEndDate(null); // Clear end date if "Present" is checked
    }
  };
  return (
    <>
      <Dialog
        open={isExperienceInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsExperienceInfoOpen((prev: boolean) => !prev)}
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
                Experiences
              </DialogTitle>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Company Name <span className="text-red-600">*</span>
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="w-full outline-none border rounded-md p-2 peer"
                    />
                    <label className="absolute left-0 top-2 text-sm text-gray-400 bg-white px-2 transition-all duration-300 transform -translate-y-4 scale-75 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Company name
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Designation <span className="text-red-600">*</span>
                  </span>
                  <div className="relative">
                    <select className="peer outline-none border w-full p-2 rounded-md text-gray-700"></select>
                    <label className="absolute left-0 top-2 text-sm text-gray-400 bg-white px-2 transition-all duration-300 transform -translate-y-4 scale-75 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Designation
                    </label>
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={isPresent}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  I am currently working in this company
                </label>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold">
                      Start Date <span className="text-red-600">*</span>
                    </span>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                      selectsStart
                      placeholderText="Start Date"
                      className="outline-none border w-full p-2 rounded-md text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold">
                      End Date <span className="text-red-600">*</span>
                    </span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date: any) => setEndDate(date)}
                      selectsEnd
                      placeholderText={isPresent ? 'Present' : 'End Date'}
                      className="outline-none border w-full p-2 rounded-md text-gray-700"
                      disabled={isPresent} // Disable the DatePicker when "Present" is checked
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Desscriptions <span className="text-red-600">*</span>
                  </label>
                  <div>
                    <div className="relative">
                      <textarea
                        id="floating_outlined"
                        className="w-full outline-none border rounded-md p-2 peer resize-none"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-2 text-sm text-gray-400 bg-white px-2 transition-all duration-300 transform -translate-y-4 scale-75 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Desscriptions
                      </label>
                    </div>
                    <span className="text-xs text-gray-600 text-right py-2 w-full block">
                      1000 character(s) left
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button
                  className="text-blue-700"
                  onClick={() =>
                    setIsExperienceInfoOpen((prev: boolean) => !prev)
                  }
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={utility.onPersonalInfoSave}
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <ToastContainer
        containerId="personal__info__toast"
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

export default ExperienceInfoModal;
