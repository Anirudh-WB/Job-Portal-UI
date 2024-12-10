import React from "react";
import { FaTrain } from "react-icons/fa6";
import { BiRupee } from "react-icons/bi";
import JobSearchResultModel from "../../model/job/JobSearchResultModel";
import JobApplicationUtility from "../../utilities/job/JobApplicationUtility";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";
import { useNavigate } from "react-router-dom";

type Props = {
  job: JobSearchResultModel;
};

const JobCard = (props: Props) => {
  const navigate = useNavigate();
  const jobApplicationRequest: JobApplicationRequest = {
    jobId: 0,
  };
  const jobApplicationUtility = JobApplicationUtility(jobApplicationRequest);

  return (
    <>
      <div className="flex flex-col gap-3 bg-white border rounded-md border-gray-200 shadow-lg p-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1
              className="text-xl font-semibold cursor-pointer"
              onClick={() => navigate(`/job-details/${props.job.id}`)}
            >
              {props.job.jobTitle}
            </h1>
            <p className="text-sm text-gray-600">{props.job.designationName}</p>
          </div>
          <button
            className="bg-blue-600 p-2 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-500 hover:bg-blue-700"
            onClick={() => jobApplicationUtility.onApplyJob(props.job.id)}
          >
            Apply
          </button>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className="flex items-center">
            <FaTrain className="text-gray-500 text-lg" />
            <span className="ml-2 text-sm">{props.job.trainLineName}</span>
          </div>

          <span className="hidden sm:block border-l border-gray-300 h-5"></span>

          <div className="flex items-center">
            <BiRupee className="text-gray-500 text-lg" />
            <span className="ml-2 text-sm">
              {props.job.minimumSalary} - {props.job.maximumSalary}
            </span>
          </div>

          <span className="hidden sm:block border-l border-gray-300 h-5"></span>

          <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
            {props.job.cities.map((city, cityIndex) => (
              <span
                key={cityIndex}
                className="border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-slate-100"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
          <label className="font-semibold text-base">Skills : </label>
          {props.job.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-slate-100"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
          <p
            dangerouslySetInnerHTML={{
              __html:
                props.job.jobDescription.slice(0, 300) +
                (props.job.jobDescription.length > 300
                  ? `... <button onClick="window.location.href='/job-details/${props.job.id}'" class="text-blue-600  text-sm">Read More</button>`
                  : ""),
            }}
            className="font-semibold text-sm"
          ></p>
        </div>
      </div>
    </>
  );
};

export default JobCard;
