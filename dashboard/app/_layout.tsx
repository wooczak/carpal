import { Slot, Stack } from "expo-router";

export default function Index() {
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
