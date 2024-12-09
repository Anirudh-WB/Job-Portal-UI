import React, { useState } from "react";
import PreferredSkillPage from "./PreferredSkillPage";
import PreferredLocationPage from "./PreferredCityPage";
import JobPreviewPage from "./JobPreviewPage";
import JobInfoPage from "./JobInfoPage";
import { useParams } from "react-router-dom";
import QuickLinks from "./QuickLinks";

const JobPage: React.FC = () => {
  const { id } = useParams();
  const idx: number = id ? parseInt(id, 10) : 0;

  const [jobId, setJobId] = useState(idx);

  const handleJobIdChange = (newJobId: number) => {
    setJobId(newJobId);
    console.log({ newJobId });
  };

  return (
    <div className="py-8 px-40 w-full h-full overflow-auto flex flex-1 gap-5">
      <QuickLinks />

      <div className="flex flex-col gap-5 w-full">
        <JobInfoPage parentJobId={jobId} onUpdateJobId={handleJobIdChange} />
        <PreferredSkillPage parentJobId={jobId} />
        <PreferredLocationPage parentJobId={jobId} />
        {/* <JobPreviewPage parentJobId={jobId} /> */}
      </div>
    </div>
  );
};

export default JobPage;
