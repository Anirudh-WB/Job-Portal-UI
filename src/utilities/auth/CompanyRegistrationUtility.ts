import { useEffect, useState } from "react";
import FieldErrorModel from "../../model/FieldErrorModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import CompanyRegistrationModel from "../../model/auth/CompanyRegistrationModel";
import { createCompanyRegistrationAsync } from "../../services/auth/CompanyRegistrationService";
import { Bounce, toast } from "react-toastify";
import CityModel from "../../model/master/CityModel";
import DesignationModel from "../../model/master/DesignationModel";
import { getCities } from "../../services/CityService";
import { getCitiesAsync } from "../../services/master/CityService";
import { getDesignations } from "../../services/master/DesignationService";
const initialCompanyRegistration: CompanyRegistrationModel = {
  companyLogo: null,
  companyName: "",
  companyUrl: "",
  emailAddress: "",
  mobileNo: "",
  cityId: 0,
  contactPersonName: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  designationId: 0,
  password: "",
  confirmPassword: "",
  roleId: 8,
};
const initialErrors: FieldErrorModel[] = [];
const CompanyRegistrationUtility = () => {
  const [cities, setCities] = useState<CityModel[] | null>([]);
  const [designation, setDesignation] = useState<DesignationModel[] | null>([]);

  async function fetchCities() {
    try {
      const response = await getCitiesAsync();
      if (response.status === 200) {
        setCities(response.data);
      } else {
        console.error("Failed to fetch cities:", response.message);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  async function fetchDesignation() {
    try {
      const response = await getDesignations();
      if (response.status === 200) {
        setDesignation(response.data);
      } else {
        console.error("Failed to fetch cities:", response.message);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  useEffect(() => {
    fetchCities();
    fetchDesignation();
  }, []);

  const [companyRegistration, setCompanyRegistration] =
    useState<CompanyRegistrationModel>(initialCompanyRegistration);

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

  const onCompanyRegistration = async (companyRegistration : FormData) => {
    if (isValidate()) {
      const response = await createCompanyRegistrationAsync(
        companyRegistration
      );

      response.status === 200
        ? toast.success(response.message, {
            // toastId: "company__registration__toast",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
        : toast.error(response.message, {
            // toastId: "company__registration__toast",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyRegistration((previous) => ({
          ...previous,
          companyLogo: file, // Set the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setCompanyRegistration((previous) => ({ ...previous, [name]: value }));

    setErrorInfo((previous) => {
      if (value !== "") {
        return previous.filter((error) => error.fieldName !== name);
      }
      return previous;
    });
  };

  const onSelectFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setCompanyRegistration((prev) => ({
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

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];
    if (companyRegistration.companyLogo === null) {
      newErrors.push({
        fieldName: "companyLogo",
        errorMessage: "Select a company logo",
      });
    }
    if (companyRegistration.companyName === "") {
      newErrors.push({
        fieldName: "companyName",
        errorMessage: "Enter Company Name",
      });
    }
    if (companyRegistration.companyUrl === "") {
      newErrors.push({
        fieldName: "companyUrl",
        errorMessage: "Enter Company Website URL",
      });
    }
    if (companyRegistration.mobileNo === "") {
      newErrors.push({
        fieldName: "mobileNo",
        errorMessage: "Enter mobile number",
      });
    }
    if (companyRegistration.cityId === 0) {
      newErrors.push({
        fieldName: "cityId",
        errorMessage: "Select a location",
      });
    }
    if (companyRegistration.contactPersonName === "") {
      newErrors.push({
        fieldName: "contactPersonName",
        errorMessage: "Enter Contact Person Name",
      });
    }
    if (companyRegistration.contactPersonPhone === "") {
      newErrors.push({
        fieldName: "contactPersonPhone",
        errorMessage: "Enter Contact Person Mobile Number",
      });
    }
    if (companyRegistration.designationId === 0) {
      newErrors.push({
        fieldName: "cityId",
        errorMessage: "Select a designation",
      });
    }
    if (companyRegistration.contactPersonEmail === "") {
      newErrors.push({
        fieldName: "contactPersonEmail",
        errorMessage: "Enter contact person email address",
      });
    } else {
      if (!isValidEmailAddress(companyRegistration.contactPersonEmail)) {
        newErrors.push({
          fieldName: "contactPersonEmail",
          errorMessage: "Enter valid email address",
        });
      }
    }
    if (companyRegistration.emailAddress === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else {
      if (!isValidEmailAddress(companyRegistration.emailAddress)) {
        newErrors.push({
          fieldName: "emailAddress",
          errorMessage: "Enter valid email address",
        });
      }
    }
    if (companyRegistration.password === "") {
      newErrors.push({
        fieldName: "password",
        errorMessage: "Enter password",
      });
    }
    if (companyRegistration.confirmPassword === "") {
      newErrors.push({
        fieldName: "confirmPassword",
        errorMessage: "Enter confirm password",
      });
    }

    if (
      companyRegistration.confirmPassword !== "" &&
      companyRegistration.password !== ""
    ) {
      // Regex for password validation: Minimum 5 characters, at least one letter, one uppercase letter, one number, and one special character
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
      // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\\\/\-_\+;]).{5,}$/;

      if (
        companyRegistration.confirmPassword !== companyRegistration.password
      ) {
        newErrors.push({
          fieldName: "confirmPassword",
          errorMessage: "Password not match",
        });
        newErrors.push({
          fieldName: "password",
          errorMessage: "Password not match",
        });
      }

      // Regex for password validation: Minimum 5 characters, at least one letter, one uppercase letter, one number, and one special character
      // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
      if (!passwordRegex.test(companyRegistration.password)) {
        newErrors.push({
          fieldName: "password",
          errorMessage:
            "Password must be at least 5 characters long, contain at least one letter, one uppercase letter, one number, and one special character",
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
    Object.entries(companyRegistration).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call the utility function to handle form submission
    onCompanyRegistration(formData);
  };

  return {
    cities,
    designation,
    companyRegistration,
    onCompanyRegistration,
    onFileChange,
    onTextFieldChange,
    onSelectFieldChange,
    errorInfo,
    handleSubmit
  };
};
export default CompanyRegistrationUtility;
//export default CompanyRegistrationService;
