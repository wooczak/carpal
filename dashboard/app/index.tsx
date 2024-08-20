import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [authState, setAuthState] = useState("pending...");

  async function handleSignOut() {
    try {
      const signOutRes = await fetch("http://localhost:8080/sign-out", {
        method: "POST",
      });

      if (signOutRes.status === 200) {
        router.navigate("sign-in");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function getAuth() {
    try {
      const rootRes = await fetch("http://localhost:8080/", {
        credentials: "include",
      });

      if (rootRes.status === 401) {
        router.replace("/sign-in");
      } else {
        setAuthState("user logged in");
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{authState}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
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
