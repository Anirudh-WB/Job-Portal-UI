import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import ApiResponse from "../../common/ApiResponse";
import ExperienceInfoModel from "../../model/profile/ExperienceInfoModel";
import ExperienceInfoViewModel from "../../model/profile/ExperienceInfoViewModel";

export const createExperienceInfoAsync = async (
  personalInfo: ExperienceInfoModel
): Promise<ApiResponse<ExperienceInfoModel>> => {
  let result: ApiResponse<ExperienceInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/ExperienceInfo`, personalInfo)
    .then(function (response) {
      // console.log()
      // alert(JSON.stringify(response));
      result = {
        data: response.data,
        status: response.status,
        message: "Experience information created",
      };
    })
    .catch(function (error) {
      alert(JSON.stringify(error));

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
        alert("request");
        alert(JSON.stringify(error));
      } else {
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};
export const updateExperienceInfoAsync = async (
  personalInfo: ExperienceInfoModel,
  id: number
): Promise<ApiResponse<ExperienceInfoModel>> => {
  let result: ApiResponse<ExperienceInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .put(`${API_BASE_URL}/ExperienceInfo/${id}`, personalInfo)
    .then(function (response) {
      result = {
        data: response.data,
        status: response.status,
        message: "Experience information update",
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
      } else if (error.request) {
        alert("request");
        alert(JSON.stringify(error));
      } else {
        alert("other");
        alert(JSON.stringify(error));
        //  console.log("3");
        // Something happened in setting up the request that triggered an Error
        //result.error = "No response received from server";
        //result.errorCode = error.response.status;
      }
    });

  return result;
};

export const getExperienceInfoByUserIdAsync = async (
  userId: number
): Promise<ApiResponse<ExperienceInfoViewModel[]>> => {
  let result: ApiResponse<ExperienceInfoViewModel[]> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/ExperienceInfo/ByUserId/${userId}`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "ok" };
    })
    .catch(function (error) {
      //alert(JSON.stringify(error));

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
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};

export const getExperienceInfoAsync = async (
  id: number
): Promise<ApiResponse<ExperienceInfoModel>> => {
  let result: ApiResponse<ExperienceInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/ExperienceInfo/${id}`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "ok" };
    })
    .catch(function (error) {
      //alert(JSON.stringify(error));

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
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};

export const deleteExperienceInfoAsync = async (
  id: number
): Promise<ApiResponse<ExperienceInfoModel>> => {
  let result: ApiResponse<ExperienceInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .delete(`${API_BASE_URL}/ExperienceInfo/${id}`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "Experience information deleted" };
    })
    .catch(function (error) {
      //alert(JSON.stringify(error));

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
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};
