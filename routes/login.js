import express from "express";
const router = express.Router();
import session from "express-session";
import bcrypt from "bcryptjs";
import passport, { use } from "passport";
import LocalStrategy from "passport-local";

import * as userController from "../controllers/userController";
import User from "../models/user";

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.urlencoded({ extended: false }));

router.get("/", userController.user_login_get);

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
