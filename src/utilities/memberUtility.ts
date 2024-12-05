import { useState } from "react";
import MemberModel from "../model/MemberModel";
import dayjs, { Dayjs } from "dayjs";
import { createMemberAsync } from "../services/MemberService";
import { FieldError } from "../common/FieldError";
import axios, { AxiosError } from "axios";
const MemberUtility = () => {
  const initialMember: MemberModel = {
    id: 0,
    firstName: "Anzar",
    lastName: "",
    emailAddress: "anzar@yahoo.com",
    address: "",
    dob: dayjs(),
    genderId: 0,
    isActive: true,
    mobileNumber: "9968393124",
  };

  const [member, setMember] = useState<MemberModel>(initialMember);
  const [errors, setErrors] = useState<FieldError>({});

  const isValidate = (): boolean => {
    const newErrors: FieldError = {};

    // Example: Check if the required fields are not empty
    if (member.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
    }

    if (member.emailAddress.trim() === "") {
      newErrors.emailAddress = "Email Address is required";
    }

    if (member.mobileNumber.trim() === "") {
      newErrors.mobileNumber = "Mobile Number is required";
    }

    // Add more validation logic for other fields as needed

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  interface ErrorResponse {
    title: string;
    errors: {
      [key: string]: string[];
    };
    status: number;
    statusText: string;
    data: string;
  }
  const handleSave = async () => {
    const isValid = isValidate();
    if (isValid) {
      try {
        await createMemberAsync(member);
      } catch (error) {}
    }
  };

  return { member, setMember, errors, setErrors, handleSave };
};

export default MemberUtility;
