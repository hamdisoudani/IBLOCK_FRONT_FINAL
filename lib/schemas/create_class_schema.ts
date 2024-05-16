import * as Yup from "yup";

export const createClassRequestSchema = Yup.object().shape({
    className: Yup.string()
    .min(4, "This field is required and can't be empty")
    .max(30, "This field can't have more than 30 characters")
    .required("The class name is required")
  });