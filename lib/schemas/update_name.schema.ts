import * as Yup from "yup";

export const normalUserUpdateName = Yup.object().shape({
    name: Yup.string()
    .min(4, "This field is required and can't be empty")
    .max(30, "This field can't have more than 30 characters")
    .required("The project name is required"),
    childProjectDescription: Yup.string(),
    password: Yup.string()
    .min(8, "The password must have at least 8 characters")
    .required("The password is required"),
});