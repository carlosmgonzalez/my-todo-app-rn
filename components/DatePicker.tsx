import Colors from "@/constants/Colors";
import { AndroidMode } from "@/interfaces/pickerDateTimerAndroidMode";
import { formatDate } from "@/utils/formatDate";
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

export const DatePicker = ({ setDate, date }: Props) => {
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

  const showDatePicker = () => {
    showMode("date");
  };

  return (
    <View
      style={{
        flex: 60,
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
      <Text>{date && formatDate(date)}</Text>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(193, 218, 219, 0.5)",
          padding: 3,
          borderRadius: 5,
        }}
        onPress={() => showDatePicker()}
      >
        <Ionicons
          name="calendar-number-outline"
          size={23}
          color={Colors.darkPrimaryColor}
        />
      </TouchableOpacity>
    </View>
  );
};
