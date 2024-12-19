import { useEffect, useState } from "react";
import JobApplicationModel from "../../model/job/JobApplicationModel";
import {
  createJobApplicationAsync,
  getJobApplicationsAsync,
} from "../../services/job/JobApplicationService";
import { getSessionValue } from "../SessionStorageUtility";
import JobApplicationViewModel from "../../model/job/JobApplicationViewModel";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";
import { Bounce, toast } from "react-toastify";

const JobApplicationUtility = (
  jobApplicationRequest: JobApplicationRequest
) => {
  const [jobApplications, setJobApplications] = useState<
    JobApplicationViewModel[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    async function fetchJobApplicationsAsync() {
      setLoading(true); // Set loading to true
      try {
        let response = await getJobApplicationsAsync(jobApplicationRequest);

        if (response.status === 200 && response.data !== null) {
          setJobApplications(response.data);
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobApplicationsAsync();
  }, []);

  const onApplyJob = async (id: number) => {
    setLoading(true);
    try {
      let loginUserId: number = Number(getSessionValue("loginUserId"));
      const jobApplicationModel: JobApplicationModel = {
        applyDate: new Date(),
        jobId: id,
        userId: loginUserId,
        id: 0,
      };

      const res = await createJobApplicationAsync(jobApplicationModel);
      res.status === 200
        ? toast.success(res.message, {
            toastId: "application__toast",
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
        : toast.error(res.message, {
          toastId: "application__toast",
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
    } catch (error: any) {
      // Extract and show the error message from the response
      const errorMessage =
        error?.response?.data?.message ||
        "Error applying for job. Please try again.";
      toast.error(errorMessage);

      console.error("Error applying for job:", error);
    } finally {
      setLoading(false);
    }
  };

  const onJobApplicationSave = async (
    jobApplicationModel: JobApplicationModel
  ) => {
    setLoading(true);
    try {
      await createJobApplicationAsync(jobApplicationModel);
    } catch (error) {
      console.error("Error saving job application:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    onJobApplicationSave,
    onApplyJob,
    jobApplications,
    loading,
  };
};

export default JobApplicationUtility;
