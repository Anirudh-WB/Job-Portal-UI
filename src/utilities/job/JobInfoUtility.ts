import React, { useEffect, useRef, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import DesignationModel from "../../model/master/DesignationModel";
import TrainLineModel from "../../model/TrainLineModel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getTrainLines } from "../../services/TrainLineService";
import { getDesignations } from "../../services/master/DesignationService";
import {
  createJobInfoAsync,
  getJobInfoByIdAsync,
  updateJobInfoAsync,
} from "../../services/job/JobInfoService";
import { getSessionValue } from "../SessionStorageUtility";
import { Bounce, toast } from "react-toastify";

const JobInfoUtility = (jobId: number, onUpdateJobId: (id: number) => void) => {
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
  const initialErrors: FieldErrorModel[] = [];
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

  const [jobInfo, setJobInfo] = useState<JobInfoModel>(initialJobInfo);

  const [designations, setDesignations] = useState<DesignationModel[]>([]);
  const [trainLines, setTrainLines] = useState<TrainLineModel[]>([]);

  useEffect(() => {
    async function fetchTrainLines() {
      let response = await getTrainLines();

      if (response.status === 200) {
        if (response.data !== null) {
          setTrainLines(response.data);
        }
      }
    }
    async function fetchDesignations() {
      let response = await getDesignations();
      if (response.status === 200) {
        if (response.data !== null) {
          setDesignations(response.data);
        }
      }
    }
    async function fetchJobInfoById() {
      let response = await getJobInfoByIdAsync(jobId);
      if (response.status === 200) {
        if (response.data !== null) {
          setJobInfo(response.data);
        }
      }
    }

    fetchDesignations();
    fetchTrainLines();

    if (jobId > 0) {
      fetchJobInfoById();
    }
  }, [jobId]);

  const editorRef = useRef<ReactQuill | null>(null);

  const editor = (value: string) => {
    setJobInfo((prev) => ({ ...prev, jobDescription: value }));
  };

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setJobInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onSelectFieldChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setJobInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onJobInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (jobInfo.id > 0) {
        response = await updateJobInfoAsync(jobInfo, jobInfo.id);
      } else {
        response = await createJobInfoAsync(jobInfo);
        if (response.data != null) {
          const responseData = response.data;
          setJobInfo((prev) => ({ ...prev, id: responseData.id }));
          onUpdateJobId(responseData.id);
        }
      }
      console.log("Job info updated : ", jobInfo.jobDescription);

      response.status === 200
        ? toast.success(response.message, {
            // toastId: "company__registration__toast",
            draggable: true,
            closeOnClick: true,
            theme: "colored",
            transition: Bounce,
          })
        : toast.error(response.message, {
            // toastId: "company__registration__toast",
            draggable: true,
            closeOnClick: true,
            theme: "colored",
            transition: Bounce,
          });
    }
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (jobInfo.jobTitle === "") {
      newErrors.push({
        fieldName: "jobTitle",
        errorMessage: "Enter job title ",
      });
    }

    if (jobInfo.minimumSalary === 0) {
      newErrors.push({
        fieldName: "minimumSalary",
        errorMessage: "Enter minimum Salary",
      });
    }

    if (jobInfo.maximumSalary === 0) {
      newErrors.push({
        fieldName: "maximumSalary",
        errorMessage: "Enter maximum Salary",
      });
    }

    if (jobInfo.designationId === "" || jobInfo.designationId === "0") {
      newErrors.push({
        fieldName: "designationId",
        errorMessage: "Select Designation",
      });
    }

    if (jobInfo.trainLineId === "" || jobInfo.trainLineId === "0") {
      newErrors.push({
        fieldName: "trainLineId",
        errorMessage: "Select Train Line",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    jobInfo,
    errorInfo,
    onTextFieldChanged,
    onSelectFieldChanged,
    designations,
    trainLines,
    editor,
    editorRef,
    onJobInfoSave,
  };
};
export default JobInfoUtility;
