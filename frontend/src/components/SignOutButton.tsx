import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from '../api-client'
import { Button } from "./ui/button";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            //things will happen right away
            await queryClient.invalidateQueries("validateToken");
            // showToast
            showToast({message: "Signed out", type: "SUCCESS"})
        },  

        onError: (error:Error) => {
            //showToast
            showToast({message:error.message, type:"ERROR"});
        }
    })
    const handleClick = () => {
        mutation.mutate();
    }
  return (
    <Button onClick={handleClick}>Sign out</Button>
  )
}

export default SignOutButton