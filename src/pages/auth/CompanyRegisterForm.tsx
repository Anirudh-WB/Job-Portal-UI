import React from "react";
import CompanyRegistrationUtility from "../../utilities/auth/CompanyRegistrationUtility";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

function CompanyRegisterForm() {
  const utility = CompanyRegistrationUtility();
  const navigate = useNavigate();

  return (
    <>
      {utility.isLoading && (
        <div className="fixed inset-0 bg-black/10 z-50 flex w-full h-full justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 border-solid"></div>
        </div>
      )}

      <form onSubmit={utility.handleSubmit}>
        <div className="p-10 bg-white rounded-xl shadow-md h-fit flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg" id="careers">
              Create your Company profile
            </h2>
            <p className="text-sm text-gray-500 font-semibold">
              To create a new profile, please fill out the form below. Your
              profile will appear on our website, allowing potential employees
              to find you.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3 w-full">
              {/* Company Logo */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  className="text-base font-semibold"
                  htmlFor="companyLogo"
                >
                  Company Logo{" "}
                  <span className="text-red-600 font-semibold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="companyLogo"
                    name="companyLogo"
                    className={`peer ${
                      utility.errorInfo.find(
                        (error) => error.fieldName === "companyLogo"
                      )
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    autoComplete="off"
                    onChange={utility.onFileChange}
                    accept=".jpg,.jpeg,.png"
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
              <div className="flex flex-1 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1 w-full">
                  <label
                    className="text-base font-semibold"
                    htmlFor="companyName"
                  >
                    Company Name{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className={`peer ${
                        utility.errorInfo.find(
                          (error) => error.fieldName === "companyName"
                        )
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      autoComplete="off"
                      value={utility.companyRegistration.companyName}
                      onChange={utility.onTextFieldChange}
                    />
                    <label
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      htmlFor="companyName"
                    >
                      Enter Company name
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
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-base font-semibold" htmlFor="companyUrl">
                  Website <span className="text-red-600 font-semibold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="companyUrl"
                    name="companyUrl"
                    className={`peer ${
                      utility.errorInfo.find(
                        (error) => error.fieldName === "companyUrl"
                      )
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    autoComplete="off"
                    value={utility.companyRegistration.companyUrl}
                    onChange={utility.onTextFieldChange}
                  />
                  <label
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    htmlFor="companyUrl"
                  >
                    Enter Company Url
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

              {/* Email ID */}
              <div className="flex flex-col gap-1">
                <label
                  className="text-base font-semibold"
                  htmlFor="emailAddress"
                >
                  Email ID <span className="text-red-600 font-semibold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    className={`peer ${
                      utility.errorInfo.find(
                        (error) => error.fieldName === "emailAddress"
                      )
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    autoComplete="off"
                    value={utility.companyRegistration.emailAddress}
                    onChange={utility.onTextFieldChange}
                  />
                  <label
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    htmlFor="emailAddress"
                  >
                    Enter your Email ID
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
                <p className="text-xs text-gray-500 font-semibold ">
                  We'll send you a relevant jobs and updates to this email
                  address.
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col items-center p-2">
            <span className="flex-1 border-l border-gray-300 h-full mb-1"></span>
            <span className="text-center text-xs font-bold text-gray-500">
              Or
            </span>
            <span className="flex-1 border-l border-gray-300 h-full mt-1"></span>
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-center text-sm font-bold">
              Continue with
            </label>
            <button className="flex items-center justify-center gap-2 rounded-3xl border border-blue-700 text-blue-700 font-semibold px-4 py-2">
              <FcGoogle /> Google
            </button>
          </div> */}
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold" htmlFor="mobileNo">
                Mobile Number{" "}
                <span className="text-red-600 font-semibold">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="mobileNo"
                  name="mobileNo"
                  className={`peer ${
                    utility.errorInfo.find(
                      (error) => error.fieldName === "mobileNo"
                    )
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  autoComplete="off"
                  value={utility.companyRegistration.mobileNo}
                  onChange={utility.onTextFieldChange}
                />
                <label
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="mobileNo"
                >
                  Enter your mobile number
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
              <p className="text-xs text-gray-500 font-semibold ">
                Recruiter will contact you on this number
              </p>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-base font-semibold" htmlFor="cityId">
                Location <span className="text-red-600 font-semibold">*</span>
              </label>
              <select
                id="cityId"
                name="cityId"
                className={`peer ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "cityId"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                autoComplete="off"
                value={utility.companyRegistration.cityId}
                onChange={utility.onSelectFieldChange}
              >
                <option value="">Select Location</option>
                {utility.cities?.length !== null &&
                  utility.cities?.map((city, index) => (
                    <option key={index} value={city.id}>
                      {city.cityName}
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

          <div className="flex flex-col gap-5">
            <h2 className="font-semibold text-lg" id="careers">
              Add Contact Person Details
            </h2>

            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-base font-semibold"
                htmlFor="contactPersonName"
              >
                Contact Person Name{" "}
                <span className="text-red-600 font-semibold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="contactPersonName"
                  name="contactPersonName"
                  className={`peer ${
                    utility.errorInfo.find(
                      (error) => error.fieldName === "contactPersonName"
                    )
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  autoComplete="off"
                  value={utility.companyRegistration.contactPersonName}
                  onChange={utility.onTextFieldChange}
                />
                <label
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="contactPersonName"
                >
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

            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-base font-semibold"
                htmlFor="contactPersonEmail"
              >
                Contact Person Email{" "}
                <span className="text-red-600 font-semibold">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="contactPersonEmail"
                  name="contactPersonEmail"
                  className={`peer ${
                    utility.errorInfo.find(
                      (error) => error.fieldName === "contactPersonEmail"
                    )
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  autoComplete="off"
                  value={utility.companyRegistration.contactPersonEmail}
                  onChange={utility.onTextFieldChange}
                />
                <label
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="contactPersonEmail"
                >
                  Email Address
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

            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-base font-semibold"
                htmlFor="contactPersonPhone"
              >
                Contact Person Phone Number{" "}
                <span className="text-red-600 font-semibold">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="contactPersonPhone"
                  name="contactPersonPhone"
                  className={`peer ${
                    utility.errorInfo.find(
                      (error) => error.fieldName === "contactPersonPhone"
                    )
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  autoComplete="off"
                  value={utility.companyRegistration.contactPersonPhone}
                  onChange={utility.onTextFieldChange}
                />
                <label
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="contactPersonPhone"
                >
                  Phone Number
                </label>
              </div>
              {utility.errorInfo.find(
                (error) => error.fieldName === "contactPersonPhone"
              ) && (
                <span className="text-xs text-red-500">
                  {
                    utility.errorInfo.find(
                      (error) => error.fieldName === "contactPersonPhone"
                    )?.errorMessage
                  }
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-base font-semibold"
                htmlFor="designationId"
              >
                Designation{" "}
                <span className="text-red-600 font-semibold">*</span>
              </label>
              <select
                id="designationId"
                name="designationId"
                className={`peer ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "designationId"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                autoComplete="off"
                value={utility.companyRegistration.designationId}
                onChange={utility.onSelectFieldChange}
              >
                <option value="">Select Designtion</option>
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

            <hr className="mt-4 font-semibold " />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold" htmlFor="password">
              Password <span className="text-red-600 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type={utility.showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`peer ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "password"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                autoComplete="off"
                value={utility.companyRegistration.password}
                onChange={utility.onTextFieldChange}
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={utility.togglePasswordVisibility}
              >
                {utility.showPassword ? (
                  <FiEyeOff className="text-gray-600" size={20} />
                ) : (
                  <FiEye className="text-gray-600" size={20} />
                )}
              </div>
              <label
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                htmlFor="password"
              >
                Enter Password
              </label>
            </div>
            {utility.errorInfo.find(
              (error) => error.fieldName === "password"
            ) && (
              <span className="text-xs text-red-500">
                {
                  utility.errorInfo.find(
                    (error) => error.fieldName === "password"
                  )?.errorMessage
                }
              </span>
            )}
            <p className="text-xs text-gray-500 font-semibold ">
              This help your account to stay protected
            </p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-semibold"
              htmlFor="confirmPassword"
            >
              Confirm Password{" "}
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type={utility.showCnfPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={`peer ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "confirmPassword"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                autoComplete="off"
                value={utility.companyRegistration.confirmPassword}
                onChange={utility.onTextFieldChange}
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={utility.toggleCnfPasswordVisibility}
              >
                {utility.showCnfPassword ? (
                  <FiEyeOff className="text-gray-600" size={20} />
                ) : (
                  <FiEye className="text-gray-600" size={20} />
                )}
              </div>
              <label
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                htmlFor="confirmPassword"
              >
                Enter Confirm Password
              </label>
            </div>
            {utility.errorInfo.find(
              (error) => error.fieldName === "confirmPassword"
            ) && (
              <span className="text-xs text-red-500">
                {
                  utility.errorInfo.find(
                    (error) => error.fieldName === "confirmPassword"
                  )?.errorMessage
                }
              </span>
            )}
            <p className="text-xs text-gray-500 font-semibold ">
              This help your account to stay protected
            </p>
          </div>

          <div className="mt-4 flex flex-1 justify-between">
            <button
              className="w-fit bg-white text-blue-700 font-semibold py-2 px-4 rounded-3xl"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              type="submit"
              className="w-fit bg-blue-700 text-white font-semibold py-2 px-4 rounded-3xl"
              // onClick={utility.onCompanyRegistration}
            >
              Register now
            </button>
          </div>
        </div>
      </form>

      <ToastContainer
        // containerId="company__registration__toast"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
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

export default CompanyRegisterForm;
