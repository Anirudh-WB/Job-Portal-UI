import JobListUtility from "../../../utilities/job/JobListUtility";
import CompanyJobInfo from "../CompanyHeaders/CompanyJobInfo";
import { FaTrain, FaUser } from "react-icons/fa6";
import { BiRupee } from "react-icons/bi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type Props = { companyId: number };

function JobsPage({ companyId }: Props) {
  const navigate = useNavigate();
  const utility = JobListUtility(companyId);

  return (
    <div className="flex gap-10 w-full">
      <CompanyJobInfo />
      <div className="flex flex-col gap-5 w-full">
        {utility.loading ? (
          <div className="py-32 px-2 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-solid"></div>
          </div>
        ) : utility.jobs.length === 0 ? (
          // No jobs found case
          <div className="py-32 px-2 flex flex-col items-center">
            <h2 className="text-gray-600 text-xl font-semibold">
              No jobs posted yet.
            </h2>
          </div>
        ) : (
          // Jobs found case
          utility.jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-3 bg-white border rounded-md border-gray-200 shadow-lg p-5"
            >
              <div className="flex flex-col gap">
                <div className="flex flex-1 items-center">
                  <div className="flex flex-1 items-center gap-3">
                    <h1 className="text-xl font-semibold">{job.jobTitle}</h1>
                    <button onClick={() => utility.editJob(job.id)}>
                      <FiEdit2 className="text-sm text-gray-700 mt-1" />
                    </button>
                    {/* <button onClick={() => utility.deleteJobAsync(job.id)}>
                      <FiTrash2 className="text-sm text-gray-700 mt-1" />
                    </button> */}
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex items-center"
                      onClick={() => navigate(`/job-applications/${job.id}`)}
                    >
                      <FaUser className="text-xs text-gray-700" />
                      <span className="ml-1 text-sm">
                        {job.applicationCount} Applied
                      </span>
                    </button>
                  </div>
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
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      job.jobDescription.slice(0, 300) +
                      (job.jobDescription.length > 300
                        ? `... <button onClick="window.location.href='/job-details/${job.id}'" class="text-blue-600  text-sm">Read More</button>`
                        : ""),
                  }}
                  className="font-semibold text-sm"
                ></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobsPage;
