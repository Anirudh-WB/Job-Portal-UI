import React, { useEffect, useState } from "react";
import { LoginModel } from "../model/LoginModels";
import FieldErrorModel from "../model/FieldErrorModel";
import { isValidEmailAddress } from "../common/CommonFunctions";
import { SnackbarOrigin } from "@mui/material";
import { LoginAsync } from "../services/UserService";
import { getSessionValue, setSessionValue } from "./SessionStorageUtility";
import { useNavigate } from "react-router-dom";
import { setStorageValue } from "./LocalStorageUtils";
import { Bounce, toast } from "react-toastify";

const LoginUtility = () => {
  const navigate = useNavigate();
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

  const initialLogin: LoginModel = {
    emailAddress: "",
    password: "",
  };
  const initialErrors: FieldErrorModel[] = [];
  const [login, setLogin] = useState<LoginModel>(initialLogin);
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

  let loginUserId: number = Number(getSessionValue("loginUserId"));
  let userRoleId: number = Number(getSessionValue("userRole"));

  useEffect(() => {
    getSessionValue("loginUserId");
  }, [loginUserId]);

  const onLogin = async () => {
    if (isValidate()) {
      let response;

      response = await LoginAsync(login);
      if (response.data != null && response.status === 200) {
        setSessionValue("accessToken", response.data.accessToken);
        setSessionValue("refreshToken", response.data.accessToken);
        setSessionValue("loginUserId", response.data.userInfo.id);
        setSessionValue("userRole", response.data.userInfo.role);
        setSessionValue(
          "loginUserEmailAddress",
          response.data.userInfo.emailAddress
        );

        localStorage.setItem(
          "userRole",
          response.data.userInfo.role.toString()
        );

        /*Session Storage*/
        setStorageValue("loginUserId", response.data.userInfo.id);
        /*End Session Storage*/

        if (response.data.userInfo.role === "jobseaker") {
          navigate("/job-search");
        } else if (response.data.userInfo.role === "company") {
          navigate("/company-profile");
        } else {
          navigate("/profile");
        }
      }

      response.status === 200
        ? toast.success(response.message, {
            // toastId: "login__toast",
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
            // toastId: "login__toast",
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
    } else {
      setSnackbarMessage("Fields marked in red are required");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }
  };
  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (login.password === "") {
      newErrors.push({
        fieldName: "password",
        errorMessage: "Enter password",
      });
    }
    // Validate email address
    if (login.emailAddress.trim() === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else if (!isValidEmailAddress(login.emailAddress)) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Invalid email address",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setLogin((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onLogout = () => {
    localStorage.clear(); // Clears all data stored in local storage
    sessionStorage.clear(); // Clears all data stored in session storage
    navigate("/login");
  };

  return {
    login,
    onLogin,
    errorInfo,
    onTextFieldChanged,
    snackbarOpen,
    handleSnackbarClose,
    loginUserId,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
    onLogout,
  };
};
export default LoginUtility;
