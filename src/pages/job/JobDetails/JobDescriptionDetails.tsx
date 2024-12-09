import { useParams } from "react-router-dom";
import JobDetailsUtility from "../../../utilities/job/JobDetailsUtility";

function JobDescriptionDetails() {
  const params = useParams();
  const paramId = params.id ? parseInt(params.id, 10) : 0;

  const job = JobDetailsUtility(paramId);

  return (
    <div className="px-36">
      <div className="mt-5 flex-1 flex flex-col gap-5 rounded h-fit">
        <div className="bg-white border rounded border-gray-200 shadow h-fit p-5">
          {/* Job Description */}
          <div className="p-3">
            <h3 className="font-semibold">Job Description</h3>
            <div
              className="mt-1 text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html:
                  job?.jobInfo?.jobDescription || "No description available.",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionDetails;
