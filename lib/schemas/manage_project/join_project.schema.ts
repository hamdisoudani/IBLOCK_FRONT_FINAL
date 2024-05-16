import * as Yup from "yup";

export const joinProjectShema = Yup.object().shape({
    invitationCode: Yup.string()
    .min(8, "This field is required and can't be empty or have less than 8 characters")
    .max(8, "This field can't have more than 8 characters")
    .required("The invitation code is required")
});