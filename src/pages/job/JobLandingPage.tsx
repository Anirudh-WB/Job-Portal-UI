import { getSessionValue } from "../../utilities/SessionStorageUtility";
import CompanyHeader from "./CompanyHeaders/CompanyHeader";
import JobsPage from "./JobList/JobsPage";


function JobLandingPage() {

  let loginUserId : number = Number(getSessionValue("loginUserId"))
  
  return (
    <div className="py-8 px-44 w-full h-full overflow-auto flex flex-col gap-5">
      <CompanyHeader loginUserId={loginUserId} />
      <JobsPage companyId={loginUserId}/>
    </div>
  );
}

export default JobLandingPage;
