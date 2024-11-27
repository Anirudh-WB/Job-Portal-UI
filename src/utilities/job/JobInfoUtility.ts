import React, { useEffect, useState } from "react";
import JobInfoModel from "../../model/job/JobInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { SelectChangeEvent, SnackbarOrigin } from "@mui/material";
import DesignationModel from "../../model/master/DesignationModel";
import TrainLineModel from "../../model/TrainLineModel";

import { EditorProvider, FloatingMenu, BubbleMenu, Editor, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import { getTrainLines } from "../../services/TrainLineService";
import { getDesignations } from "../../services/master/DesignationService";
import { createJobInfoAsync, getJobInfoByIdAsync, updateJobInfoAsync } from "../../services/job/JobInfoService";
import { getSessionValue } from "../SessionStorageUtility";


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
        designationName : "",
        trainLineName : "",
        locationCount:0,
        skillCount:0,
        userId : loginUserId,
        applicationCount:0

    }
    const initialErrors: FieldErrorModel[] = [];
    const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

    const [jobInfo, setJobInfo] = useState<JobInfoModel>(initialJobInfo);

    const [designations, setDesignations] = useState<DesignationModel[]>([]);
    const [trainLines, setTrainLines] = useState<TrainLineModel[]>([]);
    //alert(jobId);
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

    const [editorContent, setEditorContent] = useState("<p>Write job <b>description 2</b>!</p>");
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
            } else {
                // alert(response.message);
            }
        }
        async function fetchDesignations() {
            let response = await getDesignations();
            if (response.status === 200) {
                if (response.data !== null) {
                    setDesignations(response.data);
                }
            } else {
                // alert(response.message);
            }
        }
        async function fetchJobInfoById() {
            let response = await getJobInfoByIdAsync(jobId);
            //alert(JSON.stringify(response));
            if (response.status === 200) {
                if (response.data !== null) {
                    setJobInfo(response.data);

                    //const test123 = response.data.jobDescription;
                   // setEditorContent(test123);

                   // alert(test123)


                    //setJobInfo((pre)=>({ ...pre, jobDescription : "sdsadsadsa"}))
                    // setJobInfo((prev) => ({ ...prev, ["jobDescription"]: editor.getHTML() }));
                }
            } else {
                // alert(response.message);
            }
        }

        fetchDesignations();
        fetchTrainLines();

        if (jobId > 0) {
            fetchJobInfoById();
        }

    }, [jobId]);



    const editor = useEditor({
        extensions: [StarterKit],
        content: editorContent,


        //content: content,

        onUpdate: ({ editor }) => {
           // alert("a");
            // setEditorContent(editor.getHTML()); 

            setJobInfo((prev) => ({ ...prev, ["jobDescription"]: editor.getHTML() }));
        },
       


    });
    


    useEffect(() => {
        if (editor && !editor.isDestroyed) {
            editor.commands.setContent(jobInfo.jobDescription);
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

    const onSelectFieldChanged = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setJobInfo((prev) => ({ ...prev, [name]: value }));

        setErrorInfo((prevErrors) => {
            const newErrors = prevErrors.filter((error) => error.fieldName !== name);
            return newErrors;
        });
    };

    // const onJobInfoSave = async () => {
    //     alert(JSON.stringify(jobInfo));
    // }
    const onJobInfoSave = async () => {
        //  alert(JSON.stringify(jobInfo));
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

            const snackbarSeverity = response.status === 200 ? "success" : "error";
            setSnackbarMessage(response.message);
            setSnackbarOpen(true);
            setSnackbarSeverity(snackbarSeverity);

            //  alert(JSON.stringify(response));
        } else {
            setSnackbarMessage("Fields marked in red are required");
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
        }
        //alert(JSON.stringify(addressInfo));
    };

    const isValidate = () => {
        const newErrors: FieldErrorModel[] = [];

        if (jobInfo.jobTitle === "") {
            newErrors.push({
                fieldName: "jobTitle",
                errorMessage: "Enter job title ",
            });
        }

        if (jobInfo.maximumSalary === 0) {
            newErrors.push({
                fieldName: "maximumSalary",
                errorMessage: "Enter maximumSalary",
            });
        }



        if (jobInfo.designationId ==="" || jobInfo.designationId==="0"){
            newErrors.push({
                fieldName: "designationId",
                errorMessage: "Select Designation",
            });
        }

        if (jobInfo.trainLineId ==="" || jobInfo.trainLineId==="0"){
            newErrors.push({
                fieldName: "trainLineId",
                errorMessage: "Select Train Line",
            });
        }
        



        setErrorInfo(newErrors);
        return newErrors.length === 0;
    };


    return {
        jobInfo, errorInfo, onTextFieldChanged, onSelectFieldChanged, designations, trainLines, editor, onJobInfoSave,



        snackbarOpen,
        handleSnackbarClose,
        snackbarMessage,
        snackbarPosition,
        snackbarSeverity,
    }
}
export default JobInfoUtility;