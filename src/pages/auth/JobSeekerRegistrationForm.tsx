import JobseekerRegistrationUtility from "../../utilities/auth/JobseekerRegistrationUtility";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

function JobSeekerRegistrationForm() {
  const utility = JobseekerRegistrationUtility();
  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={utility.handleSubmit}>
        <div className="p-10 bg-white rounded-xl shadow-md h-fit flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg" id="careers">
              Create your Profile
            </h2>
            <p className="text-sm text-gray-500 font-semibold">
              To create a new profile, please fill out the form below. Your
              profile will appear on our website, allowing potential employers
              to find you.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-5">
                {/* Profile Pic */}
                <div className="flex flex-col gap-1 w-full">
                  <label
                    className="text-base font-semibold"
                    htmlFor="firstName"
                  >
                    Profile Pic{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <div>
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      className={`peer ${
                        utility.errorInfo.find(
                          (error) => error.fieldName === "profilePic"
                        )
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={utility.onFileChange} // This handles the file selection
                      accept=".jpg,.jpeg,.png"
                    />
                  </div>

                  {utility.errorInfo.find(
                    (error) => error.fieldName === "profilePic"
                  ) && (
                    <span className="text-xs text-red-500">
                      {
                        utility.errorInfo.find(
                          (error) => error.fieldName === "profilePic"
                        )?.errorMessage
                      }
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                {/* First Name */}
                <div className="flex flex-col gap-1 w-full">
                  <label
                    className="text-base font-semibold"
                    htmlFor="firstName"
                  >
                    First Name{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`peer ${
                        utility.errorInfo.find(
                          (error) => error.fieldName === "firstName"
                        )
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      autoComplete="off"
                      value={utility.jobseekerRegistration.firstName}
                      onChange={utility.onTextFieldChange}
                    />
                    <label
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      htmlFor="firstName"
                    >
                      Enter First name
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

                {/* Last Name */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-base font-semibold" htmlFor="lastName">
                    Last Name{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`peer ${
                        utility.errorInfo.find(
                          (error) => error.fieldName === "lastName"
                        )
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      autoComplete="off"
                      value={utility.jobseekerRegistration.lastName}
                      onChange={utility.onTextFieldChange}
                    />
                    <label
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      htmlFor="lastName"
                    >
                      Enter Last name
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
                    value={utility.jobseekerRegistration.emailAddress}
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

              {/* Mobile Number */}
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
                    value={utility.jobseekerRegistration.mobileNo}
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
                    value={utility.jobseekerRegistration.password}
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

              {/* Confirm Password */}
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
                    value={utility.jobseekerRegistration.confirmPassword}
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

              {/* Login/Register */}
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
                  // onClick={utility.onJobseekerRegistration}
                >
                  Register now
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer
        // containerId="jobseeker__registration__toast"
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

export default JobSeekerRegistrationForm;
