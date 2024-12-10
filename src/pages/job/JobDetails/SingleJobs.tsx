import React from "react";
import { PiHandbagSimple } from "react-icons/pi";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import JobDetailsUtility from "../../../utilities/job/JobDetailsUtility";
import { FaTrain } from "react-icons/fa6";
import JobInfoUtility from "../../../utilities/job/JobInfoUtility";
import JobCityUtility from "../../../utilities/job/JobCityUtility";
import { GiSkills } from "react-icons/gi";
import JobApplicationRequest from "../../../model/job/JobApplicationRequest";
import JobApplicationUtility from "../../../utilities/job/JobApplicationUtility";
import { ToastContainer } from "react-toastify";

function SingleJobs() {
  const params = useParams();
  const navigate = useNavigate();
  const paramId = params.id ? parseInt(params.id, 10) : 0;

  const job = JobDetailsUtility(paramId);
  const jobApplicationRequest: JobApplicationRequest = {
    jobId: 0,
  };
  const jobApplicationUtility = JobApplicationUtility(jobApplicationRequest);
  const cities = JobCityUtility(paramId);

  // Simulate loginUserId (replace with actual implementation)
  const loginUserId = localStorage.getItem("loginUserId"); // Example: Retrieve from localStorage

  return (
    <>
      <div className="px-36">
        <div className="mt-5 flex-1 flex flex-col gap-5 rounded h-fit">
          <div className="bg-white border rounded border-gray-200 shadow h-fit p-5">
            <div className="p-3">
              <h1 className="text-xl font-semibold">{job.jobInfo?.jobTitle}</h1>
              <p className="text-sm text-gray-600">
                {job.jobInfo?.designationName}
              </p>
            </div>

            <div className="flex justify-start items-center">
              <div className="flex items-center p-2">
                <FaTrain className="text-gray-500 text-lg" />
                <span className="ml-2 text-sm">
                  {job.jobInfo?.trainLineName}
                </span>
              </div>

              <span className="hidden sm:block border-l border-gray-300 h-5"></span>

              <div className="flex items-center p-2">
                <BiRupee className="text-gray-500 text-lg" />
                <span className="ml-2 text-sm">
                  {job.jobInfo?.minimumSalary} - {job.jobInfo?.maximumSalary}
                </span>
              </div>
            </div>

            <div className="flex items-center p-2">
              <IoLocationOutline className="text-gray-500 text-lg" />
              <span className="ml-2 text-sm">
                {job.cities
                  .map((type) => {
                    return `${type.cityName}`;
                  })
                  .join(" , ")}
              </span>
            </div>

            <div className="flex items-center p-2">
              <GiSkills className="text-gray-500 text-lg" />
              {job.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="ml-2 border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-slate-100"
                >
                  {skill.skillName}
                </span>
              ))}
            </div>

            <div className="p-2">
              <span className="sm:block border-t border-gray-300 w-full"></span>
            </div>

            <div className="flex items-center p-2">
              <div>
                <span className="ml-2 text-sm text-gray-600">
                  Applicants:{" "}
                  <span className="font-bold">
                    {job.jobInfo?.applicationCount}
                  </span>
                </span>
              </div>
              {loginUserId ? (
                // Buttons for logged-in users
                <div className="flex gap-4 items-center ml-auto">
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 sm:px-6 focus:outline-none w-full sm:w-auto"
                    onClick={() => jobApplicationUtility.onApplyJob(paramId)}
                  >
                    Apply Now
                  </button>
                </div>
              ) : (
                // Buttons for guests
                <div className="flex gap-4 items-center ml-auto">
                  <button
                    className="text-blue-600 bg-white border border-blue-600 hover:bg-blue-100 rounded-full px-4 py-2 sm:px-6 focus:outline-none w-full sm:w-auto"
                    onClick={() => navigate("/jobseeker-registration")}
                  >
                    Register to apply
                  </button>
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 sm:px-6 focus:outline-none w-full sm:w-auto"
                    onClick={() => navigate("/login")}
                  >
                    Login to apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SingleJobs;
