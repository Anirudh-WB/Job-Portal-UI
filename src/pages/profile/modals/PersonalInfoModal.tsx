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

                {/* <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">
                    Current Company <span className="text-red-600">*</span>
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={utility.personalInfo.currentCompany}
                      id="currentCompany"
                      className="w-full outline-none border rounded-md p-2 peer"
                      onChange={(e) => utility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="currentCompany"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Current Company
                    </label>
                  </div>
                </div> */}

                {/* <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Current Salary <span className="text-red-600">*</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    Salary information helps us find relevant jobs for you
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      id="currentSalary"
                      className="w-full outline-none border rounded-md p-2 peer"
                    />
                    <label
                      htmlFor="currentSalary"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Current Salary
                    </label>
                  </div>
                </div> */}

                {/* <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">
                    Last Name <span className="text-red-600">*</span>
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={utility.personalInfo.lastName}
                      id="lastName"
                      className="w-full outline-none border rounded-md p-2 peer"
                      placeholder=""
                      onChange={(e) => utility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Last Name
                    </label>
                  </div>
                </div> */}

                {/* <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">Work status</span>
                  <span className="text-sm font-semibold text-gray-500">
                    We will personalize your Jobseeker experience based on this
                  </span>
                  <div className="w-1/3  flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="workStatus" value="employed" />
                      <span className="text-sm font-semibold text-gray-700">
                        Fresher
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" name="workStatus" value="employed" />
                      <span className="text-sm font-semibold text-gray-700">
                        Experienced
                      </span>
                    </div>
                  </div>
                </div> */}

                {/* <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Total experience <span className="text-red-600">*</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    This helps recruiters know your years of experience
                  </span>
                  <div className="relative w-full flex gap-2">
                    <div className="relative w-1/2">
                      <select className="peer outline-none border w-full p-2 rounded-xl text-gray-700">
                        {commonUtility.monthOptions.map((month, index) => (
                          <option value={month} key={index}>
                            {month}
                          </option>
                        ))}
                        ;
                      </select>
                      <label className="absolute left-0 top-2 text-sm text-gray-400 bg-white px-2 transition-all duration-300 transform -translate-y-4 scale-75 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Month
                      </label>
                    </div>
                    <div className="relative w-1/2">
                      <select className="peer outline-none border p-2 w-full rounded-xl text-gray-700">
                        {commonUtility.yearOptions.map((year, index) => (
                          <option value={year} key={index}>
                            {year}
                          </option>
                        ))}
                        ;
                      </select>
                      <label className="absolute left-0 top-2 text-sm text-gray-400 bg-white px-2 transition-all duration-300 transform -translate-y-4 scale-75 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Year
                      </label>
                    </div>
                  </div>
                </div> */}

                {/* <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Salary breakdown <span className="text-red-600">*</span>
                  </span>
                  <div className="relative">
                    <select className="peer outline-none border w-full p-2 rounded-xl text-gray-700">
                      {commonUtility.salaryBreakdown.map((sal, index) => (
                        <option value={sal} key={index}>
                          {sal}
                        </option>
                      ))}
                    </select>
                    <label className="absolute left-0 top-2 text-sm text-gray-400 bg-white px-2 transition-all duration-300 transform -translate-y-4 scale-75 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Salary breakdown
                    </label>
                  </div>
                </div> */}

                {/* <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Current Location <span className="text-red-600">*</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    This helps us find relevant jobs for you
                  </span>
                  <div className="w-1/3  flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="workStatus" value="employed" />
                      <span className="text-sm font-semibold text-gray-700">
                        India
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" name="workStatus" value="employed" />
                      <span className="text-sm font-semibold text-gray-700">
                        Outside India
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="floating_outlined"
                      className="w-1/3 outline-none border rounded-md p-2 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Location
                    </label>
                  </div>
                </div> */}

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

                {/* <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">
                    Notice period <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 font-semibold">
                    Lets recruiters know your availability to join
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {commonUtility.noticePeriod.map((option) => (
                      <button
                        key={option}
                        onClick={() => utility.setSelectedPeriod(option)}
                        className={`px-4 py-2 rounded-full border text-sm ${
                          utility.selectedPeriod === option
                            ? "bg-gray-200 font-semibold border-gray-400"
                            : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button
                  className="text-blue-700"
                  onClick={() =>
                    setIsProfileHeaderOpen((prev: boolean) => !prev)
                  }
                  //   onClick={() => dispatch(toggleProfileHeaderModal())}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={() => {
                    utility.onPersonalInfoSave();
                    setIsProfileHeaderOpen((prev: boolean) => !prev);
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
