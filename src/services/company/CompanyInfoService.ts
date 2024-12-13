import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import CompanyInfoModel from "../../model/company/CompanyInfoModel";
import ApiResponse from "../../common/ApiResponse";

export const createCompanyInfoAsync = async (
  companyInfo: CompanyInfoModel
): Promise<ApiResponse<CompanyInfoModel>> => {
  let result: ApiResponse<CompanyInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/company`, companyInfo)
    .then(function (response) {
      // console.log()
      // alert(JSON.stringify(response));
      result = {
        data: response.data,
        status: response.status,
        message: "Company information created",
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
export const updateCompanyInfoAsync = async (
  companyInfo: CompanyInfoModel,
  id: number
): Promise<ApiResponse<CompanyInfoModel>> => {
  let result: ApiResponse<CompanyInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .put(`${API_BASE_URL}/company/${id}`, companyInfo)
    .then(function (response) {
      result = {
        data: response.data,
        status: response.status,
        message: "Company information update",
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
      } 
    });

  return result;
};

export const getCompanyInfoByUserIdAsync = async (
  userId: number
): Promise<ApiResponse<CompanyInfoModel[]>> => {
  let result: ApiResponse<CompanyInfoModel[]> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/Company/ByUserId/${userId}`)
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
      }
    });

  return result;
};

export const getCompanyInfoAsync = async (
  id: number
): Promise<ApiResponse<CompanyInfoModel>> => {
  let result: ApiResponse<CompanyInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/Company/${id}`)
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
      } 
    });

  return result;
};

export const deleteCompanyInfoAsync = async (
  id: number
): Promise<ApiResponse<CompanyInfoModel>> => {
  let result: ApiResponse<CompanyInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .delete(`${API_BASE_URL}/Company/${id}`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "Company information deleted" };
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
