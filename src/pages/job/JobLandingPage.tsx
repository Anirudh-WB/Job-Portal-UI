import CompanyHeader from "./CompanyHeaders/CompanyHeader";
import JobsPage from "./JobList/JobsPage";

function JobLandingPage() {
  return (
    <div className="py-8 px-44 w-full h-full overflow-auto flex flex-col gap-5">
      <CompanyHeader />
      <JobsPage/>
    </div>
  );
}

export default JobLandingPage;
