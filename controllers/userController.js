import { body, validationResult } from "express-validator";

import User from "../models/user";

export function user_create_get(req, res) {
  res.render("sign_up_form", { title: "Sign Up" });
}

export const user_create_post = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Password must be longer than 8 characters"),
  body("confirm_password").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign_up_form", {
        title: "Sign Up",
        errors: errors.array(),
        user: req.body,
      });
    } else {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.send("SUCCEED");
      });
    }
  },
];
