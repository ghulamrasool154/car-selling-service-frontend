import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(94, "Password cannot exceed 94 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must include at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});

export const vehicleValidation = yup.object().shape({
  carModel: yup
    .string()
    .min(3, "Model must be at least 3 characters")
    .required("Car Model is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  phone: yup
    .string()
    .length(11, "Phone number must be 11 digits")
    .required("Phone number is required"),
  maxPictures: yup
    .number()
    .min(1, "Minimum 1 picture")
    .max(10, "Maximum 10 pictures")
    .required("Max pictures is required"),
  city: yup
    .string()
    .oneOf(["Lahore", "Islamabad", "Faisalabad", "Karachi"], "Invalid city")
    .required("City is required"),
  pictures: yup
    .array()
    .of(yup.mixed())
    .max(yup.ref("maxPictures"), "Too many files"),
});
