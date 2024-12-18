import React, { useEffect, useState } from "react";
import FieldErrorModel from "../../model/FieldErrorModel";

import { Bounce, toast } from "react-toastify";
import {
  createCompanyInfoAsync,
  getCompanyInfoAsync,
  getCompanyInfoByUserIdAsync,
  updateCompanyInfoAsync,
} from "../../services/company/CompanyInfoService";
import CompanyInfoModel from "../../model/company/CompanyInfoModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import CityModel from "../../model/master/CityModel";
import DesignationModel from "../../model/master/DesignationModel";
import {
  getCitiesAsync,
  getCityByIdAsync,
} from "../../services/master/CityService";
import { getDesignations } from "../../services/master/DesignationService";

function CompanyInfoModalUtility(loginUserId: number) {
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

  const initialErrors: FieldErrorModel[] = [];
  const [CompanyInfo, setCompanyInfo] =
    useState<CompanyInfoModel>(initialCompanyInfo);
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState<boolean>(false);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [designation, setDesignation] = useState<DesignationModel[]>([]);
  const [companyInfoId, setCompanyInfoId] = useState<number>(0);
  const toggleModal = () => setIsCompanyInfoOpen((prev: boolean) => !prev);

  async function fetchCompanyInfo() {
    let response = await getCompanyInfoByUserIdAsync(loginUserId);
    console.log("Data :", response);
    if (response.status === 200) {
      if (response.data !== null) {
        setCompanyInfo((prev) => ({
          ...prev,
          ...response.data,
        }));
      }
    }
  }

  useEffect(() => {
    fetchCompanyInfo();
  }, [companyInfoId]);

  const onCompanyInfoEdit = async (id: number) => {
    setCompanyInfoId(id);
    toggleModal();
  };

  // async function fetchCities() {
  //   try {
  //     const response = await getCitiesAsync();
  //     if (response.status === 200) {
  //       setCities(response.data);
  //     } else {
  //       console.error("Failed to fetch cities:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cities:", error);
  //   }
  // }

  const fetchCities = async () => {
    const response = await getCitiesAsync();
    if (response.status === 200 && response.data) {
      setCities(response.data);
    }
  };

  // async function fetchCityName() {
  //   try {
  //     const response = await getCityByIdAsync(CompanyInfo.cityId);
  //     if (response?.status === 200 && response.data?.cityName) {
  //       setCompanyInfo((prev) => ({ ...prev, cityName: response.data.cityName }));
  //     } else {
  //       console.error(
  //         "Failed to fetch city name:",
  //         response?.message || "Unknown error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while fetching the city name:", error);
  //   }
  // }

  const fetchDesignation = async () => {
    const response = await getDesignations();
    if (response.status === 200 && response.data) {
      setDesignation(response.data);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchDesignation();
  }, []);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setCompanyInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onCompanyInfoSave = async (CompanyInfo: FormData) => {
    if (isValidate()) {
      let response;
      const id = Number(CompanyInfo.get("id"));
      if (id > 0) {
        response = await updateCompanyInfoAsync(CompanyInfo, id);
      } else {
        response = await createCompanyInfoAsync(CompanyInfo);
      }

      if (response.status === 200) {
        setCompanyInfo(initialCompanyInfo);
      }

      response.status === 200
        ? toast.success(`Company Info ${id > 0 ? "Updated" : "Saved"}`, {
            // toastId: "Company__info__toast",
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            onOpen: toggleModal,
          })
        : toast.error(response.message, {
            // toastId: "Company__info__toast",
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

      return true;
    } else {
      toast.error("All conditions marked in red are compulsory", {
        // toastId: "Company__info__toast",
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      return false;
    }
  };

  const onSelectFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorInfo((previous) => {
      if (value !== "") {
        return previous.filter((error) => error.fieldName !== name);
      }
      return previous;
    });
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyInfo((previous) => ({
          ...previous,
          companyLogo: file, // Set the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];
    if (CompanyInfo.companyLogo === null) {
      newErrors.push({
        fieldName: "companyLogo",
        errorMessage: "Select a company logo",
      });
    }
    if (CompanyInfo.companyName === "") {
      newErrors.push({
        fieldName: "companyName",
        errorMessage: "Enter Company Name",
      });
    }
    if (CompanyInfo.companyUrl === "") {
      newErrors.push({
        fieldName: "companyUrl",
        errorMessage: "Enter Company Website URL",
      });
    }
    if (CompanyInfo.mobileNo === "") {
      newErrors.push({
        fieldName: "mobileNo",
        errorMessage: "Enter mobile number",
      });
    }
    if (CompanyInfo.cityId === 0) {
      newErrors.push({
        fieldName: "cityId",
        errorMessage: "Select a location",
      });
    }
    if (CompanyInfo.contactPersonName === "") {
      newErrors.push({
        fieldName: "contactPersonName",
        errorMessage: "Enter Contact Person Name",
      });
    }
    if (CompanyInfo.contactPersonPhone === "") {
      newErrors.push({
        fieldName: "contactPersonPhone",
        errorMessage: "Enter Contact Person Mobile Number",
      });
    }
    if (CompanyInfo.designationId === 0) {
      newErrors.push({
        fieldName: "designationId",
        errorMessage: "Select a designation",
      });
    }
    if (CompanyInfo.contactPersonEmail === "") {
      newErrors.push({
        fieldName: "contactPersonEmail",
        errorMessage: "Enter contact person email address",
      });
    } else {
      if (!isValidEmailAddress(CompanyInfo.contactPersonEmail)) {
        newErrors.push({
          fieldName: "contactPersonEmail",
          errorMessage: "Enter valid email address",
        });
      }
    }
    if (CompanyInfo.emailAddress === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else {
      if (!isValidEmailAddress(CompanyInfo.emailAddress)) {
        newErrors.push({
          fieldName: "emailAddress",
          errorMessage: "Enter valid email address",
        });
      }
    }
    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append form fields
    Object.entries(CompanyInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call the utility function to handle form submission
    onCompanyInfoSave(formData);
  };

  return {
    cities,
    designation,
    CompanyInfo,
    onTextFieldChanged,
    onCompanyInfoSave,
    errorInfo,
    toggleModal,
    isCompanyInfoOpen,
    onCompanyInfoEdit,
    companyInfoId,
    setCompanyInfoId,
    handleSubmit,
    onSelectFieldChange,
    onFileChange,
  };
}

export default CompanyInfoModalUtility;
