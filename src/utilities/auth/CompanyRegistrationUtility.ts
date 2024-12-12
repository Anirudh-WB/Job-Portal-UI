import { useState } from "react";

import FieldErrorModel from "../../model/FieldErrorModel";
import { SnackbarOrigin } from "@mui/material";
import { isValidEmailAddress } from "../../common/CommonFunctions";

import CompanyRegistrationModel from "../../model/auth/CompanyRegistrationModel";
import { createCompanyRegistrationAsync } from "../../services/auth/CompanyRegistrationService";
import { Bounce, toast } from "react-toastify";
const initialCompanyRegistration: CompanyRegistrationModel = {
  emailAddress: "",
  companyName: "",
  password: "",
  roleId: 8,
  mobileNo: "",
  confirmPassword: "",
};
const initialErrors: FieldErrorModel[] = [];
const CompanyRegistrationUtility = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] = useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >();

  const [companyRegistration, setCompanyRegistration] =
    useState<CompanyRegistrationModel>(initialCompanyRegistration);

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const onCompanyRegistration = async () => {
    if (isValidate()) {
      const response = await createCompanyRegistrationAsync(
        companyRegistration
      );

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

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setCompanyRegistration((previous) => ({ ...previous, [name]: value }));

    setErrorInfo((previous) => {
      if (value !== "") {
        return previous.filter((error) => error.fieldName !== name);
      }
      return previous;
    });
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];
    if (companyRegistration.companyName === "") {
      newErrors.push({
        fieldName: "companyName",
        errorMessage: "Enter Company Name",
      });
    }
    if (companyRegistration.mobileNo === "") {
      newErrors.push({
        fieldName: "mobileNo",
        errorMessage: "Enter mobile number",
      });
    }
    if (companyRegistration.emailAddress === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else {
      if (!isValidEmailAddress(companyRegistration.emailAddress)) {
        newErrors.push({
          fieldName: "emailAddress",
          errorMessage: "Enter valid email address",
        });
      }
    }
    if (companyRegistration.password === "") {
      newErrors.push({
        fieldName: "password",
        errorMessage: "Enter password",
      });
    }
    if (companyRegistration.confirmPassword === "") {
      newErrors.push({
        fieldName: "confirmPassword",
        errorMessage: "Enter confirm password",
      });
    }

    if (
      companyRegistration.confirmPassword !== "" &&
      companyRegistration.password !== ""
    ) {
      // Regex for password validation: Minimum 5 characters, at least one letter, one uppercase letter, one number, and one special character
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
      // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\\\/\-_\+;]).{5,}$/;

      if (
        companyRegistration.confirmPassword !== companyRegistration.password
      ) {
        newErrors.push({
          fieldName: "confirmPassword",
          errorMessage: "Password not match",
        });
        newErrors.push({
          fieldName: "password",
          errorMessage: "Password not match",
        });
      }

      // Regex for password validation: Minimum 5 characters, at least one letter, one uppercase letter, one number, and one special character
      // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
      if (!passwordRegex.test(companyRegistration.password)) {
        newErrors.push({
          fieldName: "password",
          errorMessage:
            "Password must be at least 5 characters long, contain at least one letter, one uppercase letter, one number, and one special character",
        });
      }
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    companyRegistration,
    onCompanyRegistration,
    onTextFieldChange,
    errorInfo,
    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
};
export default CompanyRegistrationUtility;
//export default CompanyRegistrationService;
