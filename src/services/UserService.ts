import axios from "axios";
import { API_BASE_URL } from "../APIConfig";
import ApiResponse from "../common/ApiResponse";
import { LoginModel, LoginResponseModel } from "../model/LoginModels";

export async function LoginAsync(login: LoginModel): Promise<ApiResponse<LoginResponseModel>> {

    let result: ApiResponse<LoginResponseModel> = {
        data: null,
        status: 0,
        message: "",
      };



      await axios
      .post(`${API_BASE_URL}/Auth/login`, login)
      .then(function (response) {
        // console.log()
        // alert(JSON.stringify(response));
        result = {
          data: response.data,
          status: response.status,
          message: "Login successfully",
        };
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
         // console.log(error);
         // alert(error.code);
         // alert(error.message);
         // console.log(error.code);
         // console.log(error.request);
          //alert("request1");
         // alert(JSON.stringify(error));

         result = {
          data: null,
          status: error.code,
          message: error.message,
        };
        } else {
          alert("other");
          alert(JSON.stringify(error));
        }
      });
      return result;
}