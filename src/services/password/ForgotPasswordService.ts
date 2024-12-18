import axios from "axios";
import ApiResponse from "../../common/ApiResponse";
import { API_BASE_URL } from "../../APIConfig";
import ForgotPassworRequest from "../../model/password/ForgotPasswordRequest";

export const ForgotPasswordAsync = async (
  body: ForgotPassworRequest
): Promise<ApiResponse<boolean>> => {
  let result: ApiResponse<boolean> = {
    data: null,
    status: 0,
    message: "",
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/forgot-password`,
      body
    );
    result = {
      data: response.data,
      status: response.status,
      message:
        "A password reset link has been sent to your email. Please check your inbox to continue.",
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
