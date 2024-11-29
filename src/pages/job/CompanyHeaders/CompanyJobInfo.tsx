import React from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import boyPic from "../../../images/white-boy.a0d2814a.png";

function CompanyJobInfo() {
    const navigate = useNavigate();
  return (
    <>
      <div className="bg-white border rounded-lg p-7 flex flex-col items-center gap-5 w-1/4 sticky top-0 h-fit">
        <img src={boyPic} alt="" className=" w-1/2" />
        <h2 className="font-semibold">On Job Posting, you can</h2>
        <div className="flex gap-1 w-full font-medium">
          <GoCheckCircleFill className="text-green-500 w-1/6 mt-1" />
          <p className="text-gray-600 text-sm w-auto">
            Join our team and be part of exciting projects that push the
            boundaries of innovation
          </p>
        </div>
        <div className="flex gap-1 w-full font-medium">
          <GoCheckCircleFill className="text-green-500 w-1/6 mt-1" />
          <p className="text-gray-600 text-sm w-auto">
            We’re looking for skilled professionals with a passion for
            technology and growth.
          </p>
        </div>
        <div className="flex gap-1 w-full font-medium">
          <GoCheckCircleFill className="text-green-500 w-1/6 mt-1" />
          <p className="text-gray-600 text-sm w-auto">
            Take the next step in your career with us and help shape the future.
          </p>
        </div>
        <button
          className="text-white bg-blue-600 py-1.5 px-3 rounded-full"
          onClick={() => {
            navigate("/job");
          }}
        >
          Add Job
        </button>
      </div>
    </>
  );
}

export default CompanyJobInfo;
