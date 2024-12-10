import { useEffect, useState } from "react";
import {
  deleteExperienceInfoAsync,
  getExperienceInfoByUserIdAsync,
} from "../../services/profile/ExperienceInfoService";
import ExperienceInfoViewModel from "../../model/profile/ExperienceInfoViewModel";

const ExperienceInfoUtility = (loginUserId: number) => {
  const [experienceInfos, setExperienceInfos] = useState<
    ExperienceInfoViewModel[]
  >([]);
  const [isExpanded, setIsExpanded] = useState<Number[]>([]);
  const [isExperienceInfoOpen, setIsExperienceInfoOpen] =
    useState<boolean>(false);
  const [experienceInfoId, setExperienceInfoId] = useState<number>(0);

  const fetchExperienceInfo = async () => {
    let response = await getExperienceInfoByUserIdAsync(loginUserId);
    if (response.status === 200) {
      if (response.data !== null) {
        setExperienceInfos(response.data);
        console.log("Data : ", experienceInfos);
      }
    } else {
    }
  };

  const toggleModal = () => setIsExperienceInfoOpen((prev: boolean) => !prev);

  useEffect(() => {
    fetchExperienceInfo();
  }, []);

  const onExperienceInfoEdit = async (id: number) => {
    setExperienceInfoId(id);
    toggleModal();
  };

  const onExperienceInfoDelete = async (id: number) => {
    let response = await deleteExperienceInfoAsync(id);
    if (response.status === 200) {
      fetchExperienceInfo();
    }
  };

  const onAddExperienceInfo = async () => {
    setExperienceInfoId(0);
    toggleModal();
  };

  return {
    experienceInfos,
    onExperienceInfoDelete,
    onExperienceInfoEdit,
    onAddExperienceInfo,
    isExpanded,
    setIsExpanded,
    fetchExperienceInfo,
    isExperienceInfoOpen,
    experienceInfoId,
    toggleModal,
  };
};
export default ExperienceInfoUtility;
