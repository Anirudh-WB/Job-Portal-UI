import { useState } from "react";
import JobseekerRegistrationModel from "../../model/auth/JobseekerRegistrationModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import { createJobseekerRegistrationAsync } from "../../services/auth/JobseekerRegistrationService";
import { Bounce, toast } from "react-toastify";

const initialJobseekerRegistration: JobseekerRegistrationModel = {
  profilePic: null,
  emailAddress: "",
  firstName: "",
  lastName: "",
  password: "",
  roleId: 7,
  mobileNo: "",
  confirmPassword: "",
};

const initialErrors: FieldErrorModel[] = [];

const JobseekerRegistrationUtility = () => {
  const [jobseekerRegistration, setJobseekerRegistration] =
    useState<JobseekerRegistrationModel>(initialJobseekerRegistration);

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);

  const onJobseekerRegistration = async (formData: FormData) => {
    if (isValidate()) {
      const response = await createJobseekerRegistrationAsync(formData);

      if (response.status === 200) {
        toast.success(response.message, {
          closeOnClick: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });

        setJobseekerRegistration(initialJobseekerRegistration);
      } else {
        toast.error(response.message, {
          closeOnClick: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJobseekerRegistration((previous) => ({
          ...previous,
          profilePic: file, // Set the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJobseekerRegistration((previous) => ({ ...previous, [name]: value }));

    // Remove error if field is valid
    setErrorInfo((previous) =>
      value !== ""
        ? previous.filter((error) => error.fieldName !== name)
        : previous
    );
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (!jobseekerRegistration.profilePic) {
      newErrors.push({
        fieldName: "profilePic",
        errorMessage: "Select a profile picture",
      });
    }

    if (!jobseekerRegistration.firstName) {
      newErrors.push({
        fieldName: "firstName",
        errorMessage: "Enter first name",
      });
    }

    if (!jobseekerRegistration.lastName) {
      newErrors.push({
        fieldName: "lastName",
        errorMessage: "Enter last name",
      });
    }

    if (!jobseekerRegistration.mobileNo) {
      newErrors.push({
        fieldName: "mobileNo",
        errorMessage: "Enter mobile number",
      });
    } else if (jobseekerRegistration.mobileNo.length !== 10) {
      newErrors.push({
        fieldName: "mobileNo",
        errorMessage: "Invalid mobile number. Please check and try again.",
      });
    }

    if (!jobseekerRegistration.emailAddress) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter email address",
      });
    } else if (!isValidEmailAddress(jobseekerRegistration.emailAddress)) {
      newErrors.push({
        fieldName: "emailAddress",
        errorMessage: "Enter a valid email address",
      });
    }

    if (!jobseekerRegistration.password) {
      newErrors.push({ fieldName: "password", errorMessage: "Enter password" });
    }

    if (!jobseekerRegistration.confirmPassword) {
      newErrors.push({
        fieldName: "confirmPassword",
        errorMessage: "Enter confirm password",
      });
    }

    if (
      jobseekerRegistration.password &&
      jobseekerRegistration.confirmPassword
    ) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\\/\-_+;]).{5,}$/;

      if (
        jobseekerRegistration.password !== jobseekerRegistration.confirmPassword
      ) {
        newErrors.push({
          fieldName: "password",
          errorMessage: "Passwords do not match",
        });
        newErrors.push({
          fieldName: "confirmPassword",
          errorMessage: "Passwords do not match",
        });
      } else if (!passwordRegex.test(jobseekerRegistration.password)) {
        newErrors.push({
          fieldName: "password",
          errorMessage:
            "Password must be at least 5 characters long, contain at least one uppercase letter, one number, and one special character",
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
    Object.entries(jobseekerRegistration).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call the utility function to handle form submission
    onJobseekerRegistration(formData);
  };

  return {
    jobseekerRegistration,
    onJobseekerRegistration,
    onFileChange,
    onTextFieldChange,
    errorInfo,
    handleSubmit,
  };
};

export default JobseekerRegistrationUtility;
