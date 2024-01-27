import { RegisterFormData } from "@/components/RegisterationForm";
import axios from "axios";
import {
  HotelSearchResponseType,
  HotelType,
} from "../../backend/src/shared/types";
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

// Login API
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

// POST  HotelData API
export const addHotel = async (hotelFormData: FormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/my-hotels`,
      hotelFormData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
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
};

// GET  HotelData API
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, {
      withCredentials: true,
    });
    if (!response.data) {
      throw new Error("Error fetching hotels");
    }
    return response.data;
  } catch (error) {
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
};

// GET Fetch HotelData by ID API
export const fetchMyHotelById = async (id: string): Promise<HotelType> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels/${id}`, {
      withCredentials: true,
    });
    if (!response.data) {
      throw new Error("Error fetching hotel");
    }
    return response.data;
  } catch (error) {
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
};

// PUT Update HotelData API
export const updateHotel = async (
  hotelFormData: FormData
): Promise<HotelType> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
      hotelFormData,
      {
        withCredentials: true,
      }
    );
    if (!response.data) {
      throw new Error("Error updating hotel");
    }
    return response.data;
  } catch (error) {
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
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};

// GET Search Hotels API
export const searchListings = async (
  params: SearchParams
): Promise<HotelSearchResponseType> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", params.destination || "");
  queryParams.append("checkIn", params.checkIn || "");
  queryParams.append("checkOut", params.checkOut || "");
  queryParams.append("adultCount", params.adultCount || "");
  queryParams.append("childCount", params.childCount || "");
  queryParams.append("page", params.page || "");
  queryParams.append("maxPrice", params.maxPrice || "");
  queryParams.append("sortOptions", params.sortOptions || "");

  params.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  params.types?.forEach((type) => queryParams.append("types", type));
  params.stars?.forEach((star) => queryParams.append("stars", star));
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/hotels/search?${queryParams.toString()}`,
      {
        params,
        withCredentials: true,
      }
    );
    if (!response.data) {
      throw new Error("Error searching hotels");
    }
    return response.data;
  } catch (error) {
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
};

// GET Fetch HotelData by ID API
export const fetchHotelById = async (id: string): Promise<HotelType> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/hotels/${id}`, {
      withCredentials: true,
    });
    if (!response.data) {
      throw new Error("Error fetching hotel");
    }
    return response.data;
  } catch (error) {
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
};
