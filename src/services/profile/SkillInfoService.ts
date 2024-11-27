import axios from "axios";
import { API_BASE_URL } from "../../APIConfig";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import ApiResponse from "../../common/ApiResponse";
import SkillInfoModel from "../../model/profile/SkillInfoModel";
import SkillDetailModel from "../../model/profile/SkillInfoModel";
import SkillInfoViewModel from "../../model/profile/SkillInfoViewModel";


// export const createSkillInfoAsync = async (personalInfo: SkillInfoModel[]): Promise<ApiResponse<SkillInfoModel[]>> => {
//   let result: ApiResponse<SkillInfoModel[]> = {
//     data: null,
//     status: 0,
//     message: "",
//   };

//   await axios
//     .post(`${API_BASE_URL}/SkillInfo`, personalInfo)
//     .then(function (response) {
//       // console.log()
//       // alert(JSON.stringify(response));
//       result = {
//         data: response.data,
//         status: response.status,
//         message: "Experience information created",
//       };
//     })
//     .catch(function (error) {
//       alert(JSON.stringify(error));

//       if (error.response) {
//         if (error.response.data.errors) {
//           result = {
//             data: null,
//             status: error.response.status,
//             message: error.response.data.title,
//           };
//         } else {
//           result = {
//             data: null,
//             status: error.response.status,
//             message: error.response.data,
//           };
//         }
//       } else if (error.request) {
//         alert("request");
//         alert(JSON.stringify(error));
//       } else {
//         alert("other");
//         alert(JSON.stringify(error));
//       }
//     });

//   return result;
// };

export const createSkillInfoAsync = async (personalInfo: SkillInfoModel): Promise<ApiResponse<SkillInfoModel>> => {
  let result: ApiResponse<SkillInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .post(`${API_BASE_URL}/SkillInfo`, personalInfo)
    .then(function (response) {
      // console.log()
      // alert(JSON.stringify(response));
      result = {
        data: response.data,
        status: response.status,
        message: "Skill information created",
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
        alert("request");
        alert(JSON.stringify(error));
      } else {
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};
export const updateSkillInfoAsync = async (
  personalInfo: SkillInfoModel,
  id: number
): Promise<ApiResponse<SkillInfoModel>> => {
  let result: ApiResponse<SkillInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .put(`${API_BASE_URL}/SkillInfo/${id}`, personalInfo)
    .then(function (response) {
      result = {
        data: response.data,
        status: response.status,
        message: "Skill information update",
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
      } else if (error.request) {
        alert("request");
        alert(JSON.stringify(error));
      } else {
        alert("other");
        alert(JSON.stringify(error));
        //  console.log("3");
        // Something happened in setting up the request that triggered an Error
        //result.error = "No response received from server";
        //result.errorCode = error.response.status;
      }
    });

  return result;
};

export const getSkillInfoByUserIdAsync = async (
  userId: number
): Promise<ApiResponse<SkillInfoViewModel[]>> => {
  let result: ApiResponse<SkillInfoViewModel[]> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/SkillInfo/ByUserId/${userId}`)
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
      } else {
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};

export const getSkillInfoAsync = async (
  id: number
): Promise<ApiResponse<SkillInfoModel>> => {
  let result: ApiResponse<SkillInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .get(`${API_BASE_URL}/SkillInfo/${id}`)
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
      } else {
        alert("other");
        alert(JSON.stringify(error));
      }
    });

  return result;
};

export const deleteSkillInfoAsync = async (
  id: number
): Promise<ApiResponse<SkillInfoModel>> => {
  let result: ApiResponse<SkillInfoModel> = {
    data: null,
    status: 0,
    message: "",
  };

  await axios
    .delete(`${API_BASE_URL}/SkillInfo/${id}`)
    .then(function (response) {
      result = { data: response.data, status: response.status, message: "Skill information deleted" };
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
