import { IoCheckmark } from "react-icons/io5";
const LoginInfo = () => {
  return (
    <>
      <div className="bg-white border rounded-lg sticky h-fit w-1/2 shadow-md shadow-blue-200">
        <div className="p-10 pb-0 flex flex-col gap-4 justify-start">
          <h2 className="font-semibold text-lg">New to JobSeeker?</h2>
          <div className="flex items-center gap-1 w-full font-medium">
            <IoCheckmark className="text-green-600" />
            <p className="text-gray-600 text-sm w-auto">
              One click apply using JobSeeker profile
            </p>
          </div>
          <div className="flex items-center gap-1 w-full font-medium">
            <IoCheckmark className="text-green-600" />
            <p className="text-gray-600 text-sm w-auto">
              Get releveant job recommendations
            </p>
          </div>
          <div className="flex items-center gap-1 w-full font-medium">
            <IoCheckmark className="text-green-600" />
            <p className="text-gray-600 text-sm w-auto">
              Showcase profile to copanies and consultants
            </p>
          </div>
          <div className="flex items-center gap-1 w-full font-medium">
            <IoCheckmark className="text-green-600" />
            <p className="text-gray-600 text-sm w-auto">
              Know application status on applies jobs
            </p>
          </div>
          <div>
            <button className="text-blue-700 bg-white rounded-sm border border-blue-700 px-8 py-2 w-1/2 font-medium">
              Regsiter for free
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <img
            src="//static.naukimg.com/s/5/105/i/register.png"
            alt="Register"
            className="h-52 object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default LoginInfo;
