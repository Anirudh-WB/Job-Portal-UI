import { useEffect, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import { getJobInfoByIdAsync } from "../../services/job/JobInfoService";
import { getJobCityByJobIdAsync } from "../../services/job/JobCityService";
import JobCityModel from "../../model/job/JobCityModel";
import JobSkillModel from "../../model/job/JobSkillModel";
import { getJobSkillByJobIdAsync } from "../../services/job/JobSkillService";
import { getSessionValue } from "../SessionStorageUtility";

const JobReviewUtility = (jobId: number) => {
  let loginUserId: number = Number(getSessionValue("loginUserId"));
  const initialJobInfo: JobInfoModel = {
    id: 0,
    designationId: "",
    jobDescription: "",
    jobTitle: "",
    maximumSalary: 0,
    minimumSalary: 0,
    trainLineId: "",
    designationName: "",
    trainLineName: "",
    locationCount: 0,
    skillCount: 0,
    userId: loginUserId,
    applicationCount: 0,
  };
  const [jobInfo, setJobInfo] = useState<JobInfoModel>(initialJobInfo);
  const [jobCities, setJobCities] = useState<JobCityModel[]>([]);
  const [jobSkills, setJobSkills] = useState<JobSkillModel[]>([]);

  useEffect(() => {
    if (jobId > 0) {
      fetchJobInfoById();
      fetchJobCityByJobId();
      fetchJobSkillByJobId();
    }
  }, [jobId]);

  async function fetchJobInfoById() {
    let response = await getJobInfoByIdAsync(jobId);
    if (response.status === 200) {
      if (response.data !== null) {
        setJobInfo(response.data);
      }
    }
  }
  async function fetchJobCityByJobId() {
    let response = await getJobCityByJobIdAsync(jobId);

    console.log(response);
    if (response.status === 200) {
      if (response.data != null) {
        setJobCities(response.data);
      }
    }
  }
  async function fetchJobSkillByJobId() {
    let response = await getJobSkillByJobIdAsync(jobId);

    if (response.status === 200) {
      if (response.data != null) {
        setJobSkills(response.data);
      }
    }
  }

  return { jobInfo, jobCities, jobSkills };
};

export default JobReviewUtility;
