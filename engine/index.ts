import {
  userSignInInputSchema,
  userSignUpInputSchema,
  validationMessages,
} from "@carpal/drivetrain";
import { type User } from "./types/database";
import "dotenv/config";
import express, { type NextFunction } from "express";
import dbConfig from "./knex/db";
import { GET, POST } from "./constants/routes";
import knex from "knex";
import bodyParser from "body-parser";
import { type ZodError } from "zod";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import { store } from "./knex/knexstore";
import cors from "cors";

const app = express();
const db = knex(dbConfig);

const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
  })
);

function isAuthenticated(req: Express.Request, res: any, next: NextFunction) {
  if (req.session.user) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      secure: process.env.NODE_ENV === "production",
    },
    store,
    resave: false,
    saveUninitialized: false,
  })
);

app.get(GET.ALL_USERS, async function (_req, res) {
  try {
    const data = await db.select("*").from("users");
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post(POST.SIGN_IN, async function (req, res) {
  try {
    const body = req.body;

    const userSignInInput = userSignInInputSchema.parse(body);

    const existingUser = await db<User>("users")
      .where({ email: userSignInInput.email })
      .first();

    if (!existingUser) {
      return res.status(400).json({
        error: validationMessages.noExistingUser(userSignInInput.email),
      });
    }

    const passwordVerifed = await argon2.verify(
      existingUser.password,
      userSignInInput.password
    );

    if (!passwordVerifed) {
      return res.status(401).json({
        error: validationMessages.incorrectPassword,
      });
    } else {
      req.session.user = {
        user_id: existingUser.id,
      };
      res.status(200).json({
        message: "User logged in successfully",
        userData: existingUser,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: (error as ZodError).issues
        ? (error as ZodError).issues.map((err) => err.message)
        : (error as Error).message,
    });
  }
});

app.post(POST.SIGN_OUT, async function (req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out" });
      }

      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({
      error: (error as ZodError).issues
        ? (error as ZodError).issues.map((err) => err.message)
        : (error as Error).message,
    });
  }
});

app.post(POST.SIGN_UP, async function (req, res) {
  try {
    const body = req.body;

    const userSignUpInput = userSignUpInputSchema.parse(body);

    const existingUser = await db<User>("users")
      .where({ email: userSignUpInput.email })
      .first();

    if (existingUser) {
      return res.status(400).json({
        error: validationMessages.emailAlreadyInUse(existingUser.email),
      });
    }

    const password = userSignUpInput.password;
    const hashedPassword = await argon2.hash(password);

    const newUser = await db<User>("users")
      .insert([
        {
          id: uuidv4(),
          name: userSignUpInput.name,
          surname: userSignUpInput.surname,
          password: hashedPassword,
          email: userSignUpInput.email,
          keep_me_signed_in: userSignUpInput.keepMeSignedIn || false,
        },
      ])
      .returning("*");

    req.session.user = {
      user_id: newUser[0].id,
    };

    res.status(200).json({
      message: "New user added",
      userData: newUser,
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: (error as ZodError).issues
        ? (error as ZodError).issues.map((err) => err.message)
        : (error as Error).message,
    });
  }
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
