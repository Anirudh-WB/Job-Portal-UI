import React from "react";
import { FaTrain } from "react-icons/fa6";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import JobReviewUtility from "../../../utilities/job/JobReviewUtility";

const JobPreviewPage: React.FC<{ parentJobId: number }> = ({ parentJobId }) => {
  const utility = JobReviewUtility(parentJobId);
  //alert(JSON.stringify(utility))
  return (
    <>
      <div className="flex flex-col gap-3 bg-white border rounded-md border-gray-200 shadow-lg p-5">
        <div className="flex flex-col gap">
          <h1 className="text-xl font-semibold">{utility.jobInfo.jobTitle}</h1>
          <p className="text-sm text-gray-600">
            {utility.jobInfo.designationName}
          </p>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className="flex items-center">
            <FaTrain className="text-gray-500 text-lg" />
            <span className="ml-2 text-sm">
              {utility.jobInfo.trainLineName}
            </span>
          </div>

          <span className="hidden sm:block border-l border-gray-300 h-5"></span>

          <div className="flex items-center">
            <BiRupee className="text-gray-500 text-lg" />
            <span className="ml-2 text-sm">
              {utility.jobInfo.minimumSalary} - {utility.jobInfo.maximumSalary}
            </span>
          </div>

          <span className="hidden sm:block border-l border-gray-300 h-5"></span>

          <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
            {utility.jobCities.map((city, cityIndex) => (
              <span
                key={cityIndex}
                className="border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-slate-100"
              >
                {city.cityName}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
          <label className="font-semibold text-base">Skills : </label>
          {utility.jobSkills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-slate-100"
            >
              {skill.skillName}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
          <h3 className="font-semibold text-sm">
            {utility.jobInfo.jobDescription}
          </h3>
        </div>
      </div>
    </>
  );
};

export default JobPreviewPage;