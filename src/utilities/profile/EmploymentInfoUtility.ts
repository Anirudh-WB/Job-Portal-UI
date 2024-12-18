import React, { useEffect, useState } from "react";
import FieldErrorModel from "../../model/FieldErrorModel";
import {
  createEmploymentInfoAsync,
  getEmploymentInfoByUserIdAsync,
  updateEmploymentInfoAsync,
} from "../../services/profile/EmploymentInfoService";
import NoticePeriodModel from "../../model/master/NoticePeriodModel";
import EmploymentInfoModel from "../../model/profile/EmploymentInfoModel";
import { getNoticePeriods } from "../../services/master/NoticePeriodService";
import { Bounce, toast } from "react-toastify";

const EmploymentInfoUtility = (loginUserId: number) => {
  //const userId = 1;
  const initialEmploymentInfo: EmploymentInfoModel = {
    id: 0,
    currentCTC: 0,
    expectedCTC: 0,
    noticePeriodId: 0,
    userId: loginUserId,
  };
  const initialErrors: FieldErrorModel[] = [];
  const [employmentInfo, setEmploymentInfo] = useState<EmploymentInfoModel>(
    initialEmploymentInfo
  );
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [noticePeriods, setNoticePeriods] = useState<NoticePeriodModel[]>([]);
  const [isEmploymentInfoOpen, setIsEmploymentInfoOpen] = useState(false);

  const toggleModal = () => setIsEmploymentInfoOpen((prev: boolean) => !prev);

  useEffect(() => {
    async function fetchNoticePeriods() {
      let response = await getNoticePeriods();
      if (response.status === 200) {
        if (response.data !== null) {
          setNoticePeriods(response.data);
        }
      }
    }

    async function getEmploymentInfo() {
      let response = await getEmploymentInfoByUserIdAsync(loginUserId);
      console.log(response);
      if (response.status === 200) {
        if (response.data !== null) {
          setEmploymentInfo(
            response.data ? response.data : initialEmploymentInfo
          );
          // setSnackbarSeverity("info");
        }
      }
    }
    fetchNoticePeriods();
    getEmploymentInfo();
  }, [loginUserId]);

  //EmploymentInfoService
  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setEmploymentInfo((prev) => ({ ...prev, [name]: value }));

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

    setEmploymentInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onEmploymentInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (employmentInfo.id > 0) {
        response = await updateEmploymentInfoAsync(
          employmentInfo,
          employmentInfo.id
        );
      } else {
        response = await createEmploymentInfoAsync(employmentInfo);
        //  if (response.status === 200 ){
        //   setEmploymentInfo((prev)=>({...prev, id: response.data.id}))
        //  }
        if (response.data != null && response.status === 200) {
          const responseData = response.data;
          setEmploymentInfo((prev) => ({ ...prev, id: responseData.id }));
        }
      }

      if (response.status === 200) {
        toast.success("Employment Info Updated", {
          // toastId: "employment__info__toast",
          draggable: true,
          closeOnClick: true,
          theme: "colored",
          transition: Bounce,
        });

        return true;
      } else {
        toast.error(response.message, {
          // toastId: "employment__info__toast",
          draggable: true,
          closeOnClick: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.error("All conditions marked in red are compulsory", {
        // toastId: "employment__info__toast",
        draggable: true,
        closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });

      return false;
    }
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];
    if (
      employmentInfo.expectedCTC === 0 ||
      employmentInfo.expectedCTC.toString() === ""
    ) {
      newErrors.push({
        fieldName: "expectedCTC",
        errorMessage: "Enter Expected CTC",
      });
    }

    if (
      employmentInfo.currentCTC === 0 ||
      employmentInfo.currentCTC.toString() === ""
    ) {
      newErrors.push({
        fieldName: "currentCTC",
        errorMessage: "Enter Current CTC",
      });
    }

    if (employmentInfo.noticePeriodId === 0) {
      newErrors.push({
        fieldName: "noticePeriodId",
        errorMessage: "Select notice period",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    employmentInfo,
    setEmploymentInfo,
    onTextFieldChanged,
    onSelectFieldChanged,
    onEmploymentInfoSave,
    errorInfo,
    noticePeriods,
    isEmploymentInfoOpen,
    toggleModal,
  };
};
export default EmploymentInfoUtility;
