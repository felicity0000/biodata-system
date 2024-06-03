import { useFormContext } from "react-hook-form";
import { BiodataFormData } from "./BioData";

const ImagesSection = () => {
    const {register, formState:{errors}} = useFormContext<BiodataFormData>();
  return (
    <div>  <label className="font-poppins text-gray-700 text-sm font-bold flex-1">
    Passport photo
    <input type="file" accept="images/*" className="border mx-4 "
      {...register("imageFiles", {
        validate: (imageFiles) => {
          const totalLength = imageFiles.length;

          if (totalLength === 0) {
            return "At least one image should be added";
          }

          if (totalLength > 2) {
            return "Total number of images cannot be more than 2";
          }

          return true;
        },
      })}
    />
    {errors.imageFiles && (
      <span className="text-red-500">{errors.imageFiles.message}</span>
    )}
  </label></div>
  )
}

export default ImagesSection;