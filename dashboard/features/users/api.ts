import { types } from "@carpal/drivetrain";

type UserData = Omit<types.User, "id" | "keep_me_signed_in" | "password">;

export async function signIn(
  email: string,
  password: string
): Promise<UserData | undefined> {
  try {
    const res = await fetch("http://localhost:8080/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        keepMeSignedIn: true,
      }),
      credentials: "include",
    });

    const { userData } = await res.json();

    return userData as UserData;
  } catch (error) {
    console.error(error as string);
  }
}

export async function signOut(): Promise<Response> {
  try {
    const signOutRes = await fetch("http://localhost:8080/sign-out", {
      method: "POST",
    });

    return signOutRes;
  } catch (error) {
    throw new Error(error as string);
  }
}
