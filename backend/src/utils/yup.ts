import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email().trim().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain a special character")
    .required("Password is required"),
});

export const loginSchema = yup.object({
  email: yup.string().email().trim().required(),
  password: yup.string().required(),
});
