import { useEffect, useState } from "react";
import CompanyInfoModel from "../../model/company/CompanyInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { getCompanyInfoByUserIdAsync } from "../../services/company/CompanyInfoService";



function CompanyInfoUtility(loginUserId: number) {
    const initialCompanyInfo: CompanyInfoModel = {
        id: 0,
        companyLogo: null,
        companyName: "",
        emailAddress: "",
        roleId: 8,
        mobileNo: "",
        cityId: 0,
        cityName: "",
        companyUrl: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonPhone: "",
        designationId: 0,
        designationName: "",
        userId: loginUserId,
      };

  const [companyInfo, setCompanyInfo] = useState<CompanyInfoModel>(initialCompanyInfo);
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState<boolean>(false);
  const [companyInfoId, setCompanyInfoId] = useState<number>(0);
  const toggleModal = () => setIsCompanyInfoOpen((prev: boolean) => !prev);

  async function fetchCompanyInfo() {
    let response = await getCompanyInfoByUserIdAsync(loginUserId);
    console.log("Data :", response);
    if (response.status === 200) {
      if (response.data !== null) {
        setCompanyInfo(response.data);
      }
    }
  }

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const onCompanyInfoEdit = async (id: number) => {
    setCompanyInfoId(id);
    console.log(id);
    toggleModal();
  };

  return {
    toggleModal,
    companyInfo,
    isCompanyInfoOpen,
    onCompanyInfoEdit,
    companyInfoId
  };
}

export default CompanyInfoUtility;
