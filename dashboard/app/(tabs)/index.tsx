import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Region } from "react-native-maps";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { lightPurple } from "@carpal/ui-parts/atoms/Text/styling";
import useCurrentUser from "../../features/users/hooks/useCurrentUser";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const {
    handleSignOut,
    user: { name },
  } = useCurrentUser();

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
      <Text style={styles.welcomeTitle}>Welcome back, {name}</Text>
      <View style={styles.addNewContainer}>
        <FontAwesome6 name="add" size={24} color="black" />
        <Text>Add your typical route</Text>
      </View>
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
    color: lightPurple,
  },
  addNewContainer: {
    display: "flex",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
