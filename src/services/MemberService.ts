import { API_BASE_URL } from "../APIConfig";
import MemberModel from "../model/MemberModel";
import axios from "axios";
//const API_BASE_URL = "http://localhost:5115/api";

interface ApiResponse<T> {
  data: T;
  status: number;
}

//export const createMember = async (member: MemberModel): Promise<MemberModel> => {
// export async function createMemberAsync(member: MemberModel): Promise<MemberModel> {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/Member`, member);
//     console.log(response);
//     alert(JSON.stringify(response));
//     return response.data;
//   } catch (error) {
//     console.error("Error creating member:", error);
//     throw error;
//   }
// }
export async function createMemberAsync(member: MemberModel): Promise<ApiResponse<MemberModel>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/Member`, member);
    //console.log(response);
    //alert(JSON.stringify(response));
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
}
export async function getMembersAsync(): Promise<ApiResponse<MemberModel>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/Member`);
    //console.log(response);
    //alert(JSON.stringify(response));
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
}
