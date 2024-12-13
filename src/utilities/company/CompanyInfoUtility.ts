import { useEffect, useState } from "react";
import CompanyInfoModel from "../../model/company/CompanyInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { getCompanyInfoByUserIdAsync } from "../../services/company/CompanyInfoService";



function CompanyInfoUtility(loginUserId: number) {
    
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoModel[]>([]);
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState<boolean>(false);
  const toggleModal = () => setIsCompanyInfoOpen((prev: boolean) => !prev);

  async function fetchCompanyInfo() {
    let response = await getCompanyInfoByUserIdAsync(loginUserId);
    console.log(response.data);
    if (response.status === 200) {
      if (response.data !== null) {
        setCompanyInfo(response.data);
      }
    }
  }

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return {
    toggleModal,
    companyInfo,
    isCompanyInfoOpen
  };
}

export default CompanyInfoUtility;
