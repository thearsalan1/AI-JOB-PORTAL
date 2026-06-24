import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

const useSaveJobs = useQuery({
  queryKey:["Saved"],
  queryFn:()=>{
    
  }
})