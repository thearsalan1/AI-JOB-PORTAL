import { resetPassword } from "@/app/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useResetPass = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

export default useResetPass;
