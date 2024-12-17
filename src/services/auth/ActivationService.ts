import axios from "axios";
import JobseekerRegistrationModel from "../../model/auth/JobseekerRegistrationModel";
import ApiResponse from "../../common/ApiResponse";
import { API_BASE_URL } from "../../APIConfig";

export const ActivateProfileAsync = async (
  token: string
): Promise<ApiResponse<JobseekerRegistrationModel>> => {
  let result: ApiResponse<JobseekerRegistrationModel> = {
    data: null,
    status: 0,
    message: "",
  };

  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/activate-account?token=${token}`
    );
    result = {
      data: response.data,
      status: response.status,
      message:
        "Your account has been successfully activated. Please log in. You will be redirected to the login page shortly.",
    };
  } catch (error: any) {
    // Handle error response
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        result = {
          data: null,
          status: status,
          message: data || "Invalid or expired activation token.",
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
