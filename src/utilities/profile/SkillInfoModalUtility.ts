import React, { useEffect, useState } from "react";
import FieldErrorModel from "../../model/FieldErrorModel";
import SkillModel from "../../model/master/SkillModel";
import ExportLevelModel from "../../model/master/ExportLevelModel";
import { getExportLevels } from "../../services/master/ExportLevelService";
import {
  createSkillInfoAsync,
  getSkillInfoAsync,
  updateSkillInfoAsync,
} from "../../services/profile/SkillInfoService";
import SkillInfoModel from "../../model/profile/SkillInfoModel";
import { getSkillsAsync } from "../../services/master/SkillService";
import { Bounce, toast } from "react-toastify";
import ApiResponse from "../../common/ApiResponse";

const SkillInfoModalUtility = (
  loginUserId: number,
  employeeSkillInfoId: number
) => {
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>([]);

  const [skills, setSkills] = useState<SkillModel[]>([]);
  const [exportLevels, setExportLevels] = useState<ExportLevelModel[]>([]);

  const intitalSkillInfo: SkillInfoModel = {
    id: 0,
    skillId: 0,
    expertLevelId: 0,
    skillName: "",
    userId: loginUserId,
  };
  const initialErrors: FieldErrorModel[] = [];

  const [skillInfo, setSkillInfo] = useState<SkillInfoModel>(intitalSkillInfo);

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
  }, [loginUserId]);

  useEffect(() => {
    setErrorInfo(initialErrors);
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

  const onSelectFieldChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSkillInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) =>
      prevErrors.filter((error) => error.fieldName !== name)
    );
  };

  const onSkillInfoSave = async () => {
    if (isValidate()) {
      let response: ApiResponse<SkillInfoModel>;
      if (skillInfo.id > 0) {
        response = await updateSkillInfoAsync(skillInfo, skillInfo.id);
      } else {
        response = await createSkillInfoAsync(skillInfo);
      }

      response.status === 200
        ? toast.success(
            `Skill Info ${skillInfo.id > 0 ? "Updated" : "Saved"}`,
            {
              draggable: true,
              closeOnClick: true,
              theme: "colored",
              transition: Bounce,
              onOpen: () => setSkillInfo(intitalSkillInfo),
            }
          )
        : toast.error(response.message, {
            draggable: true,
            closeOnClick: true,
            theme: "colored",
            transition: Bounce,
          });

      return true;
    } else {
      toast.error("All conditions marked in red are compulsory", {
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

  return {
    onSkillInfoSave,
    errorInfo,
    skills,
    onSelectFieldChanged,
    exportLevels,
    skillInfo,
  };
};

export default SkillInfoModalUtility;
