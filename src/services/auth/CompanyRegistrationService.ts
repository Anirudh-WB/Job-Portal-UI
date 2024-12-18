import axios from "axios";
import CompanyRegistrationModel from "../../model/auth/CompanyRegistrationModel";
import ApiResponse from "../../common/ApiResponse";
import { API_BASE_URL } from "../../APIConfig";

export const createCompanyRegistrationAsync = async (
  jobApplication: FormData
): Promise<ApiResponse<CompanyRegistrationModel>> => {
  //JobApplicationUtility
  let result: ApiResponse<CompanyRegistrationModel> = {
    data: null,
    status: 0,
    message: "",
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/User`, jobApplication);
    result = {
      data: response.data,
      status: response.status,
      message:
        "Your registration has been successfully completed! Please activate your account using the link sent to your email.",
    };
  } catch (error: any) {
    // Handle error response
    if (error.response) {
      const { status, data } = error.response;
      if (status === 409) {
        result = {
          data: null,
          status: status,
          message: data || "Conflict: Duplicate data detected",
        };
      } else if (data && data.errors) {
        result = {
          data: null,
          status: status,
          message: data.title || "Validation errors occurred",
        };
      } else {
        result = {
          data: null,
          status: status,
          message: data || error.message,
        };
      }
    } else if (error.request) {
      // Network or request errors
      result = {
        data: null,
        status: 0,
        message: "No response received from the server",
      };
    } else {
      // Other unexpected errors
      result = {
        data: null,
        status: 0,
        message: error.message || "An unknown error occurred",
      };
    }
  }

  return result;
};
