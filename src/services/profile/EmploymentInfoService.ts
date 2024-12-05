import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";

import ApiResponse from "../../common/ApiResponse";
import EmploymentInfoModel from "../../model/profile/EmploymentInfoModel";

const formatDynamicErrorMessages = (
  errors: Record<string, string[]>
): string => {
  return Object.entries(errors)
    .map(
      ([fieldName, errorMessages]) =>
        `${fieldName}: ${errorMessages.join(", ")}`
    )
    .join(", ");
};
export const createEmploymentInfoAsync = async (
  personalInfo: EmploymentInfoModel
): Promise<ApiResponse<EmploymentInfoModel>> => {
  let result: ApiResponse<EmploymentInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/EmploymentInfo`, personalInfo)
    .then(function (response) {
      result = {
        data: response.data,
        status: response.status,
        message: "Personal information created",
      };
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.data.errors) {
          result = {
            data: null,
            status: error.response.status,
            message: error.response.data.title,
          };
        } else {
          result = {
            data: null,
            status: error.response.status,
            message: error.response.data,
          };
        }
      } else {
      }
    });

  return result;
};
export const updateEmploymentInfoAsync = async (
  personalInfo: EmploymentInfoModel,
  id: number
): Promise<ApiResponse<EmploymentInfoModel>> => {
  let result: ApiResponse<EmploymentInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .put(`${API_BASE_URL}/EmploymentInfo/${id}`, personalInfo)
    .then(function (response) {
      result = {
        data: response.data,
        status: response.status,
        message: "Personal information update",
      };
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.data.errors) {
          result = {
            data: null,
            status: error.response.status,
            message: error.response.data.title,
          };
        } else {
          result = {
            data: null,
            status: error.response.status,
            message: error.response.data,
          };
        }
      } else {
      }
    });

  return result;
};

export const getEmploymentInfoByUserIdAsync = async (
  userId: number
): Promise<ApiResponse<EmploymentInfoModel>> => {
  let result: ApiResponse<EmploymentInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/EmploymentInfo/ByUserId/${userId}`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "ok" };
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.data.errors) {
          result = {
            data: null,
            status: error.response.status,
            message: error.response.data.title,
          };
        } else {
          result = {
            data: null,
            status: error.response.status,
            message: error.response.data,
          };
        }
      } else if (error.request) {
        result = {
          data: null,
          status: error.request.status,
          message: error.message,
        };
      } else {
      }
    });

  return result;
};
