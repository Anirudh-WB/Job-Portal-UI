import { useState } from "react";
import JobseekerRegistrationModel from "../../model/auth/JobseekerRegistrationModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { SnackbarOrigin } from "@mui/material";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import { createJobseekerRegistrationAsync } from "../../services/auth/JobseekerRegistrationService";
import { Bounce, toast } from "react-toastify";
const initialJobseekerRegistration: JobseekerRegistrationModel = {
  emailAddress: "test@test.com",
  firstName: "a",
  lastName: "a",
  password: "Abcd@1234",
  roleId: 7,
  mobileNo: "a",
  confirmPassword: "Abcd@1234",
};
const initialErrors: FieldErrorModel[] = [];
const JobseekerRegistrationUtility = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] = useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >();

  const [jobseekerRegistration, setJobseekerRegistration] =
    useState<JobseekerRegistrationModel>(initialJobseekerRegistration);

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
  const onJobseekerRegistration = async () => {
    if (isValidate()) {
      const response = await createJobseekerRegistrationAsync(
        jobseekerRegistration
      );
      // if (response.data != null && response.status === 200 ) {

      // }else{

      // }

      response.status === 200
        ? toast.success(response.message, {
            // toastId: "jobseeker__registration__toast",
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
            // toastId: "jobseeker__registration__toast",
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
    setJobseekerRegistration((previous) => ({ ...previous, [name]: value }));

    setErrorInfo((previous) => {
      if (value !== "") {
        return previous.filter((error) => error.fieldName !== name);
      }
      return previous;
    });
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];
    if (jobseekerRegistration.firstName === "") {
      newErrors.push({
        fieldName: "firstName",
        errorMessage: "Enter first name",
      });
    }
    if (jobseekerRegistration.lastName === "") {
      newErrors.push({
        fieldName: "lastName",
        errorMessage: "Enter last name",
      });
    }
    if (jobseekerRegistration.mobileNo === "") {
      newErrors.push({
        fieldName: "mobileNo",
        errorMessage: "Enter mobile number",
      });
    }
    if (jobseekerRegistration.emailAddress === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else {
      if (!isValidEmailAddress(jobseekerRegistration.emailAddress)) {
        newErrors.push({
          fieldName: "emailAddress",
          errorMessage: "Enter valid email address",
        });
      }
    }
    if (jobseekerRegistration.password === "") {
      newErrors.push({
        fieldName: "password",
        errorMessage: "Enter password",
      });
    }
    if (jobseekerRegistration.confirmPassword === "") {
      newErrors.push({
        fieldName: "confirmPassword",
        errorMessage: "Enter confirm password",
      });
    }

    if (
      jobseekerRegistration.confirmPassword !== "" &&
      jobseekerRegistration.password !== ""
    ) {
      // Regex for password validation: Minimum 5 characters, at least one letter, one uppercase letter, one number, and one special character
      //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\\\/\-_\+;]).{5,}$/;

      if (
        jobseekerRegistration.confirmPassword !== jobseekerRegistration.password
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
      if (!passwordRegex.test(jobseekerRegistration.password)) {
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
    jobseekerRegistration,
    onJobseekerRegistration,
    onTextFieldChange,
    errorInfo,
    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
};
export default JobseekerRegistrationUtility;
//export default JobseekerRegistrationService;
