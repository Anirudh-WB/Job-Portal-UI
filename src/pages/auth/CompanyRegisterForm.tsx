import React from "react";
import CompanyRegistrationUtility from "../../utilities/auth/CompanyRegistrationUtility";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

function CompanyRegisterForm() {
  const utility = CompanyRegistrationUtility();
  const navigate = useNavigate();

  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md h-fit flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg" id="careers">
            Create yours Company profile
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            To create a new profile, please fill out the form below. Your
            profile will appear on our website, allowing potential employees to
            find you.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-3 w-full">
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

            {/* Email ID */}
            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold" htmlFor="emailAddress">
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
                type="text"
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
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold" htmlFor="password">
              Password <span className="text-red-600 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
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
                type="text"
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
              className="w-fit bg-blue-700 text-white font-semibold py-2 px-4 rounded-3xl"
              onClick={utility.onCompanyRegistration}
            >
              Register now
            </button>
          </div>
        </div>
      </div>

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
