import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorsAsUpdate } from "../hooks/index.js";
import { patterns } from "../helpers/index.js";
import Joi from 'joi';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Define user name"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: patterns.email,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      match: patterns.password,
    },
    token: {
      type: String,
      default: "",
    },
    favoriteCars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidatorsAsUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const User = model("users", userSchema);

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(patterns.email).required().messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().pattern(patterns.password).required().messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.pattern.base': 'The password must be in format Password123',
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required().messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().pattern(patterns.password).required().messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.pattern.base': 'The password must be in format Password123',
  })
});

