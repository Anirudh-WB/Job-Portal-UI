import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import ApiResponse from "../../common/ApiResponse";
import JobApplicationModel from "../../model/job/JobApplicationModel";
import JobApplicationViewModel from "../../model/job/JobApplicationViewModel";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";

export const createJobApplicationAsync = async ( jobApplication: JobApplicationModel): Promise<ApiResponse<JobApplicationModel>> => {
//JobApplicationUtility
    let result: ApiResponse<JobApplicationModel> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .post(`${API_BASE_URL}/JobApplication`, jobApplication)
      .then(function (response) {
        result = { data: response.data, status: response.status , message : "job application created or updated"};
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

  export const getJobApplicationsAsync = async (jobApplicationRequest:  JobApplicationRequest ): Promise<ApiResponse<JobApplicationViewModel[]>> => {

    let result: ApiResponse<JobApplicationViewModel[]> = {
        data: null,
        status: 0,
        message : ""
       
      };
  
    await axios
      .get(`${API_BASE_URL}/JobApplication/`,{
        params: {
          jobId: jobApplicationRequest.jobId
        }
      })
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