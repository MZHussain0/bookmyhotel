import { RegisterFormData } from "@/components/RegisterationForm";
import axios from "axios";
import { LoginFormData } from "./components/SignInForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Registeration API
export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      formData,
      {
        withCredentials: true,
      }
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

// Registeration API
export const login = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      formData,
      {
        withCredentials: true,
      }
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

// ValidateToken API
export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/validate-token`,
      {
        withCredentials: true,
      }
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

// Logout API
export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "An unknown error occurred";
        throw new Error(message);
      } else {
        // Log the error or handle as needed
        console.error("Non-Axios error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
};
