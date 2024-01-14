import * as apiClient from "@/api-client";
import ManageHotelForm from "@/components/ManageHotelForm/ManageHotelForm";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const EditHotel = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { data: hotelData } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { mutate } = useMutation(apiClient.updateHotel, {
    onSuccess: () => {
      toast.success("Hotel updated successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  if (!hotelData) return <span>No hotel found</span>;

  return (
    <div className="bg-slate-900 px-4 py-4 rounded-lg shadow-inner shadow-theme-200 max-w-4xl mx-auto">
      <ManageHotelForm
        hotel={hotelData}
        hotelId={hotelId}
        onSave={handleSave}
      />
    </div>
  );
};
