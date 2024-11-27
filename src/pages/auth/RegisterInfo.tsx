import { GoCheckCircleFill } from "react-icons/go";
import boyPic from "../../images/white-boy.a0d2814a.png";

function RegisterInfo() {
  return (
    <div className="bg-white border rounded-lg p-7 flex flex-col items-center gap-5 w-1/4 sticky top-10 h-fit">
      <img src={boyPic} alt="" className=" w-1/2" />
      <h2 className="font-semibold">On registering, you can</h2>
      <div className="flex justify-start gap-1 w-full font-medium">
        <div className="flex w-full basis-1/12 justify-start">
          <GoCheckCircleFill className="text-green-500 mt-1" />
        </div>
        <div className="flex w-full">
          <p className="text-gray-600 text-sm w-auto">
            Build your own profile and let recruiters find you
          </p>
        </div>
      </div>
      <div className="flex justify-start gap-1 w-full font-medium">
        <div className="flex w-full basis-1/12 justify-start">
          <GoCheckCircleFill className="text-green-500 mt-1" />
        </div>
        <div className="flex w-full">
          <p className="text-gray-600 text-sm w-auto">
            Get job postings delivered right to your email
          </p>
        </div>
      </div>
      <div className="flex justify-start gap-1 w-full font-medium">
        <div className="flex w-full basis-1/12 justify-start">
          <GoCheckCircleFill className="text-green-500 mt-1" />
        </div>
        <div className="flex w-full">
          <p className="text-gray-600 text-sm w-auto">
            Find a job and grow your career
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterInfo;
