import { regexPatterns, validationMessages } from "./constants";
import { z } from "zod";

const nameSchema = z
  .string()
  .min(2, validationMessages.minLength("Name", 2))
  .max(80, validationMessages.maxLength("Name", 80));

const surnameSchema = z
  .string()
  .min(2, validationMessages.minLength("Surname", 2))
  .max(80, validationMessages.maxLength("Surname", 80));

const emailSchema = z
  .string()
  .email(validationMessages.invalidEmail("Email"))
  .min(4, validationMessages.minLength("Email", 4))
  .max(80, validationMessages.maxLength("Email", 80));

const passwordSchema = z
  .string()
  .min(8, validationMessages.minLength("Password", 8))
  .max(80, validationMessages.maxLength("Password", 80))
  .regex(regexPatterns.digit, validationMessages.digit("Password"))
  .regex(regexPatterns.specialChar, validationMessages.specialChar("Password"))
  .regex(regexPatterns.uppercase, validationMessages.uppercase("Password"));

export const userSignUpInputSchema = z.object({
  name: nameSchema,
  surname: surnameSchema,
  email: emailSchema,
  password: passwordSchema,
});
