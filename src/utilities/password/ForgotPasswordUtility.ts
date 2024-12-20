import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { ForgotPasswordAsync } from "../../services/password/ForgotPasswordService";
import ForgotPasswordRequest from "../../model/password/ForgotPasswordRequest";
import FieldErrorModel from "../../model/FieldErrorModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";

const initialForgotPassword: ForgotPasswordRequest = {
  emailAddress: "",
};

const initialErrors: FieldErrorModel[] = [];

const ForgotPasswordUtility = () => {
  const [forgotPassword, setForgotPassword] = useState<ForgotPasswordRequest>(
    initialForgotPassword
  );
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const onForgotPassword = async () => {
    setIsLoading(true);
    try {
      if (isValidate()) {
        const response = await ForgotPasswordAsync(forgotPassword);

        if (response.status === 200) {
          toast.success(response.message, {
            draggable: true,
            closeOnClick: true,
            theme: "colored",
            transition: Bounce,
          });

          setForgotPassword(initialForgotPassword);
        } else {
          toast.error(response.message, {
            draggable: true,
            closeOnClick: true,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForgotPassword((previous) => ({ ...previous, [name]: value }));

    // Remove error if field is valid
    setErrorInfo((previous) =>
      value !== ""
        ? previous.filter((error) => error.fieldName !== name)
        : previous
    );
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (!forgotPassword.emailAddress) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else if (!isValidEmailAddress(forgotPassword.emailAddress)) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter a valid email address",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    onTextFieldChange,
    forgotPassword,
    errorInfo,
    onForgotPassword,
    isLoading,
  };
};

export default ForgotPasswordUtility;
