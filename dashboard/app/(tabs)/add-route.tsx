import { Text } from "@carpal/ui-parts";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { fetchPlace } from "../../features/add-route/api";

interface FormValues {
  fromDestination: string;
  toDestination: string;
}

export default function AddRoute() {
  const { control, watch } = useForm<FormValues>();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const fromDestination = watch("fromDestination");

  useEffect(() => {
    fetchPlace(fromDestination);
  }, [fromDestination]);

  function handleSelectedDays(num: number) {
    if (selectedDays.includes(num)) {
      setSelectedDays((prevValue) =>
        [...prevValue].filter((day) => day !== num)
      );
    } else {
      setSelectedDays((prevValue) => [...prevValue, num]);
    }
  }

  return (
    <View style={styles.FormWrapper}>
      <Text variant="textRegularBold">Add your typical from destination</Text>
      <Controller
        name="fromDestination"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="From destination"
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.TextInput}
            value={value}
          />
        )}
      />
      <Text variant="textRegularBold">Add your typical to destination</Text>
      <Controller
        name="toDestination"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="To destination"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.TextInput}
          />
        )}
      />
      <Button title="Mondays" onPress={() => handleSelectedDays(1)} />
      <Button title="Tuesdays" onPress={() => handleSelectedDays(2)} />
      <Button title="Wednesdays" onPress={() => handleSelectedDays(3)} />
      <Button title="Thursdays" onPress={() => handleSelectedDays(4)} />
      <Button title="Fridays" onPress={() => handleSelectedDays(5)} />
      <Button title="Saturdays" onPress={() => handleSelectedDays(6)} />
      <Button title="Sundays" onPress={() => handleSelectedDays(7)} />
    </View>
  );
}

const styles = StyleSheet.create({
  FormWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  TextInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 8,
    marginTop: -8,
  },
});
