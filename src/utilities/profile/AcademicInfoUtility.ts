import React, { useEffect, useState } from "react";
import AcademicInfoModel from "../../model/profile/AcademicInfoModel";
import {
  deleteAcademicInfoAsync,
  getAcademicInfoByUserIdAsync,
} from "../../services/profile/AcademicInfoService";

const AcademicInfoUtility = (loginUserId: number) => {
  const [academicInfos, setAcademicInfos] = useState<AcademicInfoModel[]>([]);
  const [isAcademicInfoOpen, setIsAcademicInfoOpen] = useState<boolean>(false);
  const [academicInfoId, setAcademicInfoId] = useState<number>(0);

  async function fetchAcademicInfo() {
    let response = await getAcademicInfoByUserIdAsync(loginUserId);
    if (response.status === 200) {
      if (response.data !== null) {
        setAcademicInfos(response.data);
      }
    }
  }

  useEffect(() => {
    fetchAcademicInfo();
  }, []);

  const toggleModal = () => setIsAcademicInfoOpen((prev: boolean) => !prev);

  const onAcademicInfoEdit = async (id: number) => {
    setAcademicInfoId(id);
    toggleModal();
  };

  const onAcademicInfoDelete = async (id: number) => {
    if (window.confirm("Are you SUAR you want to delete this Academic Info")) {
      let response = await deleteAcademicInfoAsync(id);
      if (response.status === 200) {
        fetchAcademicInfo();
      }
    }
  };

  const onAddAcademicInfo = async () => {
    setAcademicInfoId(0);
    toggleModal();
  };

  return {
    academicInfos,
    onAcademicInfoDelete,
    onAcademicInfoEdit,
    onAddAcademicInfo,
    isAcademicInfoOpen,
    fetchAcademicInfo,
    toggleModal,
    academicInfoId,
    setAcademicInfoId,
  };
};
export default AcademicInfoUtility;
