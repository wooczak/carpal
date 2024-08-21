import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Region } from "react-native-maps";
import { lightPurple } from "./sign-in";
import useUserStore from "../store/user";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const { name, resetUserData } = useUserStore();

  async function handleSignOut() {
    try {
      const signOutRes = await fetch("http://localhost:8080/sign-out", {
        method: "POST",
      });

      if (signOutRes.status === 200) {
        resetUserData();
        router.navigate("sign-in");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Welcome, {name}</Text>
      <MapView
        style={{
          width: "100%",
          height: 150,
          borderRadius: 16,
        }}
        showsUserLocation
        showsBuildings={false}
        zoomEnabled={false}
        pitchEnabled={false}
        showsPointsOfInterest={false}
        showsScale={false}
        provider={undefined}
        cameraZoomRange={{
          maxCenterCoordinateDistance: 2000,
        }}
        region={location?.coords as unknown as Region}
      />
      <Button title="Sign out" onPress={handleSignOut} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: lightPurple
  },
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
