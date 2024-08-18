import "dotenv/config";
import express from "express";
import dbConfig from "./knex/db";
import { GET, POST } from "./constants/routes";
import knex from "knex";
import bodyParser from "body-parser";
import { ZodError } from "zod";
import { userSignUpInputSchema } from "./validation/schema";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { validationMessages } from "./validation/constants";

const app = express();
const db = knex(dbConfig);

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(GET.ALL_USERS, async function (_req, res) {
  try {
    const data = await db.select("*").from("users");
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post(POST.SIGN_UP, async function (req, res) {
  try {
    const body = req.body;

    // Validate the password - if incorrect, error is caught and the logic below breaks
    const userSignUpInput = userSignUpInputSchema.parse(body);

    const existingUser = await db<typeof userSignUpInput>("users")
      .where({ email: userSignUpInput.email })
      .first();

    if (existingUser) {
      return res.status(400).json({
        error: validationMessages.emailAlreadyInUse(existingUser.email),
      });
    }

    const password = userSignUpInput.password;
    const hashedPassword = await argon2.hash(password);

    const newUser = await db
      .table("users")
      .insert([
        {
          id: uuidv4(),
          name: userSignUpInput.name,
          surname: userSignUpInput.surname,
          password: hashedPassword,
          email: userSignUpInput.email,
        },
      ])
      .returning("*");

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
