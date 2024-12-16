import { Redirect, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useUserStore from "../../store/user";

export default function TabLayout() {
  const userStore = useUserStore();

  if (!userStore.email) return <Redirect href="/sign-in" />;

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "purple" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Homepage",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-route"
        options={{
          title: "Add route",
          tabBarIcon: ({ color }) => (<FontAwesome size={24} name="plus" color={color} />)
        }}
      />
    </Tabs>
  );
}
