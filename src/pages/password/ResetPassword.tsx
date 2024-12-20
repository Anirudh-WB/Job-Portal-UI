import { FiEye, FiEyeOff } from "react-icons/fi";
import ResetPasswordUtility from "../../utilities/password/ResetPasswordUtility";
import { Bounce, ToastContainer } from "react-toastify";

function ResetPassword() {
  const utility = ResetPasswordUtility();

  return (
    <div className="flex flex-1 gap-5 px-44 py-4 justify-center overflow-hidden">
      <img
        src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-2935.jpg"
        alt="Reset Password"
        className="w-1/2 h-1/2 object-cover rounded-lg"
      />

      <div className="flex flex-col gap-4 w-2/5 px-1 justify-center">
        <h1 className="text-6xl font-bold flex flex-wrap">
          <span>Reset</span> Your Password ?
        </h1>

        <div className="flex flex-col gap-4">
          {/* Password Field */}
          <div className="relative">
            {/* Input Field */}
            <input
              type={utility.showPassword ? "text" : "password"} // Toggle between text and password
              id="newPassword"
              name="newPassword"
              autoComplete="off"
              className="outline-none border border-black w-full px-3 py-2 rounded-md peer"
              value={utility.resetPassword.newPassword}
              onChange={utility.onTextFieldChange}
            />
            <label
              className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="newPassword"
            >
              Password
            </label>

            {/* Eye Icon */}
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
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={utility.showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              className="outline-none border border-black w-full px-3 py-2 rounded-md peer"
              value={utility.resetPassword.confirmPassword}
              onChange={utility.onTextFieldChange}
            />
            <label
              className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <div
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              onClick={utility.toggleConfirmPasswordVisibility}
            >
              {utility.showConfirmPassword ? (
                <FiEyeOff className="text-gray-600" size={20} />
              ) : (
                <FiEye className="text-gray-600" size={20} />
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500 font-semibold ">
            Enter your new password and confirm it to reset your account.
          </p>
        </div>

        {/* Reset Password Button */}
        <button
          className="w-full px-10 py-2 bg-blue-700 text-white rounded-md"
          onClick={utility.onResetPassword}
        >
          Change Password
        </button>

        {/* Back to Login Link */}
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
  );
}

export default ResetPassword;
