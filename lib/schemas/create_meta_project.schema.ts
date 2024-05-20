import * as Yup from "yup";

export const createMetaProjectSchema = Yup.object().shape({
    metaProjectName: Yup.string()
    .min(4, "The meta project name is required and can't be empty")
    .max(30, "The meta project name can't have more than 30 characters")
    .required("The meta project name is required"),
    metaProjectDescription: Yup.string()
    .min(4, "The meta project description must have at least 4 characters")
    .max(30, "The meta project description can't have more than 200 characters")
    .nullable(),
    collaborative: Yup.boolean().nullable().default(false),    
  });