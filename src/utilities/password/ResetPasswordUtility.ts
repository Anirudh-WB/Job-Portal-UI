import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { ResetPasswordAsync } from "../../services/password/ResetPasswordService";
import FieldErrorModel from "../../model/FieldErrorModel";
import ResetPassworRequest from "../../model/password/ResetPasswordRequest";
import { useNavigate, useParams } from "react-router-dom";

const initialResetPassword: ResetPassworRequest = {
  newPassword: "",
  confirmPassword: "",
};

const initialErrors: FieldErrorModel[] = [];

const ResetPasswordUtility = () => {
  const [resetPassword, setResetPassword] =
    useState<ResetPassworRequest>(initialResetPassword);
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const { token } = useParams();
  const navigate = useNavigate();

  const onResetPassword = async () => {
    if (isValidate()) {
      const response = await ResetPasswordAsync(resetPassword, token);

      if (response.status === 200) {
        toast.success(response.message, {
          draggable: true,
          closeOnClick: true,
          theme: "colored",
          transition: Bounce,
          onClose: () => navigate("/login"),
        });

        setResetPassword(initialResetPassword);
      } else {
        toast.error(response.message, {
          draggable: true,
          closeOnClick: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.error("All conditions marked in red are compulsory", {
        draggable: true,
        closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResetPassword((previous) => ({ ...previous, [name]: value }));

    // Remove error if field is valid
    setErrorInfo((previous) =>
      value !== ""
        ? previous.filter((error) => error.fieldName !== name)
        : previous
    );
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (!resetPassword.newPassword) {
      newErrors.push({
        fieldName: "newPassword",
        errorMessage: "Enter password",
      });
    }

    if (!resetPassword.confirmPassword) {
      newErrors.push({
        fieldName: "confirmPassword",
        errorMessage: "Enter confirm password",
      });
    }

    if (resetPassword.newPassword && resetPassword.confirmPassword) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\\/\-_+;]).{5,}$/;

      if (resetPassword.newPassword !== resetPassword.confirmPassword) {
        newErrors.push({
          fieldName: "newPassword",
          errorMessage: "Passwords do not match",
        });
        newErrors.push({
          fieldName: "confirmPassword",
          errorMessage: "Passwords do not match",
        });
      } else if (!passwordRegex.test(resetPassword.newPassword)) {
        newErrors.push({
          fieldName: "newPassword",
          errorMessage:
            "Password must be at least 5 characters long, contain at least one uppercase letter, one number, and one special character",
        });
      }
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    onTextFieldChange,
    resetPassword,
    errorInfo,
    onResetPassword,
    showConfirmPassword,
    showPassword,
    toggleConfirmPasswordVisibility,
    togglePasswordVisibility,
  };
};

export default ResetPasswordUtility;
