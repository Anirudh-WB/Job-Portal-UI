import { useNavigate } from "react-router-dom";
import LoginUtility from "../../utilities/LoginUtility";
import { Alert, Snackbar } from "@mui/material";
import { Bounce, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const utility = LoginUtility();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white rounded-sm shadow-lg shadow-blue-200 h-fit w-1/2 flex flex-col gap-5 z-20">
        <div className="flex flex-col gap-3 p-10">
          <h1 className="text-lg font-semibold text-black">Login</h1>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-black">
              Email ID / Username
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Email or Username"
              autoComplete="off"
              value={utility.login.emailAddress}
              onChange={utility.onTextFieldChanged}
              className={`text-black placeholder-gray-500 ${
                utility.errorInfo.find(
                  (error) => error.fieldName === "emailAddress"
                )
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
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
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-black">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`text-black placeholder-gray-500 ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "password"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                } w-full pr-10`} // Added pr-10 for padding-right to make space for the eye icon
                value={utility.login.password}
                onChange={utility.onTextFieldChanged}
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-600" size={20} />
                ) : (
                  <FiEye className="text-gray-600" size={20} />
                )}
              </div>
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
          </div>

          <a
            href="/forgot-password"
            className="text-blue-600 text-right font-semibold"
          >
            Forgot Password?
          </a>
          <button
            type="submit"
            className="mt-2 w-full h-12 rounded bg-blue-600 text-white font-semibold"
            onClick={utility.onLogin}
          >
            Login
          </button>

          <a
            href="/"
            className="text-blue-600 text-center font-semibold text-sm mt-2"
          >
            Use OTP to Login
          </a>

          <div className="flex items-center p-2">
            <span className="flex-1 border-t border-gray-300 mr-2"></span>
            <span className="text-center text-xs font-semibold text-gray-500">
              Or
            </span>
            <span className="flex-1 border-t border-gray-300 ml-2"></span>
          </div>

          <div className="flex flex-1 justify-between">
            <button
              className=" text-blue-700 px-4 py-2 rounded-xl underline"
              onClick={() => {
                navigate("/company-registration");
              }}
            >
              Register for Company
            </button>
            <button
              className="  text-blue-700 px-4 py-2 rounded-xl underline"
              onClick={() => {
                navigate("/jobseeker-registration");
              }}
            >
              Register for JobSeeker
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        // containerId="login__toast"
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default LoginForm;
