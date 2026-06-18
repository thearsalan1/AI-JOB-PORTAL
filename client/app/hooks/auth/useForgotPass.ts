import { forgotPassword } from "@/app/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useForgotPass = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export default useForgotPass;
