import React, { useEffect, useState } from "react";
import AcademicInfoModel from "../../model/profile/AcademicInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import {
  createAcademicInfoAsync,
  deleteAcademicInfoAsync,
  getAcademicInfoAsync,
  updateAcademicInfoAsync,
} from "../../services/profile/AcademicInfoService";
import { SnackbarOrigin } from "@mui/material";

function AcademicInfoModalUtility(loginUserId: number, academicInfoId: number) {
  const intialAcademicInfo: AcademicInfoModel = {
    id: 0,
    degree: "",
    institutionName: "",
    startYear: 0,
    endYear: 0,
    percentage: 0,
    userId: loginUserId,
  };
  const initialErrors: FieldErrorModel[] = [];

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarPosition, setSnackbarPosition] =
    React.useState<SnackbarOrigin>({
      vertical: "top",
      horizontal: "center",
    });
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >();

  const [academicInfo, setAcademicInfo] =
    useState<AcademicInfoModel>(intialAcademicInfo);

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

  useEffect(() => {
    const onAcademicInfoEdit = async (id: number) => {
      let response;
      response = await getAcademicInfoAsync(id);
      if (response.data != null) {
        setAcademicInfo(response.data);
      }
    };

    if (academicInfoId > 0) {
      onAcademicInfoEdit(academicInfoId);
    }
    console.log(academicInfo);
  }, [academicInfoId]);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setAcademicInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onAcademicInfoDelete = async (id: number) => {
    let response = await deleteAcademicInfoAsync(id);
    if (response.status === 200) {
      //   fetchAcademicInfo();
    }
    const snackbarSeverity = response.status === 200 ? "success" : "error";
    setSnackbarMessage(response.message);
    setSnackbarOpen(true);
    setSnackbarSeverity(snackbarSeverity);
  };

  const onAddAcademicInfo = async () => {
    setAcademicInfo(intialAcademicInfo);
  };

  const onAcademicInfoSave = async () => {
    // alert(JSON.stringify(academicInfo));
    if (isValidate()) {
      let response;
      if (academicInfo.id > 0) {
        response = await updateAcademicInfoAsync(academicInfo, academicInfo.id);
      } else {
        response = await createAcademicInfoAsync(academicInfo);
        if (response.data != null) {
          const responseData = response.data;
          setAcademicInfo((prev) => ({ ...prev, id: responseData.id }));
        }
      }
      if (response.status === 200) {
        // fetchAcademicInfo();
        setAcademicInfo(intialAcademicInfo);
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
    //alert(JSON.stringify(academicInfo));
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (academicInfo.institutionName === "") {
      newErrors.push({
        fieldName: "institutionName",
        errorMessage: "Enter institution name",
      });
    }

    if (academicInfo.degree === "") {
      newErrors.push({
        fieldName: "degree",
        errorMessage: "Enter degree",
      });
    }

    if (academicInfo.startYear === 0) {
      newErrors.push({
        fieldName: "startYear",
        errorMessage: "Enter start year",
      });
    } else {
      const currentYear = new Date().getFullYear();
      const startYearString = academicInfo.startYear.toString(); // Convert to string
      if (startYearString.length !== 4 || isNaN(parseInt(startYearString))) {
        // Check if it's not 4 characters or not a valid number
        newErrors.push({
          fieldName: "startYear",
          errorMessage:
            "Invalid start year format (example: " + currentYear + ")",
        });
      }
    }

    if (academicInfo.endYear === 0) {
      newErrors.push({
        fieldName: "endYear",
        errorMessage: "Enter end year",
      });
    } else {
      const currentYear = new Date().getFullYear();
      const endYearString = academicInfo.endYear.toString(); // Convert to string
      if (endYearString.length !== 4 || isNaN(parseInt(endYearString))) {
        // Check if it's not 4 characters or not a valid number
        newErrors.push({
          fieldName: "endYear",
          errorMessage:
            "Invalid end year format (example: " + currentYear + ")",
        });
      }
    }

    if (academicInfo.percentage === 0) {
      newErrors.push({
        fieldName: "percentage",
        errorMessage: "Enter percentage",
      });
    } else if (academicInfo.percentage > 100) {
      newErrors.push({
        fieldName: "percentage",
        errorMessage: "Percentage cannot be greater than 100",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    academicInfo,
    onTextFieldChanged,
    onAcademicInfoSave,
    errorInfo,
    onAcademicInfoDelete,
    onAddAcademicInfo,
    snackbarOpen,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
}

export default AcademicInfoModalUtility;
