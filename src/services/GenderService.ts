import axios from "axios";
import { API_BASE_URL } from "../APIConfig";
import GenderModel from "../model/GenderModel";

export async function getGendersAsync(): Promise<GenderModel[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/gender`);
        return response.data;
    } catch (error) {
        console.error("Error creating member:", error);
        throw error;
    }
    }
    