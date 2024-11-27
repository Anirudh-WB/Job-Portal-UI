import { useEffect, useState } from "react";
import JobApplicationModel from "../../model/job/JobApplicationModel";
import { createJobApplicationAsync, getJobApplicationsAsync } from "../../services/job/JobApplicationService";
import { getSessionValue } from "../SessionStorageUtility";
import JobApplicationViewModel from "../../model/job/JobApplicationViewModel";
import { useParams } from "react-router-dom";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";

const JobApplicationUtility = (jobApplicationRequest:  JobApplicationRequest ) => {
    const [jobApplication, setJobApplication] = useState<JobApplicationModel>();
    const [jobApplications, setJobApplications] = useState<JobApplicationViewModel[]>([]);
    //const { paramJobId } = useParams();
    //GetJobApplicationsAsync
   // alert(jobApplicationRequest.jobId);

    useEffect(() => {
        async function fetchJobApplicationsAsync() {

           // alert(JSON.stringify(jobApplicationRequest))
          
            let response = await getJobApplicationsAsync(jobApplicationRequest);

            if (response.status === 200) {
                if (response.data !== null) {
                    setJobApplications(response.data);
                }
            } else {
                // alert(response.message);
            }
        }
        fetchJobApplicationsAsync();
    }, [jobApplicationRequest.jobId]);

    const onApplyJob = async (id: number) => {
       // alert(id);
       let loginUserId: number = Number(getSessionValue("loginUserId"));
        const jobApplicationModel : JobApplicationModel = {
            applyDate : new Date(),
            jobId : id,
            userId : loginUserId,
            id:0
        }


        alert(JSON.stringify(jobApplicationModel));
        let response = await createJobApplicationAsync(jobApplicationModel);
        alert(JSON.stringify(response));
    }

    const onJobApplicationSave= async(jobApplicationModel : JobApplicationModel)=>{
        alert(JSON.stringify(jobApplicationModel));

        let response = await createJobApplicationAsync(jobApplicationModel);
        alert(JSON.stringify(response));
    }

    return { jobApplication , onJobApplicationSave, onApplyJob, jobApplications};
    }
    export default JobApplicationUtility;