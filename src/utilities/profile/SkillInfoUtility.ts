import React, { SyntheticEvent, useEffect, useState } from "react";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import {
  createPersonalInfoAsync,
  getPersonalInfoByUserIdAsync,
  updatePersonalInfoAsync,
} from "../../services/profile/PersonalInfoService";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  SelectChangeEvent,
  SnackbarOrigin,
} from "@mui/material";
import { searchSkill } from "../../services/master/SkillService";
import SkillModel from "../../model/master/SkillModel";
import SkillDetailModel from "../../model/profile/SkillInfoModel";
import ExportLevelModel from "../../model/master/ExportLevelModel";
import { getExportLevels } from "../../services/master/ExportLevelService";
import { createSkillInfoAsync, deleteSkillInfoAsync, getSkillInfoByUserIdAsync, updateSkillInfoAsync } from "../../services/profile/SkillInfoService";
import SkillInfoModel from "../../model/profile/SkillInfoModel";
import SkillInfoViewModel from "../../model/profile/SkillInfoViewModel";

const SkillInfoUtility = (loginUserId:number) => {
 
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

  const [searchSkillTerm, setSearchSkillTerm] = useState("");
  const [searchSkills, setSearchSkills] = useState<SkillModel[]>([]);

  const [exportLevels, setExportLevels] = useState<ExportLevelModel[]>([]);

  const initialSkillDetails: SkillDetailModel[] = Array.from(
    { length: 8 },
    (_, index) => ({
      id: 0,
      skillId: 0, // Initialize with default values or leave as 0 if not applicable
      skillName: "", // Initialize with default values or an empty string if not applicable
      expertLevelId: 2, // Initialize with default values or leave as 0 if not applicable
      userId: loginUserId
    })
  );

  const [selectedSkillDetails, setSelectedSkillDetails] =
    useState<SkillDetailModel[]>(initialSkillDetails);


  const intitalSkillInfo: SkillInfoModel = {
    id: 0,
    skillId: 0,
    expertLevelId: 0,
    skillName: "",
    userId: loginUserId

  }
  const [skillInfo, setSkillInfo] = useState<SkillInfoModel>(intitalSkillInfo);
  const [skillInfoViewModel, setSkillInfoViewModel] = useState<SkillInfoViewModel[]>([]);


  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  async function getSkillInfo() {
    let response = await getSkillInfoByUserIdAsync(loginUserId);
    if (response.status === 200) {
      if (response.data !== null) {
        setSkillInfoViewModel(response.data);
        // alert(JSON.stringify(response.data) );

      }
    } else {
      setSkillInfoViewModel([]);
    }
  }
  useEffect(() => {


    async function fetchExportLevels() {
      let response = await getExportLevels();
      if (response.status === 200) {
        if (response.data !== null) {

          setExportLevels(response.data);
          // setSnackbarSeverity("info");
          //alert(response.data);
        }
      } else {
        // alert(response.message);
      }
    }
    fetchExportLevels();
    getSkillInfo();
  }, [loginUserId]);

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

  const onSkillInputChange = async (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value.trim() !== "" && value.length >= 2) {
      const response = await searchSkill(value); // Replace with your API endpoint
      if (response.status === 200 && response.data) {
        // setSearchSkills(response.data);
        //alert("a");

        const mappedData: SkillModel[] = response.data.map(item => ({
          id: item.id || 0,
          skillName: item.skillName || "",

        }));
        setSearchSkills(mappedData);

      }
    } else {
      setSearchSkills([]); // Clear options if input is empty
    }
    console.log(searchSkills);
  };

  const onSkillChange = () => (event: React.SyntheticEvent<Element, Event>, newValue: SkillModel | null) => {
    if (newValue) {

      setSkillInfo((prev) => ({ ...prev, ["skillId"]: newValue.id }));
      setSkillInfo((prev) => ({ ...prev, ["skillName"]: newValue.skillName }));

      setErrorInfo((prevErrors) => {
        const newErrors = prevErrors.filter((error) => error.fieldName !== "skillName");
        return newErrors;
      });

    } else {
      setSkillInfo((prev) => ({ ...prev, ["skillId"]: 0 }));
      setSkillInfo((prev) => ({ ...prev, ["skillName"]: "" }));
    }

  };









 
  const onSelectFieldChanged = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setSkillInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onSkillInfoSave2 = async () => {
    if (isValidate()) {
      alert(JSON.stringify(skillInfo));
    } else {
      alert("not valid");
    }
    //var response = await createSkillInfoAsync(selectedSkillDetails);

    // alert(response)
  };
  const onSkillInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (skillInfo.id > 0) {
        response = await updateSkillInfoAsync(skillInfo, skillInfo.id);
      } else {
        response = await createSkillInfoAsync(skillInfo);
        // alert(JSON.stringify(response));
        if (response.data != null && response.status === 200) {
          setSkillInfo(intitalSkillInfo);
         // const responseData = response.data;
         //setSearchSkillTerm("");
         alert(JSON.stringify(intitalSkillInfo));

         // setSkillInfo((prev) => ({ ...prev, skillName: "" }));
          getSkillInfo();
        }
      }

      const snackbarSeverity = response.status === 200 ? "success" : "error";
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      setSnackbarSeverity(snackbarSeverity);

    
    } else {
      setSnackbarMessage("Fields marked in red are required");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }
  };
  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (skillInfo.expertLevelId == 0) {
      newErrors.push({
        fieldName: "expertLevelId",
        errorMessage: "Select expert level",
      });
    }
   


    // Check if Autocomplete has a selected value
    if (!skillInfo.skillName) {
      newErrors.push({
        fieldName: "skillName",
        errorMessage: "Select a skill",
      });
    }
    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };
  const onSkillInfoDelete = async (id: number) => {

      let response;
      response = await deleteSkillInfoAsync(id);

      const snackbarSeverity = response.status === 200 ? "success" : "error";
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      setSnackbarSeverity(snackbarSeverity);
      if (response.status === 200) {
        getSkillInfo();
      }


  }
  return {
    personalInfo,
    setPersonalInfo,
    onTextFieldChanged,
    onSkillInfoSave,
    errorInfo,
    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
    searchSkillTerm,
    setSearchSkillTerm,
    searchSkills,
    onSkillInputChange,
    onSkillChange,
    selectedSkillDetails,
    onSelectFieldChanged,
    exportLevels,
    skillInfo,
    skillInfoViewModel,
    onSkillInfoDelete,
  };
};
export default SkillInfoUtility;
