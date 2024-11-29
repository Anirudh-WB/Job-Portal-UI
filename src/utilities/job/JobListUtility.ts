import { useEffect, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import { getJobInfosAsync } from "../../services/job/JobInfoService";
import { useNavigate } from "react-router-dom";
import { getJobSkillByJobIdAsync } from "../../services/job/JobSkillService";

const JobListUtility = () => {
    const[jobs, setJobs] = useState<JobInfoModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        fetchJobsAsync()

    }, []);

    async function fetchJobsAsync() {
        let response = await getJobInfosAsync();

        if (response.status === 200) {
            if (response.data !== null) {
                setJobs(response.data);
                console.log(response.data);
            }
        } else {
            // alert(response.message);
        }
    }

    const editJob = (id: number) => {
        navigate(`/job/${id}`);
    };


    return {jobs,editJob}

}

export default JobListUtility;