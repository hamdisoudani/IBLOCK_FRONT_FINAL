import * as Yup from "yup";

export const addSchoolRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,}$/,
        "Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    fullname: Yup.string()
      .min(4, "This field is required and can't be empty")
      .max(30, "This field can't have more than 30 characters")
      .required("Full name is required"),

      schoolName: Yup.string()
      .min(4, "This field is required and can't be empty")
      .max(50, "This field can't have more than 30 characters")
      .required("School name is required"),
  });