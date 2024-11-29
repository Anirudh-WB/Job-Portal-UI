import JobListUtility from "../../../utilities/job/JobListUtility";
import CompanyJobInfo from "../CompanyHeaders/CompanyJobInfo";
import { FaTrain } from "react-icons/fa6";
import { BiRupee } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
const JobsPage: React.FC = () => {
  const utility = JobListUtility();
  return (
    <div className="flex gap-10 w-full">
      <CompanyJobInfo />
      <div className="flex flex-col gap-5 w-full">
        {utility.jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col gap-3 bg-white border rounded-md border-gray-200 shadow-lg p-5"
          >
            <div className="flex flex-col gap">
              <div className="flex flex-1 items-center gap-3">
                <h1 className="text-xl font-semibold">{job.jobTitle}</h1>
                <button onClick={() => utility.editJob(job.id)}>
                  <FiEdit2 className="text-sm text-gray-700 mt-1" />
                </button>
              </div>
              <p className="text-sm text-gray-600">{job.designationName}</p>
            </div>

            <div className="flex justify-start items-center gap-2">
              <div className="flex items-center">
                <FaTrain className="text-gray-500 text-lg" />
                <span className="ml-2 text-sm">{job.trainLineName}</span>
              </div>

              <span className="hidden sm:block border-l border-gray-300 h-5"></span>

              <div className="flex items-center">
                <BiRupee className="text-gray-500 text-lg" />
                <span className="ml-2 text-sm">
                  {job.minimumSalary} - {job.maximumSalary}
                </span>
              </div>

              <span className="hidden sm:block border-l border-gray-300 h-5"></span>

              <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
                <span>Skill count :</span>
                <span className="ml-2 text-sm">{job.skillCount}</span>
              </div>

              <span className="hidden sm:block border-l border-gray-300 h-5"></span>

              <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
                <span>Location count :</span>
                <span className="ml-2 text-sm">{job.locationCount}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
              <h3 className="font-semibold text-sm">
                {job.jobDescription}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
