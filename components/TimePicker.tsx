import Colors from "@/constants/Colors";
import { AndroidMode } from "@/interfaces/pickerDateTimerAndroidMode";
import { Ionicons } from "@expo/vector-icons";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  date: Date | undefined;
}

export const TimePicker = ({ setDate, date }: Props) => {
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setDate(selectedDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimerPicker = () => {
    showMode("time");
  };

  return (
    <View
      style={{
        flex: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#808080",
        height: 55,
      }}
    >
      <Text>{date && date.toLocaleTimeString()}</Text>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(193, 218, 219, 0.5)",
          padding: 3,
          borderRadius: 5,
        }}
        onPress={() => showTimerPicker()}
      >
        <Ionicons
          name="chevron-down-outline"
          size={15}
          color={Colors.darkPrimaryColor}
        />
      </TouchableOpacity>
    </View>
  );
};
