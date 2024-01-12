import * as apiClient from "@/api-client";
import ManageHotelForm from "@/components/ManageHotelForm/ManageHotelForm";
import { useMutation } from "react-query";
import { toast } from "sonner";

const AddHotelPage = () => {
  const { mutate } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      toast.success("Hotel added successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFormData = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <div className="bg-slate-900 px-4 py-4 rounded-lg shadow-inner shadow-theme-200 max-w-4xl mx-auto">
      <ManageHotelForm onSave={handleFormData} />
    </div>
  );
};

export default AddHotelPage;
