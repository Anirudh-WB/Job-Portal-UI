import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import ApiResponse from "../../common/ApiResponse";
import DesignationModel from "../../model/master/DesignationModel";

export const getDesignations = async (): Promise<
  ApiResponse<DesignationModel[]>
> => {
  let result: ApiResponse<DesignationModel[]> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/Designation`)
    .then(function (response) {
      // console.log()
      //alert(JSON.stringify(response));
      //return { data: response.data, status: response.status };
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
