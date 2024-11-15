import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export default function AddRoute() {
  const { control } = useForm({
    defaultValues: {
      fromDestination: "",
      toDestination: ""
    },
  });

  return (
    <View>
      <Controller
        name="fromDestination"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="From destination"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="toDestination"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="To destination"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
    </View>
  );
}
