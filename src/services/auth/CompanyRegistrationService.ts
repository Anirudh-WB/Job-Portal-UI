import axios from "axios";
import CompanyRegistrationModel from "../../model/auth/CompanyRegistrationModel";
import ApiResponse from "../../common/ApiResponse";
import { API_BASE_URL } from "../../APIConfig";

export const createCompanyRegistrationAsync = async ( jobApplication: CompanyRegistrationModel): Promise<ApiResponse<CompanyRegistrationModel>> => {
    //JobApplicationUtility
        let result: ApiResponse<CompanyRegistrationModel> = {
            data: null,
            status: 0,
            message : ""
           
          };
      
        await axios
          .post(`${API_BASE_URL}/User`, jobApplication)
          .then(function (response) {
            result = { data: response.data, status: response.status , message : "Company Registration Successfully Completed!"};
          })
          .catch(function (error) {
    
           // alert(JSON.stringify(error.response));
           
            if (error.response) {
              if (error.response.data.errors){
              //  alert("A");
              
                result =  {data :null,  status:error.response.status , message : error.response.data.title};
              }else{
               // alert("AB");
              
                //console.log(error.response);
               // console.log(error.response.status);
               // console.log(error.response.data);
                if (error.response.status === 409){
                  result =  {data :null,  status:error.response.status , message :error.response.data};
                }else{
                  result =  {data :null,  status:error.response.status , message :error.message};
                }
               
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
    