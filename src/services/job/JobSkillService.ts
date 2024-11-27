import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import ApiResponse from "../../common/ApiResponse";
import JobSkillModel from "../../model/job/JobSkillModel";




const formatDynamicErrorMessages = (errors: Record<string, string[]>): string => {
    return Object.entries(errors)
      .map(([fieldName, errorMessages]) => `${fieldName}: ${errorMessages.join(', ')}`)
      .join(', ');
  };
export const createJobSkillAsync = async ( personalInfo: JobSkillModel[]): Promise<ApiResponse<JobSkillModel[]>> => {

    let result: ApiResponse<JobSkillModel[]> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .post(`${API_BASE_URL}/JobSkill`, personalInfo)
      .then(function (response) {
        // console.log()
       // alert(JSON.stringify(response));
        result = { data: response.data, status: response.status , message : "job skill created or updated"};
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
       
  
        if (error.response) {
         

          if (error.response.data.errors){
          
            result =  {data :null,  status:error.response.status , message : error.response.data.title};
          }else{
            result =  {data :null,  status:error.response.status , message : error.response.data};
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
  export const updateJobSkillAsync = async ( personalInfo: JobSkillModel,id:number): Promise<ApiResponse<JobSkillModel>> => {

    let result: ApiResponse<JobSkillModel> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .put(`${API_BASE_URL}/JobSkill/${id}`, personalInfo)
      .then(function (response) {
        
        result = { data: response.data, status: response.status , message : "Address information update"};
      })
      .catch(function (error) {
        
        if (error.response) {
         
          if (error.response.data.errors){
            
            result =  {data :null,  status:error.response.status , message : error.response.data.title};
          }else{
            result =  {data :null,  status:error.response.status , message : error.response.data};
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

  export const getJobSkillByJobIdAsync = async ( jobId: number): Promise<ApiResponse<JobSkillModel[]>> => {

    let result: ApiResponse<JobSkillModel[]> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .get(`${API_BASE_URL}/JobSkill/JobSkillByJobId/${jobId}`,)
      .then(function (response) {
      
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