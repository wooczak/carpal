import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Stack, Tabs } from "expo-router";
import useUserStore from "../../store/user";
import { View } from "react-native";

export default function TabLayout() {
  const userStore = useUserStore();

  if (!userStore.email) return <Redirect href="/sign-in" />;

  return <Stack />;
}
