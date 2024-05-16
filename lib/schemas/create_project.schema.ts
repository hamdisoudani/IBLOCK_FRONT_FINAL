import * as Yup from "yup";

export const createProjectSchema = Yup.object().shape({
    projectName: Yup.string()
    .min(4, "This field is required and can't be empty")
    .max(30, "This field can't have more than 30 characters")
    .required("The project name is required"),
    projectDescription: Yup.string()
    .min(4, "This field must have at least 4 characters")
    .max(30, "This field can't have more than 200 characters")
    .nullable()
  });