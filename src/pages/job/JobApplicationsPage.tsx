import JobApplicationUtility from "../../utilities/job/JobApplicationUtility";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";
import { useNavigate, useParams } from "react-router-dom";

const JobApplicationsPage = () => {
  const { paramJobId } = useParams();
  const jobId = paramJobId ?? "0";

  const navigate = useNavigate();

  const jobApplicationRequest: JobApplicationRequest = {
    jobId: parseInt(jobId),
  };

  const { jobApplications, loading } = JobApplicationUtility(
    jobApplicationRequest
  );

  if (loading) {
    return (
      <div className="py-64 px-40 flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-solid"></div>
      </div>
    );
  }

  if (jobApplications.length === 0) {
    return (
      <div className="py-64 px-40 flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-500">
          No job applicants available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="py-10 px-40 flex flex-col">
        <div className="flex items-center gap-5 border-t p-3 bg-blue-400 font-bold text-white">
          <h2 className="w-32 text-center">Sr. No.</h2>
          <h2 className="w-2/5">First Name</h2>
          <h2 className="w-2/5">Last Name</h2>
          <h2 className="w-2/5">Email Address</h2>
          <h2 className="w-2/5">Mobile Number</h2>
          <h2 className="w-2/5">Applied at</h2>
        </div>
        {jobApplications.map((row, index) => (
          <div
            className="flex items-center gap-5 p-3 cursor-pointer hover:bg-slate-100 border shadow-md"
            key={row.jobId}
            onClick={() => navigate(`/profile/${row.userId}`)}
          >
            <h2 className="w-32 text-center">{index + 1}</h2>
            <h2 className="w-2/5">{row.firstName}</h2>
            <h2 className="w-2/5">{row.lastName}</h2>
            <h2 className="w-2/5">{row.emailAddress}</h2>
            <h2 className="w-2/5">{row.mobileNumber}</h2>
            <h2 className="w-2/5">
              {new Date(row.createdAt).toISOString().split("T")[0]}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobApplicationsPage;
