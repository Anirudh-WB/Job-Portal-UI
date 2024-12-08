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

type Props = {
  isProfileHeaderOpen: boolean;
  setIsProfileHeaderOpen: any;
  loginUserId: number;
};

function PersonalInfoModal({
  isProfileHeaderOpen,
  setIsProfileHeaderOpen,
  loginUserId,
}: Props) {
  const utility = PersonalInfoUtility(loginUserId);

  return (
    <>
      <Dialog
        open={isProfileHeaderOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsProfileHeaderOpen((prev: boolean) => !prev)}
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
                Basic Details
              </DialogTitle>

              <div className="mt-4 flex flex-col gap-5">
                <div className="flex gap-2">
                  <div className="w-1/2 flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold">
                      First Name <span className="text-red-600">*</span>
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={utility.personalInfo.firstName}
                        id="firstName"
                        name="firstName"
                        className="peer"
                        onChange={utility.onTextFieldChanged}
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        First Name
                      </label>
                    </div>
                  </div>

                  <div className="w-1/2 flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold">
                      Last Name <span className="text-red-600">*</span>
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={utility.personalInfo.lastName}
                        id="lastName"
                        name="lastName"
                        className="peer"
                        onChange={utility.onTextFieldChanged}
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Last Name
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Mobile Number <span className="text-red-600">*</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    This helps us reach out to you
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      id="mobileNumber"
                      name="mobileNumber"
                      className="peer"
                      value={utility.personalInfo.mobileNumber}
                      onChange={utility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="mobileNumber"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Conatact No.
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Email Address <span className="text-red-600">*</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    We will send relevant jobs and updates to this email
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      id="emailAddress"
                      name="emailAddress"
                      className="peer"
                      value={utility.personalInfo.emailAddress}
                      onChange={utility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="emailAddress"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Email
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button
                  className="text-blue-700"
                  onClick={() =>
                    setIsProfileHeaderOpen((prev: boolean) => !prev)
                  }
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={async () => {
                    await utility.onPersonalInfoSave();
                    await setIsProfileHeaderOpen((prev: boolean) => !prev);
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

export default PersonalInfoModal;
