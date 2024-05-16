import * as Yup from "yup";

export const updateProjectGeneralInformation = Yup.object().shape({
    projectName: Yup.string()
    .min(4, "This field is required and can't be empty")
    .max(30, "This field can't have more than 30 characters")
    .required("The project name is required"),
    projectDescription: Yup.string()
    .min(4, "This field is required and can't be empty")
    .max(100, "This field can't have more than 100 characters")
    .optional(),
  });