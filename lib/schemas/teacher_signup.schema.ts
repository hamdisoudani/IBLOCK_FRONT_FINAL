import * as Yup from "yup";

export const teacherRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    fullname: Yup.string()
      .min(4, "This field is required and can't be empty")
      .max(30, "This field can't have more than 30 characters")
      .required("Full name is required")
  });