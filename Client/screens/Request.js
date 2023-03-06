import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { addRequest } from "../redux/actions";
import Toast from "react-native-toast-message";

const Request = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { jobOffer, user, currentUser } = route.params;

  const [formData, setFormData] = useState({
    date: "",
    hired_user_id: user.id,
    categoryId: jobOffer.categoryId,
    jobOfferId: jobOffer.id,
    userId: currentUser.data.id
  });

  const [valid, setValid] = useState({
    date: false
  });

  const [errors, setErrors] = useState({});

  //--------------------FECHA----------------------------------------------------

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    const dt = new Date(date);
    const x = dt.toLocaleDateString();
    const x1 = x.split("/");
    const result = x1[0] + "/" + x1[1] + "/" + x1[2];
    setFormData({
      ...formData,
      date: result
    });
    setValid({
      ...valid,
      date: true
    });
    hideDatePicker();
  };

  //--------------------------------------------------------------------------------

  const handleChange = name => {
    if (name) {
      return val => {
        setFormData({ ...formData, [name]: val });
        setValid({ ...valid, [name]: true });
      };
    } else setValid({ ...valid, [name]: false });
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleValidation = async () => {
    Keyboard.dismiss();

    if (!formData.date) {
      handleError("Por favor, introduzca una fecha", "date");
      setValid({
        ...valid,
        date: false
      });
    }

    if (valid.date) {
      try {
        const response = await dispatch(addRequest(formData));

        if (response) {
          Alert.alert(
            "Contratación existosa",
            "Puedes ver a quien contrataste haciendo click en servicios contratados",
            [{ text: "OK" }]
          );
          navigation.navigate("Home");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Algo ha salido mal. Por favor inténtelo nuevamente"
        });
      }
    }
  };

  return (
    <ScrollView>
      <View>
        <View className="z-10">
          <Toast />
        </View>
        <View className="p-5">
          <View className="">
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Fecha en la quiera contratar el servicio
              </Text>
              <TouchableOpacity
                style={{ color: colors.text, borderColor: colors.text }}
                className="flex justify-center items-center border rounded-lg py-3"
                onPress={() => showDatePicker()}
              >
                <Text style={{ color: colors.text }}>{formData.date}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              {!valid.date && <Text className="text-xs color-[#ff0000]">{errors.date}</Text>}
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleValidation}>
          <View className="flex justify-center items-center bg-violet-700 py-2 ml-5 mr-5 mb-6 rounded-lg">
            <Text className="text-lg text-white">Contratar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Request;
