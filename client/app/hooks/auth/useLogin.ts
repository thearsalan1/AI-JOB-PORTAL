import { loginUser } from "@/app/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;
