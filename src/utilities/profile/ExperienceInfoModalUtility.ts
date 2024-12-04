import React, { SyntheticEvent, useEffect, useState } from "react";
import CountryModel from "../../model/CountryModel";
import CityModel from "../../model/master/CityModel";
import TrainLineModel from "../../model/TrainLineModel";
import dayjs from "dayjs";
import ExperienceInfoModel from "../../model/profile/ExperienceInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  createExperienceInfoAsync,
  deleteExperienceInfoAsync,
  getExperienceInfoAsync,
  getExperienceInfoByUserIdAsync,
  updateExperienceInfoAsync,
} from "../../services/profile/ExperienceInfoService";
import { SnackbarOrigin } from "@mui/material";
import DesignationModel from "../../model/master/DesignationModel";
import { getDesignations } from "../../services/master/DesignationService";
import ExperienceInfoViewModel from "../../model/profile/ExperienceInfoViewModel";

const ExperienceInfoModalUtility = (
  loginUserId: number,
  experienceInfoId: number
) => {
  const intialExperienceInfo: ExperienceInfoModel = {
    id: 0,
    companyName: "",
    description: "",
    startDate: dayjs(),
    endDate: dayjs(),
    designationId: 0,
    userId: loginUserId,
    isCurrentlyWorking: false,
  };
  const initialErrors: FieldErrorModel[] = [];

  const [experienceInfo, setExperienceInfo] =
    useState<ExperienceInfoModel>(intialExperienceInfo);

  const [experienceInfoData, setExperienceInfosData] = useState<
    ExperienceInfoViewModel[]
  >([]);

  const [experienceInfos, setExperienceInfos] = useState<
    ExperienceInfoViewModel[]
  >([]);

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [designations, setDesignations] = useState<DesignationModel[]>([]);
  const [isExpanded, setIsExpanded] = useState<Number[]>([]);

  useEffect(() => {
    async function fetchDesignations() {
      let response = await getDesignations();
      if (response.status === 200) {
        if (response.data !== null) {
          setDesignations(response.data);
        }
      } else {
      }
    }
    fetchDesignations();
  }, []);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setExperienceInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onTextAreaChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setExperienceInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onSelectFieldChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = event.target.name; // The name of the select element
    const value = event.target.value; // The selected value

    setExperienceInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onDateFieldChanged = (fieldName: string, newValue: Date | null) => {
    if (newValue !== null) {
      //setValue(newValue);
      setExperienceInfo((prev) => ({ ...prev, [fieldName]: newValue }));
      // Additional logic you want to execute on change can go here
    }
  };

  const onCheckBoxFieldChange = (event: SyntheticEvent<Element, Event>) => {
    const isChecked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;
    const name =
      event.target instanceof HTMLInputElement ? event.target.name : "";
    setExperienceInfo((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
  };

  useEffect(() => {
    const onExperienceInfoEdit = async (id: number) => {
      let response;
      response = await getExperienceInfoAsync(id);
      if (response.data != null) {
        setExperienceInfo(response.data);
      }
    };
    if (experienceInfoId > 0) {
      onExperienceInfoEdit(experienceInfoId);
    }
  }, [experienceInfoId]);

  const onExperienceInfoDelete = async (id: number) => {
    let response = await deleteExperienceInfoAsync(id);
    if (response.status === 200) {
    }
  };

  const onAddExperienceInfo = async () => {
    //alert(JSON.stringify(experienceInfo));
    setExperienceInfo(intialExperienceInfo);
  };

  const onExperienceInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (experienceInfo.id > 0) {
        response = await updateExperienceInfoAsync(
          experienceInfo,
          experienceInfo.id
        );
      } else {
        response = await createExperienceInfoAsync(experienceInfo);
        if (response.data != null) {
          const responseData = response.data;
          setExperienceInfo((prev) => ({ ...prev, id: responseData.id }));
        }
      }
      if (response.status === 200) {
        setExperienceInfo(intialExperienceInfo);
      }
      const snackbarSeverity = response.status === 200 ? "success" : "error";
    } else {
    }
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (experienceInfo.companyName === "") {
      newErrors.push({
        fieldName: "companyName",
        errorMessage: "Enter company name",
      });
    }

    if (experienceInfo.designationId === 0) {
      newErrors.push({
        fieldName: "designationId",
        errorMessage: "Select Designation",
      });
    }

    // Date validation for startDate
    if (
      !experienceInfo.startDate ||
      !dayjs(experienceInfo.startDate).isValid()
    ) {
      newErrors.push({
        fieldName: "startDate",
        errorMessage: "Invalid start date",
      });
    }

    // Date validation for endDate
    if (
      !experienceInfo.isCurrentlyWorking &&
      (!experienceInfo.endDate || !dayjs(experienceInfo.endDate).isValid())
    ) {
      newErrors.push({
        fieldName: "endDate",
        errorMessage: "Invalid end date",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    experienceInfo,
    experienceInfos,
    onTextFieldChanged,
    onSelectFieldChanged,
    onDateFieldChanged,
    onTextAreaChanged,
    onCheckBoxFieldChange,
    onExperienceInfoSave,
    errorInfo,
    onExperienceInfoDelete,
    onAddExperienceInfo,
    designations,
    isExpanded,
    setIsExpanded,
    setExperienceInfos,
    experienceInfoData,
    setExperienceInfosData,
  };
};
export default ExperienceInfoModalUtility;