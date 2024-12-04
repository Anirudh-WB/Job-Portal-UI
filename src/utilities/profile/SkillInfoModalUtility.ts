import React, { SyntheticEvent, useEffect, useState } from "react";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import SkillModel from "../../model/master/SkillModel";
import SkillDetailModel from "../../model/profile/SkillInfoModel";
import ExportLevelModel from "../../model/master/ExportLevelModel";
import { getExportLevels } from "../../services/master/ExportLevelService";
import {
  createSkillInfoAsync,
  deleteSkillInfoAsync,
  getSkillInfoAsync,
  getSkillInfoByUserIdAsync,
  updateSkillInfoAsync,
} from "../../services/profile/SkillInfoService";
import SkillInfoModel from "../../model/profile/SkillInfoModel";
import SkillInfoViewModel from "../../model/profile/SkillInfoViewModel";
import { getSkillsAsync } from "../../services/master/SkillService";

const SkillInfoModalUtility = (
  loginUserId: number,
  employeeSkillInfoId: number
) => {
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

  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfoModel>(initialPersonalInfo);
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>([]);

  const [searchSkillTerm, setSearchSkillTerm] = useState("");
  const [skills, setSkills] = useState<SkillModel[]>([]);
  const [exportLevels, setExportLevels] = useState<ExportLevelModel[]>([]);

  const initialSkillDetails: SkillDetailModel[] = Array.from(
    { length: 8 },
    (_, index) => ({
      id: 0,
      skillId: 0,
      skillName: "",
      expertLevelId: 2,
      userId: loginUserId,
    })
  );

  const [selectedSkillDetails, setSelectedSkillDetails] =
    useState<SkillDetailModel[]>(initialSkillDetails);

  const intitalSkillInfo: SkillInfoModel = {
    id: 0,
    skillId: 0,
    expertLevelId: 0,
    skillName: "",
    userId: loginUserId,
  };
  const [skillInfo, setSkillInfo] = useState<SkillInfoModel>(intitalSkillInfo);
  const [skillInfoViewModel, setSkillInfoViewModel] = useState<
    SkillInfoViewModel[]
  >([]);

  const getSkillInfo = async () => {
    const response = await getSkillInfoByUserIdAsync(loginUserId);
    if (response.status === 200 && response.data) {
      setSkillInfoViewModel(response.data);
    } else {
      setSkillInfoViewModel([]);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await getSkillsAsync();
      if (response.status === 200 && response.data) {
        setSkills(response.data);
      }
    };

    const fetchExportLevels = async () => {
      const response = await getExportLevels();
      if (response.status === 200 && response.data) {
        setExportLevels(response.data);
      }
    };

    fetchSkills();
    fetchExportLevels();
    getSkillInfo();
  }, [loginUserId]);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) =>
      prevErrors.filter((error) => error.fieldName !== name)
    );
  };

  // const onSkillInputChange = async (
  //   event: SyntheticEvent<Element, Event>,
  //   value: string
  // ) => {
  //   if (value.trim() !== "" && value.length >= 2) {
  //     const response = await searchSkill(value);
  //     if (response.status === 200 && response.data) {
  //       const mappedData: SkillModel[] = response.data((item) => ({
  //         id: item.id || 0,
  //         skillName: item.skillName || "",
  //       }));
  //       setSkills(mappedData);
  //     }
  //   } else {
  //     setSkills([]);
  //   }
  // };

  const onSkillChange =
    () =>
    (
      event: React.SyntheticEvent<Element, Event>,
      newValue: SkillModel | null
    ) => {
      if (newValue) {
        setSkillInfo((prev) => ({
          ...prev,
          skillId: newValue.id,
          skillName: newValue.skillName,
        }));

        setErrorInfo((prevErrors) =>
          prevErrors.filter((error) => error.fieldName !== "skillName")
        );
      } else {
        setSkillInfo((prev) => ({
          ...prev,
          skillId: 0,
          skillName: "",
        }));
      }
    };

  const onSelectFieldChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSkillInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) =>
      prevErrors.filter((error) => error.fieldName !== name)
    );
  };

  const onAddSkillInfoSave = () => {
    setSkillInfo(intitalSkillInfo);
  };

  const onSkillInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (skillInfo.id > 0) {
        response = await updateSkillInfoAsync(skillInfo, skillInfo.id);
      } else {
        response = await createSkillInfoAsync(skillInfo);
      }

      if (response?.status === 200) {
        setSkillInfo(intitalSkillInfo);
        getSkillInfo();
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const onSkillInfoEdit = async (id: number) => {
      let response;
      response = await getSkillInfoAsync(id);
      if (response.data != null) {
        setSkillInfo(response.data);
      }
    };

    if (employeeSkillInfoId > 0) {
      onSkillInfoEdit(employeeSkillInfoId);
    } else {
      setSkillInfo(intitalSkillInfo);
    }
  }, [employeeSkillInfoId]);

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (!skillInfo.skillId) {
      newErrors.push({
        fieldName: "skillId",
        errorMessage: "Select a valid skill",
      });
    }

    if (!skillInfo.expertLevelId) {
      newErrors.push({
        fieldName: "expertLevelId",
        errorMessage: "Select a valid proficiency",
      });
    }
    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  const onSkillInfoDelete = async (id: number) => {
    const response = await deleteSkillInfoAsync(id);
    if (response.status === 200) {
      getSkillInfo();
    }
  };

  return {
    personalInfo,
    setPersonalInfo,
    onTextFieldChanged,
    onSkillInfoSave,
    errorInfo,
    searchSkillTerm,
    setSearchSkillTerm,
    skills,
    onSkillChange,
    selectedSkillDetails,
    onSelectFieldChanged,
    exportLevels,
    skillInfo,
    skillInfoViewModel,
    onSkillInfoDelete,
    onAddSkillInfoSave,
  };
};

export default SkillInfoModalUtility;
