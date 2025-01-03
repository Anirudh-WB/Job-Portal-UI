import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import { Bounce, toast, ToastContainer } from "react-toastify";
import CompanyInfoModalUtility from "../../../../utilities/company/CompanyInfoModalUtility";

type Props = {
  isCompanyInfoOpen: boolean;
  toggleModal: any;
  loginUserId: number;
};

export default function CompanyHeaderModal({
  isCompanyInfoOpen,
  toggleModal,
  loginUserId,
}: Props) {
  const utility = CompanyInfoModalUtility(loginUserId);

  return (
    <>
      <Dialog
        open={isCompanyInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={toggleModal}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <form
          onSubmit={(e) => {
            utility.handleSubmit(e).then((res) => {
              if (res) {
                toggleModal();
              }
            });
          }}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-1/2 rounded-3xl bg-white p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex justify-end w-full">
                  <button
                    className="text-xl text-gray-500"
                    onClick={toggleModal}
                  >
                    <RiCloseLargeFill />
                  </button>
                </div>
                <DialogTitle as="h3" className="text-xl font-medium">
                  Company Details
                </DialogTitle>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold">
                      Company Logo <span className="text-red-600">*</span>
                    </span>
                    <div className="flex gap-4 w-full">
                      <img
                        src={`data:image/png;base64,${utility.CompanyInfo.companyLogo}`}
                        alt="company-logo"
                        className="rounded-full h-24 aspect-square object-cover object-center shadow-2xl"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          id="companyLogo"
                          name="companyLogo"
                          className={`peer mt-5${
                            utility.errorInfo.find(
                              (error) => error.fieldName === "companyLogo"
                            )
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder=""
                          accept=".jpeg, .jpg, .png"
                          onChange={utility.onFileChange}
                        />
                      </div>
                      {utility.errorInfo.find(
                        (error) => error.fieldName === "companyLogo"
                      ) && (
                        <span className="text-xs text-red-500">
                          {
                            utility.errorInfo.find(
                              (error) => error.fieldName === "companyLogo"
                            )?.errorMessage
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold">
                      Company Name <span className="text-red-600">*</span>
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className={`w-full outline-none border rounded-md p-2 peer ${
                          utility.errorInfo.find(
                            (error) => error.fieldName === "companyName"
                          )
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                        value={utility.CompanyInfo.companyName}
                        onChange={utility.onTextFieldChanged}
                      />
                      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Company Name
                      </label>
                    </div>
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

                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold">
                      Website <span className="text-red-600">*</span>
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        id="companyUrl"
                        name="companyUrl"
                        className={`w-full outline-none border rounded-md p-2 peer ${
                          utility.errorInfo.find(
                            (error) => error.fieldName === "companyUrl"
                          )
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=""
                        value={utility.CompanyInfo.companyUrl}
                        onChange={utility.onTextFieldChanged}
                      />
                      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Website
                      </label>
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "companyUrl"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "companyUrl"
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
                      We will send canditates to you
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        id="emailAddress"
                        name="emailAddress"
                        className={`w-full outline-none border rounded-md p-2 peer ${
                          utility.errorInfo.find(
                            (error) => error.fieldName === "emailAddress"
                          )
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                        value={utility.CompanyInfo.emailAddress}
                        disabled={true}
                      />
                      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Email
                      </label>
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "emailAddress"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "emailAddress"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2 w-1/2">
                      <span className="text-base font-semibold">
                        Mobile Number <span className="text-red-600">*</span>
                      </span>
                      <span className="text-sm font-semibold text-gray-500">
                        This helps us reach out to you
                      </span>
                      <div className="relative">
                        <input
                          type="number"
                          id="mobileNo"
                          name="mobileNo"
                          className={`w-full outline-none border rounded-md p-2 peer ${
                            utility.errorInfo.find(
                              (error) => error.fieldName === "mobileNo"
                            )
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                          value={utility.CompanyInfo.mobileNo}
                          onChange={utility.onTextFieldChanged}
                        />
                        <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                          Conatact No.
                        </label>
                      </div>
                      {utility.errorInfo.find(
                        (error) => error.fieldName === "mobileNo"
                      ) && (
                        <span className="text-xs text-red-500">
                          {
                            utility.errorInfo.find(
                              (error) => error.fieldName === "mobileNo"
                            )?.errorMessage
                          }
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-1/2">
                      <span className="text-base font-semibold">
                        Location <span className="text-red-600">*</span>
                      </span>
                      <span className="text-sm font-semibold text-gray-500">
                        This helps us find relevant jobs for you
                      </span>
                      <div>
                        <select
                          id="cityId"
                          name="cityId"
                          className={`w-full outline-none rounded-md py-2 px-4 text-sm ${
                            utility.errorInfo.find(
                              (err) => err.fieldName === "cityId"
                            )
                              ? "border-red-500 text-red-500"
                              : "border-gray-300"
                          }`}
                          value={utility.CompanyInfo.cityId || 0}
                          onChange={utility.onSelectFieldChange}
                        >
                          {utility.cities.length !== null &&
                            utility.cities.map((idc, index) => (
                              <option key={index} value={idc.id}>
                                {idc.cityName}
                              </option>
                            ))}
                        </select>
                        {utility.errorInfo.find(
                          (error) => error.fieldName === "cityId"
                        ) && (
                          <span className="text-xs text-red-500">
                            {
                              utility.errorInfo.find(
                                (error) => error.fieldName === "cityId"
                              )?.errorMessage
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 w-full">
                    <h3 className="font-semibold text-lg">Contact Person</h3>
                    <hr className="flex-1 border-gray-200 border mt-1" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold">
                      Name <span className="text-red-600">*</span>
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        id="contactPersonName"
                        name="contactPersonName"
                        className={`w-full outline-none border rounded-md p-2 peer ${
                          utility.errorInfo.find(
                            (err) => err.fieldName === "contactPersonName"
                          )
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=""
                        value={utility.CompanyInfo.contactPersonName}
                        onChange={utility.onTextFieldChanged}
                      />
                      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Name
                      </label>
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "contactPersonName"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "contactPersonName"
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
                      We will send canditates to you
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        id="contactPersonEmail"
                        name="contactPersonEmail"
                        className={`w-full outline-none border rounded-md p-2 peer ${
                          utility.errorInfo.find(
                            (err) => err.fieldName === "contactPersonEmail"
                          )
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                        value={utility.CompanyInfo.contactPersonEmail}
                        onChange={utility.onTextFieldChanged}
                      />
                      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Email
                      </label>
                    </div>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "contactPersonEmail"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "contactPersonEmail"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2 w-1/2">
                      <span className="text-base font-semibold">
                        Mobile Number <span className="text-red-600">*</span>
                      </span>
                      {/* <span className="text-sm font-semibold text-gray-500">
                        This helps us reach out to you
                      </span> */}
                      <div className="relative">
                        <input
                          type="number"
                          id="contactPersonPhone"
                          name="contactPersonPhone"
                          className={`w-full outline-none border rounded-md p-2 peer ${
                            utility.errorInfo.find(
                              (err) => err.fieldName === "contactPersonPhone"
                            )
                              ? "border-red-500 text-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                          value={utility.CompanyInfo.contactPersonPhone}
                          onChange={utility.onTextFieldChanged}
                        />
                        <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                          Conatact No.
                        </label>
                      </div>
                      {utility.errorInfo.find(
                        (error) => error.fieldName === "contactPersonPhone"
                      ) && (
                        <span className="text-xs text-red-500">
                          {
                            utility.errorInfo.find(
                              (error) =>
                                error.fieldName === "contactPersonPhone"
                            )?.errorMessage
                          }
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-1/2">
                      <span className="text-base font-semibold">
                        Designation <span className="text-red-600">*</span>
                      </span>

                      <div>
                        <select
                          id="designationId"
                          name="designationId"
                          className={`w-full outline-none rounded-md py-2 px-4 text-sm ${
                            utility.errorInfo.find(
                              (err) => err.fieldName === "designationId"
                            )
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={utility.CompanyInfo.designationId}
                          onChange={utility.onSelectFieldChange}
                        >
                          {utility.designation?.length !== null &&
                            utility.designation?.map((idc, index) => (
                              <option key={index} value={idc.id}>
                                {idc.designationName}
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
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>

      <ToastContainer
        // containerId="company__info__toast"
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
