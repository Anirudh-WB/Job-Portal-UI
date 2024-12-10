import { useEffect, useState } from "react";
import {
  deleteSkillInfoAsync,
  getSkillInfoByUserIdAsync,
} from "../../services/profile/SkillInfoService";
import SkillInfoViewModel from "../../model/profile/SkillInfoViewModel";

const SkillInfoUtility = (loginUserId: number) => {
  const [isEmployeeSkillInfoOpen, setIsEmployeeSkillInfoOpen] =
    useState<boolean>(false);
  const [employeeSkillInfoId, setEmployeeSkillInfoId] = useState<number>(0);
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
    getSkillInfo();
  }, [loginUserId]);

  const toggleModal = () =>
    setIsEmployeeSkillInfoOpen((prev: boolean) => !prev);

  const onAddSkillInfoSave = () => {
    setEmployeeSkillInfoId(0);
    toggleModal();
  };

  const onSkillInfoEdit = async (id: number) => {
    setEmployeeSkillInfoId(id);
    toggleModal();
  };

  const onSkillInfoDelete = async (id: number) => {
    if (window.confirm("Are you SUAR you want to delete this Academic Info")) {
      const response = await deleteSkillInfoAsync(id);
      if (response.status === 200) {
        getSkillInfo();
      }
    }
  };

  return {
    skillInfoViewModel,
    onSkillInfoEdit,
    onSkillInfoDelete,
    onAddSkillInfoSave,
    toggleModal,
    isEmployeeSkillInfoOpen,
    employeeSkillInfoId,
    setEmployeeSkillInfoId,
  };
};

export default SkillInfoUtility;
