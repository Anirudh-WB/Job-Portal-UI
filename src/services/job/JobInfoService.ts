import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import ApiResponse from "../../common/ApiResponse";
import JobInfoModel from "../../model/job/JobInfoModel";




const formatDynamicErrorMessages = (errors: Record<string, string[]>): string => {
  return Object.entries(errors)
    .map(([fieldName, errorMessages]) => `${fieldName}: ${errorMessages.join(', ')}`)
    .join(', ');
};
export const createJobInfoAsync = async (personalInfo: JobInfoModel): Promise<ApiResponse<JobInfoModel>> => {

  let result: ApiResponse<JobInfoModel> = {
    data: null,
    status: 0,
    message: ""

  };

  await axios
    .post(`${API_BASE_URL}/JobInfo`, personalInfo)
    .then(function (response) {
      // console.log()
      // alert(JSON.stringify(response));
      result = { data: response.data, status: response.status, message: "job information created" };
    })
    .catch(function (error) {
      alert(JSON.stringify(error));


      if (error.response) {


        if (error.response.data.errors) {

          result = { data: null, status: error.response.status, message: error.response.data.title };
        } else {
          result = { data: null, status: error.response.status, message: error.response.data };
        }


      } else if (error.request) {

        alert("request")
        alert(JSON.stringify(error));
      } else {
        alert("other")
        alert(JSON.stringify(error));

      }
    });

  return result;
};
export const updateJobInfoAsync = async (personalInfo: JobInfoModel, id: number): Promise<ApiResponse<JobInfoModel>> => {

  let result: ApiResponse<JobInfoModel> = {
    data: null,
    status: 0,
    message: ""

  };

  await axios
    .put(`${API_BASE_URL}/JobInfo/${id}`, personalInfo)
    .then(function (response) {

      result = { data: response.data, status: response.status, message: "Address information update" };
    })
    .catch(function (error) {

      if (error.response) {

        if (error.response.data.errors) {

          result = { data: null, status: error.response.status, message: error.response.data };
        } else {
          result = { data: null, status: error.response.status, message: error.response.data };
        }



      } else if (error.request) {
        alert("request")
        alert(JSON.stringify(error));

      } else {
        alert("other")
        alert(JSON.stringify(error));
        //  console.log("3");
        // Something happened in setting up the request that triggered an Error
        //result.error = "No response received from server";
        //result.errorCode = error.response.status;
      }
    });

  return result;
};

export const getJobInfoByIdAsync = async (jobId: number): Promise<ApiResponse<JobInfoModel>> => {

  let result: ApiResponse<JobInfoModel> = {
    data: null,
    status: 0,
    message: ""

  };

  await axios
    .get(`${API_BASE_URL}/JobInfo/${jobId}`,)
    .then(function (response) {

      result = { data: response.data, status: response.status, message: "ok" };
    })
    .catch(function (error) {
      //alert(JSON.stringify(error));


      if (error.response) {

        if (error.response.data.errors) {

          result = { data: null, status: error.response.status, message: error.response.data.title };
        } else {
          result = { data: null, status: error.response.status, message: error.response.data };
        }


      } else if (error.request) {

        result = { data: null, status: error.request.status, message: error.message };

      } else {
        alert("other")
        alert(JSON.stringify(error));

      }
    });

  return result;
};

export const deleteJobInfoByIdAsync = async (jobId: number): Promise<ApiResponse<JobInfoModel>> => {

  let result: ApiResponse<JobInfoModel> = {
    data: null,
    status: 0,
    message: ""

  };

  await axios
    .delete(`${API_BASE_URL}/JobInfo/${jobId}`,)
    .then(function (response) {

      result = { data: response.data, status: response.status, message: "ok" };
    })
    .catch(function (error) {
      //alert(JSON.stringify(error));


      if (error.response) {

        if (error.response.data.errors) {

          result = { data: null, status: error.response.status, message: error.response.data.title };
        } else {
          result = { data: null, status: error.response.status, message: error.response.data };
        }


      } else if (error.request) {

        result = { data: null, status: error.request.status, message: error.message };

      } else {
        alert("other")
        alert(JSON.stringify(error));

      }
    });

  return result;
};

export const getJobInfosAsync = async (): Promise<ApiResponse<JobInfoModel[]>> => {
  console.log("getJobInfosAsync")
  let result: ApiResponse<JobInfoModel[]> = {
    data: null,
    status: 0,
    message: ""

  };

  await axios
    .get(`${API_BASE_URL}/JobInfo`,)
    .then(function (response) {

      result = { data: response.data, status: response.status, message: "ok" };
    })
    .catch(function (error) {
      //alert(JSON.stringify(error));


      if (error.response) {

        if (error.response.data.errors) {

          result = { data: null, status: error.response.status, message: error.response.data.title };
        } else {
          result = { data: null, status: error.response.status, message: error.response.data };
        }


      } else if (error.request) {

        result = { data: null, status: error.request.status, message: error.message };

      } else {
        alert("other")
        alert(JSON.stringify(error));

      }
    });

  return result;
};