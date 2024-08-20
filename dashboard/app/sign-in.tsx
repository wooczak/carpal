import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        router.navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>SignIn</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="email"
      />
      <TextInput placeholder="password" onChangeText={setPassword} />
      <Button title="Sign in" onPress={handleSignIn} />
      <Link href="/sign-up">Sign up</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
