import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Text } from "@carpal/ui-parts";

import useUserStore from "../store/user";
import { mainPurple } from "@carpal/ui-parts/atoms/Text/styling";
import { signIn } from "../features/users/api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserData } = useUserStore();

  async function handleSignIn() {
    try {
      const userData = await signIn(email, password);

      if (!userData) return;

      updateUserData({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
      });

      router.replace("/");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        variant="subHeadingBold"
        customStyle={{
          opacity: 0.4,
        }}
      >
        Welcome to CarPal
      </Text>
      <Text variant="mainHeadingBold" noColor>
        Sign in to your account
      </Text>
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
          <Text variant="textRegular">SIGN IN</Text>
        </Pressable>
      </View>

      <View style={styles.signUpCTAWrapper}>
        <Text variant="subHeading">Don't have an account yet?</Text>
        <Pressable
          style={styles.signUpCTA}
          onPress={() => router.push("/sign-up")}
        >
          <Text variant="textRegular">SIGN UP</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

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
