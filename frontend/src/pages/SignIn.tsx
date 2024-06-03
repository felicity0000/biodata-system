import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type SignInFormData = {
  userName: string;
  password: string;
};
const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      console.log("user has been signed in");
      // 1.show the toast
      showToast({ message: "Sign in Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      // 2.navigate to the home page
      navigate("/people");
    },
    onError: (error: Error) => {
      //show the toast
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <label className="text-gray-700 text-sm font-bold flex-1">
        User name
        <input
          type="userName"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("userName", { required: "This field is required" })}
        />
        {errors.userName && (
          <span className="text-red-500">{errors.userName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <Button>
        Login
      </Button>
    </form>
  );
};

export default SignIn;
