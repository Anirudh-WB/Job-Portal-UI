import React from "react";
import forgotImg from "../../images/mobile-password-forgot.png";
import ForgotPasswordUtility from "../../utilities/password/ForgotPasswordUtility";
import { Bounce, ToastContainer } from "react-toastify";

function ForgotPassword() {
  const utility = ForgotPasswordUtility();

  return (
    <>
      {utility.isLoading && (
        <div className="fixed inset-0 bg-black/10 z-50 flex w-full h-full justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 border-solid"></div>
        </div>
      )}
      <div className="flex flex-1 gap-5 px-44 py-10 justify-center">
        <div>
          <img src={forgotImg} />
        </div>
        <div className="flex flex-col gap-4 w-2/5 justify-center px-2">
          <h1 className="text-6xl font-bold flex flex-wrap">
            <span>Forgot</span> Your Password ?
          </h1>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                autoComplete="off"
                className="outline-none border border-black"
                value={utility.forgotPassword.emailAddress}
                onChange={utility.onTextFieldChange}
              />
              <label
                className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                htmlFor="emailAddress"
              >
                Enter your Email
              </label>
            </div>

            <p className="text-xs text-gray-500 font-semibold ">
              Kindly enter your email address to receive the password reset link
              in your inbox.
            </p>
          </div>

          <button
            className="w-full px-10 py-2 bg-blue-700 text-white rounded-md"
            onClick={utility.onForgotPassword}
          >
            Reset Password
          </button>
          <p className="mt-2 text-sm text-center text-blue-700 cursor-pointer font-semibold">
            <a href="/login">Back to Login</a>
          </p>
        </div>
        
        <ToastContainer
          // containerId="company__registration__toast"
          draggable
          theme="colored"
          transition={Bounce}
        />
      </div>
    </>
  );
}

export default ForgotPassword;
