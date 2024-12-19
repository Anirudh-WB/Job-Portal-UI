import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import PersonalInfoUtility from "../../../utilities/profile/PersonalInfoUtility";

type Props = {
  isProfileHeaderOpen: boolean;
  toggleModal: () => void;
  loginUserId: number;
};

function PersonalInfoModal({
  isProfileHeaderOpen,
  toggleModal,
  loginUserId,
}: Props) {
  const utility = PersonalInfoUtility({ loginUserId });

  return (
    <>
      <Dialog
        open={isProfileHeaderOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={toggleModal}
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

              <form
                onSubmit={(e) => {
                  utility.handleSubmit(e).then((res) => {
                    if (res) {
                      toggleModal();
                    }
                  });
                }}
              >
                <div className="mt-4 flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold">
                      Profile Pic <span className="text-red-600">*</span>
                    </h3>
                    <div className="flex gap-2">
                      <div className="rounded-full h-20 w-24">
                        <img
                          src={`data:image/png;base64,${utility.personalInfo.profilePic}`}
                          alt="profile-pic"
                          className="rounded-full h-full object-cover object-center"
                        />
                      </div>
                      <input
                        type="file"
                        id="proifilePic"
                        name="proifilePic"
                        className={`peer ${
                          utility.errorInfo.find(
                            (err) => err.fieldName === "proifilePic"
                          )
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={utility.onFileChange}
                      />
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "proifilePic"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "proifilePic"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
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
                          className={`peer ${
                            utility.errorInfo.find(
                              (err) => err.fieldName === "firstName"
                            )
                              ? "border-red-500 text-red-500"
                              : "border-gray-300"
                          }`}
                          onChange={utility.onTextFieldChanged}
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          First Name
                        </label>
                      </div>
                      {utility.errorInfo.find(
                        (error) => error.fieldName === "firstName"
                      ) && (
                        <span className="text-xs text-red-500">
                          {
                            utility.errorInfo.find(
                              (error) => error.fieldName === "firstName"
                            )?.errorMessage
                          }
                        </span>
                      )}
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
                          className={`peer ${
                            utility.errorInfo.find(
                              (err) => err.fieldName === "lastName"
                            )
                              ? "border-red-500 text-red-500"
                              : "border-gray-300"
                          }`}
                          onChange={utility.onTextFieldChanged}
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Last Name
                        </label>
                      </div>
                      {utility.errorInfo.find(
                        (error) => error.fieldName === "lastName"
                      ) && (
                        <span className="text-xs text-red-500">
                          {
                            utility.errorInfo.find(
                              (error) => error.fieldName === "lastName"
                            )?.errorMessage
                          }
                        </span>
                      )}
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
                        className={`peer ${
                          utility.errorInfo.find(
                            (err) => err.fieldName === "mobileNumber"
                          )
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
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
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "mobileNumber"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "mobileNumber"
                          )?.errorMessage
                        }
                      </span>
                    )}
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
                        disabled
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
                    type="button"
                    className="text-blue-700"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PersonalInfoModal;
