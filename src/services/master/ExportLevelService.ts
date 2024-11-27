import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import ApiResponse from "../../common/ApiResponse";
import ExportLevelModel from "../../model/master/ExportLevelModel";

export const getExportLevels = async (): Promise<
  ApiResponse<ExportLevelModel[]>
> => {
  let result: ApiResponse<ExportLevelModel[]> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/ExportLevel`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "ok" };
     // alert(JSON.stringify(result));
    })
    .catch(function (error) {
     // alert(JSON.stringify(error));

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
