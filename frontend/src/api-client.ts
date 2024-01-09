import { RegisterFormData } from "@/components/RegisterationForm";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      formData
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
