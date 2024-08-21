import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useUserStore from "../store/user";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserData } = useUserStore();

  async function handleSignIn() {
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

      if (res.status === 200) {
        const { userData } = await res.json();
        updateUserData({
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
        });
        router.navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to CarPal</Text>
      <Text style={styles.subheading}>Sign in to your account</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={setEmail}
          placeholder="email"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="password"
          onChangeText={setPassword}
        />
        <Pressable style={styles.cta} onPress={handleSignIn}>
          <Text style={styles.ctaText}>SIGN IN</Text>
        </Pressable>
      </View>

      <View style={styles.signUpCTAWrapper}>
        <Text>Don't have an account yet?</Text>
        <Pressable style={styles.signUpCTA} onPress={handleSignIn}>
          <Link href="/sign-up">
            <Text style={styles.signUpCTAText}>SIGN UP</Text>
          </Link>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export const lightYellow = "#FEFBD8";
export const mainPeach = "#EECEB9";
export const lightPurple = "#BB9AB1";
export const mainPurple = "#987D9A";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    opacity: 0.5,
    color: mainPurple,
  },
  subheading: {
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 36,
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    borderColor: mainPurple,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cta: {
    width: "100%",
    backgroundColor: mainPurple,
    padding: 16,
    borderRadius: 8,
  },
  ctaText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "600",
    letterSpacing: 1,
  },
  signUpCTAWrapper: {
    width: "100%",
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  signUpCTA: {
    borderWidth: 1,
    width: "100%",
    padding: 12,
    borderRadius: 8,
  },
  signUpCTAText: {
    textAlign: "center",
    fontWeight: "600",
  },
});
