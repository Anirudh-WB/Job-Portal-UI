import React, { useEffect, useState } from "react";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import {
  createPersonalInfoAsync,
  getPersonalInfoByUserIdAsync,
  updatePersonalInfoAsync,
} from "../../services/profile/PersonalInfoService";
import { SnackbarOrigin } from "@mui/material";
import { Bounce, toast } from "react-toastify";

const PersonalInfoUtility = (loginUserId: number) => {
  const initialPersonalInfo: PersonalInfoModel = {
    id: 0,
    firstName: "default",
    lastName: "",
    emailAddress: "tee@test.com",
    mobileNumber: "1236897",
    phoneNumber: "",
    description: "",
    isActive: true,
    userId: loginUserId,
  };
  const initialErrors: FieldErrorModel[] = [];
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfoModel>(initialPersonalInfo);
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

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
    getPersonalInfo(loginUserId);
  }, [loginUserId]);

  async function getPersonalInfo(loginUserId: number) {
    let response = await getPersonalInfoByUserIdAsync(loginUserId);
    if (response.status === 200) {
      if (response.data !== null) {
        setPersonalInfo(response.data);
      }
    }
  }

  //PersonalInfoService
  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setPersonalInfo((prev) => ({ ...prev, [name]: value }));

    // Remove error message for the current field
    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onPersonalInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (personalInfo.id > 0) {
        response = await updatePersonalInfoAsync(personalInfo, personalInfo.id);
      } else {
        response = await createPersonalInfoAsync(personalInfo);
        if (response.data != null && response.status === 200) {
          const responseData = response.data;
          setPersonalInfo((prev) => ({ ...prev, id: responseData.id }));
        }
      }

      response.status === 200
        ? toast.success("Personal Info Updated", {
            // toastId: "personal__info__toast",
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
        : toast.error(response.message, {
            // toastId: "personal__info__toast",
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
    } else {
      toast.error("All conditions marked in red are compulsory", {
        // toastId: "personal__info__toast",
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  
  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (personalInfo.firstName === "") {
      newErrors.push({
        fieldName: "firstName",
        errorMessage: "Enter firts name",
      });
    }
    // Validate email address
    if (personalInfo.emailAddress.trim() === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else if (!isValidEmailAddress(personalInfo.emailAddress)) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Invalid email address",
      });
    }

    if (personalInfo.mobileNumber === "") {
      newErrors.push({
        fieldName: "mobileNumber",
        errorMessage: "Enter Mobile Number ",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    personalInfo,
    setPersonalInfo,
    onTextFieldChanged,
    onPersonalInfoSave,
    errorInfo,
    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
};
export default PersonalInfoUtility;
