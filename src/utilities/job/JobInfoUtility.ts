import React, { useEffect, useRef, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { SelectChangeEvent, SnackbarOrigin } from "@mui/material";
import DesignationModel from "../../model/master/DesignationModel";
import TrainLineModel from "../../model/TrainLineModel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  Editor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [content, setContent] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] = useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >();

  const [editorContent, setEditorContent] = useState(
    "<p>Write job <b>description 2</b>!</p>"
  );
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

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

  const editorRef = useRef<ReactQuill | null>(null); // Type the ref

  const editor = (value: string) => {
    setJobInfo((prev) => ({ ...prev, jobDescription: value }));
  };

  useEffect(() => {
    // If jobInfo.jobDescription changes, update the editor content
    if (jobInfo.jobDescription) {
      if (editorRef.current) {
        const quill = editorRef.current.getEditor(); // Access Quill instance
        if (quill) {
          quill.root.innerHTML = jobInfo.jobDescription;
        }
      }
    }
  }, [jobInfo.jobDescription]);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setJobInfo((prev) => ({ ...prev, [name]: value }));

    // Remove error message for the current field
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
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
        : toast.error(response.message, {
            // toastId: "company__registration__toast",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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

    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
};
export default JobInfoUtility;
