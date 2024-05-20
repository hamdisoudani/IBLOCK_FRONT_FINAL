import * as Yup from "yup";

export const teacherCreateNewCollaborativeMetaProjectCodeSchema = Yup.object().shape({
    childProjectName: Yup.string()
    .min(4, "This field is required and can't be empty")
    .max(30, "This field can't have more than 30 characters")
    .required("The project name is required"),
    childProjectDescription: Yup.string()
    .min(3, "This field must have at least 3 characters")
    .max(200, "This field can't have more than 200 characters")
    .required("The project description is required"),
});