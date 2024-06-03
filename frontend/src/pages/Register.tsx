import * as apiClient from "../api-client";
import { useMutation} from "react-query";
import { useAppContext } from "../contexts/AppContext";
import BioData from "@/forms/manage bio-data/BioData";

const Register = () => {
  
  const { showToast } = useAppContext();
  const{mutate, isLoading} = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({message:"Data Submitted!", type: "SUCCESS"});
    },

    onError: ()=> {
      showToast({message: "Error", type:"ERROR"});
    }
  });

  const handleSave = (BiodataFormData:FormData) => {
    mutate(BiodataFormData)
  }

  return (
    <BioData onSave={handleSave} isLoading={isLoading}/>
  );
};

export default Register;
