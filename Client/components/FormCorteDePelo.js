import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

const FormCorteDePelo = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: "",
    startDate: "",
    horarioSessions: "",
    cantSessions: 0,
    infoAditional: "",
    question: ""
  });

  const [valid, setValid] = useState({
    serviceType: false,
    startDate: false,
    horarioSessions: false,
    cantSessions: false,
    infoAditional: false,
    question: false
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
    const result = x1[1] + "/" + x1[0] + "/" + x1[2];
    setFormData({
      ...formData,
      startDate: result
    });
    setValid({
      ...valid,
      startDate: true
    });
    hideDatePicker();
  };

  //--------------------HORARIO----------------------------------------------------

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    const dt = new Date(time);
    const x = dt.toLocaleTimeString();
    const arr = x[0] + x[1] + x[2] + x[3] + x[4];
    setFormData({
      ...formData,
      horarioSessions: arr
    });
    setValid({
      ...valid,
      horarioSessions: true
    });
    hideTimePicker();
  };

  //----------------------------------------------------------------------------

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

    if (!formData.serviceType) {
      handleError("Por favor, seleccione un tipo de servicio", "serviceType");
      setValid({
        ...valid,
        serviceType: false
      });
    }
    if (!formData.startDate) {
      handleError("Por favor, introduzca una fecha de incio", "startDate");
      setValid({
        ...valid,
        startDate: false
      });
    }
    if (!formData.horarioSessions) {
      handleError("Por favor, introduzca un horario", "horarioSessions");
      setValid({
        ...valid,
        horarioSessions: false
      });
    }
    if (!formData.cantSessions) {
      handleError("Por favor, introduzca una cantidad", "cantSessions");
      setValid({
        ...valid,
        cantSessions: false
      });
    }
    if (!formData.infoAditional) {
      handleError("Por favor, introduzca informacion adicional", "infoAditional");
      setValid({
        ...valid,
        infoAditional: false
      });
    }
    if (!formData.question) {
      handleError("Por favor, seleccione una opcion", "question");
      setValid({
        ...valid,
        question: false
      });
    }

    if (
      valid.serviceType &&
      valid.startDate &&
      valid.horarioSessions &&
      valid.cantSessions &&
      valid.infoAditional &&
      valid.question
    ) {
      setTimeout(() => {
        alert(JSON.stringify(formData, null, 2));
      }, 100);
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <View>
        <View className="p-5">
          <View className="">
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Tipo de servicio
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <RNPickerSelect
                  placeholder={{ label: "Seleccionar servicio", value: null }}
                  style={{
                    placeholder: {
                      color: "black"
                    },
                    color: colors.text,
                    borderColor: colors.text
                  }}
                  onValueChange={handleChange("serviceType")}
                  items={[
                    { label: "Basico", value: "Basico", color: colors.text },
                    { label: "Full", value: "Full", color: colors.text },
                    { label: "Afeitado", value: "Afeitado", color: colors.text }
                  ]}
                />
              </View>
              {!valid.serviceType && (
                <Text className="text-xs color-[#ff0000]">{errors.serviceType}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Fecha de inicio
              </Text>
              <TouchableOpacity
                style={{ color: colors.text, borderColor: colors.text }}
                className="flex justify-center items-center border rounded-lg py-3"
                onPress={() => showDatePicker()}
              >
                <Text style={{ color: colors.text }}>{formData.startDate}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              {!valid.startDate && (
                <Text className="text-xs color-[#ff0000]">{errors.startDate}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Horario de sesiones
              </Text>
              <TouchableOpacity
                style={{ color: colors.text, borderColor: colors.text }}
                className="flex justify-center items-center border rounded-lg py-3"
                onPress={() => showTimePicker()}
              >
                <Text style={{ color: colors.text }}>{formData.horarioSessions}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
              {!valid.horarioSessions && (
                <Text className="text-xs color-[#ff0000]">{errors.horarioSessions}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Cantidad de sesiones
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("cantSessions")}
                />
              </View>
              {!valid.cantSessions && (
                <Text className="text-xs color-[#ff0000]">{errors.cantSessions}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg mb-1 font-bold">
                Necesita que pasen a buscar a la mascota?
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <RNPickerSelect
                  placeholder={{ label: "Seleccionar opcion", value: null }}
                  style={{
                    placeholder: {
                      color: "black"
                    }
                  }}
                  onValueChange={handleChange("question")}
                  items={[
                    { label: "Si", value: "Si", color: colors.text },
                    { label: "No", value: "No", color: colors.text }
                  ]}
                />
              </View>
              {!valid.question && (
                <Text className="text-xs color-[#ff0000]">{errors.question}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Informacion adicional
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  editable
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={handleChange("infoAditional")}
                />
              </View>
              {!valid.infoAditional && (
                <Text className="text-xs color-[#ff0000]">{errors.infoAditional}</Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleValidation}>
          <View className="flex justify-center items-center bg-violet-700 py-2 ml-5 mr-5 mb-6 rounded-lg">
            <Text className="text-lg text-white">Enviar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormCorteDePelo;
