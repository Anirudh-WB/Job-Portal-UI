import { useEffect, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import { getSessionValue } from "../SessionStorageUtility";
import { getJobInfoByIdAsync } from "../../services/job/JobInfoService";
import { getJobCityByJobIdAsync } from "../../services/job/JobCityService";
import JobCityModel from "../../model/job/JobCityModel";
import { getJobSkillByJobIdAsync } from "../../services/job/JobSkillService";
import JobSkillModel from "../../model/job/JobSkillModel";
import { getSkillsAsync } from "../../services/master/SkillService";

const JobDetailsUtility = (jobId: number) => {
  const loginUserId: number = Number(getSessionValue("loginUserId"));
  const [jobInfo, setJobInfo] = useState<JobInfoModel>();
  const [cities, setCities] = useState<JobCityModel[]>([]);
  const [skills, setSkills] = useState<JobSkillModel[]>([]);


  useEffect(() => {
    fetchJobsInfoAsync();
    getCitiesAsync();
    getSkillAsync()
  }, []);

  async function fetchJobsInfoAsync() {
    try {
      let response = await getJobInfoByIdAsync(jobId);

      if (response.status === 200 && response.data !== null) {
        console.log(response.data);
        setJobInfo(response.data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  async function getCitiesAsync() {
    try {
      let response = await getJobCityByJobIdAsync(jobId);
      if (response.status === 200 && response.data !== null) {
        console.log(response.data);
        setCities(response.data);
      } else {
        console.error("Failed to fetch cities");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  async function getSkillAsync() {
    try {
        let response = await getJobSkillByJobIdAsync(jobId);
        if (response.status === 200 && response.data!== null) {
          console.log(response.data);
          setSkills(response.data);
        } else {
          console.error("Failed to fetch skills");
        }
    } catch (error) {
        console.error("Error fetching skills:", error);
    }
  }

  return {
    loginUserId,
    jobInfo,
    cities,
    skills
  };
};

export default JobDetailsUtility;
