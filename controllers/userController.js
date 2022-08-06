import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import "dotenv/config";

import User from "../models/user";

export function user_create_get(req, res) {
  res.render("sign_form", { title: "Sign Up", signUp: true });
}

export const user_create_post = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Password must be shorter than 8 characters"),
  body("confirm_password").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign_form", {
        title: "Sign Up",
        errors: errors.array(),
        user: req.body,
        signUp: true,
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        user.save((err) => {
          if (err) {
            return next(err);
          }
          res.send("SUCCEED");
        });
      });
    }
  },
];

export function user_member_get(req, res) {
  res.render("member_form", { title: "Become Member!" });
}

export const user_member_post = [
  body("member_password").custom((value) => {
    if (value != process.env.MEMBER_PASSWORD) {
      throw new Error("Password is incorrect");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("member_form", {
        title: "Become Member!",
        errors: errors.array(),
      });
    } else {
      console.log(req.user);
      User.updateOne(
        { _id: req.user._id },
        { $set: { membership: true } },
        (err) => {
          if (err) {
            next(err);
          }
          res.redirect("/");
        }
      );
    }
  },
];

export function user_login_get(req, res) {
  res.render("sign_form", { title: "Login" });
}
