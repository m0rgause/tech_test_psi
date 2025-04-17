import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieParser from "cookie-parser";
import prisma from "./utils/prisma";
import {
  generateUniqueUsername,
  setJWTCookie,
  authenticateJWT,
} from "./utils/auth";
import { User } from "@prisma/client";

const app = express();
app.use(cookieParser());

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await prisma.user.upsert({
          where: { email: profile.emails![0].value },
          update: {},
          create: {
            id: require("uuid").v4(),
            username: await generateUniqueUsername(profile.displayName),
            email: profile.emails![0].value,
            oauthProvider: "google",
          },
        });
        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    }
  )
);

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    setJWTCookie(res, req.user as User);
    res.redirect("/profile");
  }
);

app.get("/profile", authenticateJWT);

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});

export default app;
