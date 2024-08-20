import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Link href="/sign-in">Go back to sign in</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontSize: 24,
  },
});
