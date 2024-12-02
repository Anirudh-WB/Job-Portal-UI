import { useEffect, useState } from "react";
import SkillModel from "../../model/master/SkillModel";
import { getSkillsAsync } from "../../services/master/SkillService";
import { createJobSkillAsync, getJobSkillByJobIdAsync } from "../../services/job/JobSkillService";
import JobSkillModel from "../../model/job/JobSkillModel";
import { toast } from "react-toastify";

const JobSkillUtility = (jobId: number) => {
  const [jobSkill, setJobSkill] = useState<SkillModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillModel[]>([]);

  useEffect(() => {
    if (jobId > 0) {
      fetchJobSkillByJobId();
    }
    fetchJobSkillAsync();
  }, []);

  async function fetchJobSkillAsync() {
    try {
      const response = await getSkillsAsync();
      if (response.status === 200 && response.data !== null) {
        setJobSkill(response.data);
      }
    } catch (error) {
      console.error("Error fetching job skills:", error);
    }
  }

  async function fetchJobSkillByJobId() {
    try {
      const response = await getJobSkillByJobIdAsync(jobId);
      if (response.status === 200 && response.data !== null) {
        const selectedJobSkills: SkillModel[] = response.data.map(
          (selectedSkill: JobSkillModel) => ({
            id: selectedSkill.skillId,
            skillName: selectedSkill.skillName,
          })
        );
        setSelectedSkills(selectedJobSkills);
      }
    } catch (error) {
      console.error("Error fetching job skills by job ID:", error);
    }
  }

  const onSkillChange = (selectedOptions: SkillModel[]) => {
    setSelectedSkills(selectedOptions || []);
  };

  const onJobSkillSave = async () => {
    const jobSkills: JobSkillModel[] = selectedSkills.map((selectedSkill) => ({
      id: 0, 
      jobId: jobId,
      skillId: selectedSkill.id,
      skillName: "",
    }));

    try {
      const response = await createJobSkillAsync(jobSkills);
      if (response.status === 200) {
        toast.success(response.message, { position: "top-right", theme: "colored" });
      } else {
        toast.error(response.message, { position: "top-right", theme: "colored" });
      }
    } catch (error) {
      toast.error("Error saving job skills", { position: "top-right", theme: "colored" });
    }
  };

  return {
    jobSkill,
    selectedSkills,
    onSkillChange,
    onJobSkillSave,
  };
};

export default JobSkillUtility;
