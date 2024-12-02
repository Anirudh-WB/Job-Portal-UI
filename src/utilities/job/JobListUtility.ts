import { useEffect, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import { getJobInfosAsync } from "../../services/job/JobInfoService";
import { useNavigate } from "react-router-dom";

const JobListUtility = () => {
  const [jobs, setJobs] = useState<JobInfoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobsAsync();
  }, []);

  async function fetchJobsAsync() {
    setLoading(true);
    try {
      let response = await getJobInfosAsync();

      if (response.status === 200 && response.data !== null) {
        setJobs(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  const editJob = (id: number) => {
    navigate(`/job/${id}`);
  };

  return { jobs, editJob, loading };
};

export default JobListUtility;
