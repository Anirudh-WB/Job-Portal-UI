import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import ApiResponse from "../../common/ApiResponse";

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
export const createPersonalInfoAsync = async (
  personalInfo: PersonalInfoModel
): Promise<ApiResponse<PersonalInfoModel>> => {
  let result: ApiResponse<PersonalInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/PersonalInfo`, personalInfo)
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
          //const dynamicErrorMessages = formatDynamicErrorMessages(error.response.data.errors);
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

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //return { error: error.response.data, message  : "", errorCode: error.response.status };
        //result.error = error.response.data.error;
        //result.errorCode = error.response.status;
        //result.message = error.message;
      }
    });

  return result;
};
export const updatePersonalInfoAsync = async (
  personalInfo: PersonalInfoModel,
  id: number
): Promise<ApiResponse<PersonalInfoModel>> => {
  let result: ApiResponse<PersonalInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .put(`${API_BASE_URL}/PersonalInfo/${id}`, personalInfo)
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
          //const dynamicErrorMessages = formatDynamicErrorMessages(error.response.data.errors);
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

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //return { error: error.response.data, message  : "", errorCode: error.response.status };
        //result.error = error.response.data.error;
        //result.errorCode = error.response.status;
        //result.message = error.message;
      }
    });

  return result;
};

export const getPersonalInfoByUserIdAsync = async (
  userId: number
): Promise<ApiResponse<PersonalInfoModel>> => {
  let result: ApiResponse<PersonalInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/PersonalInfo/ByUserId/${userId}`)
    .then(function (response) {
      //return { data: response.data, status: response.status };
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
      }
    });

  return result;
};
