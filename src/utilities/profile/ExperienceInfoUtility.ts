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

const ExperienceInfoUtility = (loginUserId: number) => {
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

  const [experienceInfo, setExperienceInfo] =
    useState<ExperienceInfoModel>(intialExperienceInfo);

  const [experienceInfos, setExperienceInfos] = useState<
    ExperienceInfoViewModel[]
  >([]);

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [designations, setDesignations] = useState<DesignationModel[]>([]);
  const [countries, setCountries] = useState<CountryModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [trainLines, setTrainLines] = useState<TrainLineModel[]>([]);
  const [isExpanded, setIsExpanded] = useState<Number[]>([]);

  async function fetchExperienceInfo() {
    let response = await getExperienceInfoByUserIdAsync(loginUserId);
    if (response.status === 200) {
      if (response.data !== null) {
        setExperienceInfos(response.data);
        //alert(JSON.stringify(response.data));
      }
    } else {
      // alert(response.message);
    }
  }

  useEffect(() => {
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
    fetchDesignations();
    fetchExperienceInfo();
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

  const onSelectFieldChanged = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setExperienceInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  // const onDateFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = event.currentTarget.name as keyof ExperienceInfoModel;
  //   const value = event.currentTarget.value;

  //   setExperienceInfo((prev) => ({ ...prev, [name]: value ? new Date(value) : null }));

  // }

  // // Assuming this is inside a functional component
  // const onDateFieldChanged = (fieldName: string, date: Dayjs | null) => {
  //   // Ensure date is converted to Date object before setting state
  //   const formattedDate = date ? date.toDate() : null;

  //   setExperienceInfo((prev) => ({ ...prev, [fieldName]: formattedDate }));

  //   setErrorInfo((prevErrors) => {
  //     // Filter out errors related to the fieldName
  //     const newErrors = prevErrors.filter(
  //       (error) => error.fieldName !== fieldName
  //     );
  //     return newErrors;
  //   });
  // };

  const onDateFieldChanged = (fieldName: string, newValue: Date | null) => {
    if (newValue !== null) {
      //setValue(newValue);
      setExperienceInfo((prev) => ({ ...prev, [fieldName]: newValue }));
      // Additional logic you want to execute on change can go here
    }
  };

  //  const onCheckBoxFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     //const newValue = checked;
  //     const name = event.currentTarget.name;

  //     setExperienceInfo((prevState) => ({
  //       ...prevState,
  //       [name]: event.target.checked
  //     }));
  //   };

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

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const onExperienceInfoEdit = async (id: number) => {
    let response;
    response = await getExperienceInfoAsync(id);
    //alert(JSON.stringify(response));
    if (response.data != null) {
      setExperienceInfo(response.data);
    }
  };
  const onExperienceInfoDelete = async (id: number) => {
    let response = await deleteExperienceInfoAsync(id);
    if (response.status === 200) {
      fetchExperienceInfo();
    }
    const snackbarSeverity = response.status === 200 ? "success" : "error";
    setSnackbarMessage(response.message);
    setSnackbarOpen(true);
    setSnackbarSeverity(snackbarSeverity);
  };

  const onAddExperienceInfo = async () => {
    //alert(JSON.stringify(experienceInfo));
    setExperienceInfo(intialExperienceInfo);
  };
  const onExperienceInfoSave = async () => {
    // alert(JSON.stringify(experienceInfo));
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
        fetchExperienceInfo();
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
    //alert(JSON.stringify(experienceInfo));
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
    onExperienceInfoEdit,
    onAddExperienceInfo,

    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,

    designations,
    isExpanded,
    setIsExpanded,
  };
};
export default ExperienceInfoUtility;
