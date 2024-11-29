import { useEffect, useState } from "react";
import SkillModel from "../../model/master/SkillModel";
import { getSkillsAsync } from "../../services/master/SkillService";
import { SnackbarOrigin } from "@mui/material";
import JobSkillModel from "../../model/job/JobSkillModel";
import { createJobInfoAsync } from "../../services/job/JobInfoService";
import { createJobSkillAsync, getJobSkillByJobIdAsync } from "../../services/job/JobSkillService";

const JobSkillUtility = (jobId: number) => {

  // alert(jobId);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] =
    useState<SnackbarOrigin>({
      vertical: "top",
      horizontal: "center",
    });
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >();

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const onJobSkillSave = async () => {

    // Loop through selectedSkills and assign values to JobSkillModel
    const jobSkills: JobSkillModel[] = selectedSkills.map((selectedSkill, index) => ({
      id: 0, // You can set the id as per your requirements
      jobId: jobId,
      skillId: selectedSkill.id, // Assuming selectedSkill has an id property representing skillId
      skillName: ""
    }));


    //alert(JSON.stringify(jobSkills));

    let response = await createJobSkillAsync(jobSkills);
    //alert(JSON.stringify(response));
    if (response.data != null) {
      const snackbarSeverity = response.status === 200 ? "success" : "error";
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      setSnackbarSeverity(snackbarSeverity);
    } else {
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }


  }

  const skills: SkillModel[] = [
  ];

  const [jobSkill, setJobSkill] = useState<SkillModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillModel[]>(skills);

  useEffect(() => {
    if (jobId > 0) {
      fetchJobSkillByJobId();
    }

    fetchJobSkillAsync();
  }, []);


  useEffect(() => {
    setSelectedSkills(selectedSkills);
  }, [selectedSkills]);

  async function fetchJobSkillAsync() {
    try {
      const response = await getSkillsAsync();
      console.log("Skill Name : ",response.data);
      if (response.status === 200 && response.data !== null) {
        setJobSkill(response.data);
      }
    } catch (error) {
      console.error("Error fetching job skills:", error);
    }
  }
  async function fetchJobSkillByJobId() {
    let response = await getJobSkillByJobIdAsync(jobId);
    console.log("Function : ", response);
    // alert(JSON.stringify(response));
    if (response.status === 200) {
      if (response.data != null) {

      const selectedJobSkills: JobSkillModel[] = response.data ? response.data : [response.data];
        // Loop through selectedSkills and assign values to JobSkillModel
        const jobSkills: SkillModel[] = selectedJobSkills.map((selectedSkill, index) => ({
          id: selectedSkill.skillId, // You can set the id as per your requirements
          skillName: selectedSkill.skillName
        }));

        // alert(JSON.stringify(jobSkills));
        setSelectedSkills(jobSkills);
      }
    }
  }


  const onSkillChange = (selectedOptions: any) => {
    setSelectedSkills(selectedOptions || []);
  };



  return {
    jobSkill, onSkillChange, selectedSkills

    , onJobSkillSave
    , snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
}
export default JobSkillUtility;