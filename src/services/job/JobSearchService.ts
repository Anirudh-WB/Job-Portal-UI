import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import ApiResponse from "../../common/ApiResponse";
import JobSearchModel from "../../model/job/JobSearchModel";
import JobSearchResultModel from "../../model/job/JobSearchResultModel";

export const jobSearchAsync = async (
  jobsearch: JobSearchModel
): Promise<ApiResponse<JobSearchResultModel[]>> => {
  let result: ApiResponse<JobSearchResultModel[]> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/JobSearch`, jobsearch)
    .then(function (response) {
      // console.log()
      result = {
        data: response.data,
        status: response.status,
        message: "job city created or updated",
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
            message: error.message,
          };
        }
      } else {
      }
    });

  return result;
};

export const jobSearchAsync1 = async (): Promise<ApiResponse<any>> => {
  let result: ApiResponse<any> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/JobSearch`)
    .then(function (response) {
      // console.log()
      result = {
        data: response.data,
        status: response.status,
        message: "job city created or updated",
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
            message: error.message,
          };
        }
      } else {
       
      }
    });

  return result;
};
