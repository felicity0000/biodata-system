import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import ImagesSection from "./ImagesSection";
import { Button } from "@/components/ui/button";
export type BiodataFormData = {
  firstName: string;
  lastName: string;
  DOB: Date;
  religion: string;
  email: string;
  age: number;
  telephone: string;
  nationality: string;
  occupation: string;
  gender: "Male" | "Female";
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  onSave: (BiodataFormData: FormData) => void;
  isLoading: boolean;
};
const BioData = ({ onSave, isLoading}: Props) => {
  const formMethods = useForm<BiodataFormData>();
  const { handleSubmit} = formMethods;



  const onSubmit = handleSubmit((formDataJSON: BiodataFormData) => {
    //create new FormData object and call our API
    //console.log(formDataJSON);
    const formData = new FormData();
    formData.append("firstName", formDataJSON.firstName);
    formData.append("lastName", formDataJSON.lastName);
    formData.append("DOB", formDataJSON.DOB.toString());
    formData.append("religion", formDataJSON.religion);
    formData.append("email", formDataJSON.email);
    formData.append("age", formDataJSON.age.toString());
    formData.append("telephone", formDataJSON.telephone);
    formData.append("nationality", formDataJSON.nationality);
    formData.append("occupation", formDataJSON.occupation);
    formData.append("gender", formDataJSON.gender);
    Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div>
          <DetailsSection />
          <div className="py-4">
            <ImagesSection />
          </div>
          <span className="py-4 flex justify-end">
            <Button
              disabled={isLoading}
              type="submit"
              className="disabled:bg-gray-500"
            >
              {isLoading ? "saving..." : "save"}
            </Button>
          </span>
        </div>
      </form>
    </FormProvider>
  );
};

export default BioData;
