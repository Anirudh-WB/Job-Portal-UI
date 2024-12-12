import axios from "axios";
import JobseekerRegistrationModel from "../../model/auth/JobseekerRegistrationModel";
import ApiResponse from "../../common/ApiResponse";
import { API_BASE_URL } from "../../APIConfig";

export const createJobseekerRegistrationAsync = async (
  jobApplication: FormData
): Promise<ApiResponse<JobseekerRegistrationModel>> => {
  let result: ApiResponse<JobseekerRegistrationModel> = {
    data: null,
    status: 0,
    message: "",
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/User`, jobApplication);
    result = {
      data: response.data,
      status: response.status,
      message: "Job Seeker Registration Successfully Completed!",
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
