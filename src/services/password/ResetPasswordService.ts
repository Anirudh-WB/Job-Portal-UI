import axios from "axios";
import ApiResponse from "../../common/ApiResponse";
import { API_BASE_URL } from "../../APIConfig";
import ResetPasswordRequest from "../../model/password/ResetPasswordRequest";

export const ResetPasswordAsync = async (
  body: ResetPasswordRequest,
  token: string | undefined
): Promise<ApiResponse<boolean>> => {
  let result: ApiResponse<boolean> = {
    data: null,
    status: 0,
    message: "",
  };

  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/reset-password?token=${token}`,
      body
    );
    result = {
      data: response.data,
      status: response.status,
      message:
        "Password reset successful. You will be redirected to the login page shortly.",
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
