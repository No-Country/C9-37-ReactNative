import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link, useTheme } from "@react-navigation/native";

const COLORS = {
  white: "#fff",
  black: "#1A1A1A",
  blue: "#5D5FEE",
  grey: "#BABBC3",
  light: "#d8d8d8",
  darkBlue: "#7978B5",
  red: "#ff0000"
};
const InputField = ({ label, error, password, placeholder, onFocus = () => {}, ...props }) => {
  const {dark} = useTheme()

  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  // hay que implementar un contexto para tomar el modo actual del dispositivo de momento uso dark de usetheme

  return (
    <View className="mb-3">
      <Text
        className="text-sm font-bold mb-1"
        style={{
          color: dark? COLORS.grey : COLORS.black
        }}
      >
        {label}
      </Text>
      <View
        className="w-full rounded-md overflow-hidden"
        style={[
          style.inputContainer,
          {
            borderColor: error ? COLORS.red : isFocused ? COLORS.black : COLORS.light,
            alignItems: "center",
          }
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          className={"flex w-full justify-center py-2 px-3 h-full rounded-md "+(dark? "color-[#BABBC3]" : "color-[#7978B5]")}
          placeholder={placeholder}
          placeholderTextColor="grey"
          {...props}
        />
      </View>

      {error && <Text className="my-1 text-xs color-[#ff0000]">{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderWidth: 0.5,
  }
});

export default InputField;
