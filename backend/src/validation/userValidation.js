const Joi = require('joi');

const registrationValidation = Joi.object({
  fullname: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  // fullname: Joi.string().min(6).required(),
  // email: Joi.string().required().email(),
  // // password: Joi.string().required(),
  // // confirmpassword: Joi.string().required(),
  // password: Joi.string()
  //   .min(8)
  //   .max(40)
  //   .pattern(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]).{8,40}$/
  //   )
  //   .message(
  //     '"{#label}" must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 symbol, and be 8-40 characters.'
  //   )
  //   .required(),
  // confirmpassword: Joi
  //   .ref('password'),
});

const loginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string()
    .min(8)
    .max(40)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]).{8,40}$/
    )
    .message(
      '"{#label}" must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 symbol, and be 8-40 characters.'
    )
    .required(),
});

const updateUserValidation = Joi.object({
  fullname: Joi.string().min(6).required(),
  email: Joi.string().required().email(),
});

module.exports = { registrationValidation, loginValidation, updateUserValidation };
