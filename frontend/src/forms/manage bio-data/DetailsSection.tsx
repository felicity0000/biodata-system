import { useFormContext } from "react-hook-form";
import { BiodataFormData } from "./BioData";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BiodataFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold"></h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
          Date of Birth
          <input
            type="date"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("DOB", { required: "This field is required" })}
          />
          {errors.DOB && (
            <span className="text-red-500">{errors.DOB.message}</span>
          )}
        </label>
        <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
          Age
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("age", { required: "This field is required" })}
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </label>
      </div>
      <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
        Religion
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("religion", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
        Telephone
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("telephone", { required: "This field is required" })}
        />
        {errors.telephone && (
          <span className="text-red-500">{errors.telephone.message}</span>
        )}
      </label>
      <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
        Nationality
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("nationality", { required: "This field is required" })}
        />
        {errors.nationality && (
          <span className="text-red-500">{errors.nationality.message}</span>
        )}
      </label>
      <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
        Occupation
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("occupation", { required: "This field is required" })}
        />
        {errors.occupation && (
          <span className="text-red-500">{errors.occupation.message}</span>
        )}
      </label>

      <label className="font-poppins text-gray-700 text-sm font-bold flex-1 ">
        Gender
        <select
          {...register("gender", { required: "This field is required" })}
          className="border px-4 py-1 mx-4"
        >
          <option>Male</option>
          <option>Female</option>
        </select>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
