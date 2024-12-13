import React, { useEffect, useState } from "react";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import {
  createPersonalInfoAsync,
  getPersonalInfoByUserIdAsync,
  updatePersonalInfoAsync,
} from "../../services/profile/PersonalInfoService";
import { Bounce, toast } from "react-toastify";
import { getExperienceInfoByUserIdAsync } from "../../services/profile/ExperienceInfoService";
import ExperienceInfoViewModel from "../../model/profile/ExperienceInfoViewModel";

interface PersonalInfoUtilityProps {
  loginUserId: number;
}

const PersonalInfoUtility = ({ loginUserId }: PersonalInfoUtilityProps) => {
  const initialPersonalInfo: PersonalInfoModel = {
    id: 0,
    profilePic: null,
    designationName: "",
    compmanyName: "",
    firstName: "default",
    lastName: "",
    emailAddress: "tee@test.com",
    mobileNumber: "1236897",
    isActive: true,
    userId: loginUserId,
  };

  const initialErrors: FieldErrorModel[] = [];
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfoModel>(initialPersonalInfo);
  const [experienceInfo, setExperienceInfo] = useState<
    ExperienceInfoViewModel[]
  >([]);
  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

  useEffect(() => {
    getPersonalInfo(loginUserId);
    getExperienceInfo(loginUserId);
  }, [loginUserId]);

  // Fetch experience info
  async function getExperienceInfo(loginUserId: number) {
    try {
      const response = await getExperienceInfoByUserIdAsync(loginUserId);
      if (response.status === 200 && Array.isArray(response.data)) {
        setExperienceInfo(response.data); // Set the array of experiences
      } else {
        toast.error("Failed to load experience info", {
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error fetching experience info:", error);
      toast.error("An error occurred while fetching experience info", {
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  // Fetch personal info
  async function getPersonalInfo(loginUserId: number) {
    try {
      const response = await getPersonalInfoByUserIdAsync(loginUserId);
      if (response.status === 200 && response.data) {
        setPersonalInfo(response.data);
      } else {
        toast.error("Failed to load personal info", {
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error fetching personal info:", error);
      toast.error("An error occurred while fetching personal info", {
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setPersonalInfo((previous) => ({
        ...previous,
        profilePic: file,
      }));
    }
  };

  // Handle text field change
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

  const onPersonalInfoSave = async (data: FormData) => {
    if (isValidate()) {
      try {
        let response;

        const id = Number(data.get("id"));

        if (id > 0) {
          // console.log("DATA :",typeof formDataObject);

          response = await updatePersonalInfoAsync(data, id);
        } else {
          response = await createPersonalInfoAsync(data);
          if (response.data && response.status === 200) {
            const responseData = response.data;
            setPersonalInfo((prev) => ({ ...prev, id: responseData.id }));
          }
        }

        if (response.status === 200) {
          toast.success("Personal Info Updated", {
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else {
          toast.error(response.message, {
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error("Error saving personal info:", error);
        toast.error("An error occurred while saving personal info", {
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.error("All conditions marked in red are compulsory", {
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (personalInfo.firstName === "") {
      newErrors.push({
        fieldName: "firstName",
        errorMessage: "Enter first name",
      });
    }
    // Validate email address
    if (personalInfo.emailAddress.trim() === "") {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else if (!isValidEmailAddress(personalInfo.emailAddress)) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Invalid email address",
      });
    }

    if (personalInfo.mobileNumber === "") {
      newErrors.push({
        fieldName: "mobileNumber",
        errorMessage: "Enter Mobile Number ",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(personalInfo).forEach(([key, value]) => {
      formData.append(key, value);
      // console.log(key ,value);
    });

    onPersonalInfoSave(formData);
  };

  return {
    personalInfo,
    setPersonalInfo,
    experienceInfo, // Expose experience info
    onFileChange,
    onTextFieldChanged,
    onPersonalInfoSave,
    errorInfo,
    handleSubmit,
  };
};

export default PersonalInfoUtility;
