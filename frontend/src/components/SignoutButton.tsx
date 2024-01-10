import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import * as apiClient from "../api-client";
import { Button } from "./ui/button";

const SignoutButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("You are now logged out!");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <Button
      className="bg-theme-800 hover:bg-theme-700 text-white font-semibold text-base"
      onClick={handleClick}>
      Logout
    </Button>
  );
};

export default SignoutButton;
