import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import ApiResponse from "../../common/ApiResponse";



const formatDynamicErrorMessages = (errors: Record<string, string[]>): string => {
    return Object.entries(errors)
      .map(([fieldName, errorMessages]) => `${fieldName}: ${errorMessages.join(', ')}`)
      .join(', ');
  };
export const createPersonalInfoAsync = async ( personalInfo: PersonalInfoModel): Promise<ApiResponse<PersonalInfoModel>> => {

    let result: ApiResponse<PersonalInfoModel> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .post(`${API_BASE_URL}/PersonalInfo`, personalInfo)
      .then(function (response) {
        // console.log()
       // alert(JSON.stringify(response));
        result = { data: response.data, status: response.status , message : "Personal information created"};
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
       
  
        if (error.response) {
          //console.log("1");
         // console.log(error.response);
          //alert("response")
         // alert(JSON.stringify(error.response));
         // console.log(error.response.status);
         // console.log(error.response.data);

          if (error.response.data.errors){
            //const dynamicErrorMessages = formatDynamicErrorMessages(error.response.data.errors);
            //alert(dynamicErrorMessages)
           // console.log(error.response.data.errors);
            //console.log(error.response.data.title);
            result =  {data :null,  status:error.response.status , message : error.response.data.title};
          }else{
            result =  {data :null,  status:error.response.status , message : error.response.data};
          }
         
  
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //return { error: error.response.data, message  : "", errorCode: error.response.status };
          //alert(JSON.stringify(error.response.data.errors));
          //result.error = error.response.data.error;
          //result.errorCode = error.response.status;
          //result.message = error.message;
        } else if (error.request) {
            alert("request")
            alert(JSON.stringify(error));
         // console.log("2");
          // The request was made but no response was received
          //return { error: "No response received from server", message  : "", errorCode: error.response.status  };
         // result.error = error.message;
          //result.errorCode = error.request.code;
         // result.message = error.message;
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
  export const updatePersonalInfoAsync = async ( personalInfo: PersonalInfoModel,id:number): Promise<ApiResponse<PersonalInfoModel>> => {

    let result: ApiResponse<PersonalInfoModel> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .put(`${API_BASE_URL}/PersonalInfo/${id}`, personalInfo)
      .then(function (response) {
        //console.log(response.data);
        //console.log(response.status);
        //alert("s");
        //alert(JSON.stringify(response));
        result = { data: response.data, status: response.status , message : "Personal information update"};
      })
      .catch(function (error) {
        //alert("e");
        //alert(JSON.stringify(error));
       
  
        if (error.response) {
          //console.log("1");
         // console.log(error.response);
          //alert("response")
         // alert(JSON.stringify(error.response));
         // console.log(error.response.status);
         // console.log(error.response.data);

          if (error.response.data.errors){
            //const dynamicErrorMessages = formatDynamicErrorMessages(error.response.data.errors);
            //alert(dynamicErrorMessages)
           // console.log(error.response.data.errors);
            //console.log(error.response.data.title);
            result =  {data :null,  status:error.response.status , message : error.response.data.title};
          }else{
            result =  {data :null,  status:error.response.status , message : error.response.data};
          }
         
  
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //return { error: error.response.data, message  : "", errorCode: error.response.status };
          //alert(JSON.stringify(error.response.data.errors));
          //result.error = error.response.data.error;
          //result.errorCode = error.response.status;
          //result.message = error.message;
        } else if (error.request) {
            alert("request")
            alert(JSON.stringify(error));
         // console.log("2");
          // The request was made but no response was received
          //return { error: "No response received from server", message  : "", errorCode: error.response.status  };
         // result.error = error.message;
          //result.errorCode = error.request.code;
         // result.message = error.message;
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

  export const getPersonalInfoByUserIdAsync = async ( userId: number): Promise<ApiResponse<PersonalInfoModel>> => {

    let result: ApiResponse<PersonalInfoModel> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .get(`${API_BASE_URL}/PersonalInfo/ByUserId/${userId}`,)
      .then(function (response) {
        // console.log()
        //alert(JSON.stringify(response));
        //return { data: response.data, status: response.status };
        result =  {data :response.data,  status:response.status , message : "ok"};
      })
      .catch(function (error) {
        //alert(JSON.stringify(error));
       
  
        if (error.response) {
        

          if (error.response.data.errors){
          
            result =  {data :null,  status:error.response.status , message : error.response.data.title};
          }else{
            result =  {data :null,  status:error.response.status , message : error.response.data};
          }
         
        } else if (error.request) {
          
            result =  {data :null,  status:error.request.status , message : error.message};
        
        } else {
            alert("other")
            alert(JSON.stringify(error));
        
        }
      });
  
    return result;
  };