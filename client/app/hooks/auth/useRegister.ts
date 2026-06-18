import { registerUser } from "@/app/services/auth.service";
import { useMutation } from "@tanstack/react-query"

const useRegister = ()=>{
  return useMutation({
    mutationFn:registerUser,
  })
}

export default useRegister;