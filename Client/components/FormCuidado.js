import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

const FormCuidado = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateFinishPickerVisible, setDateFinishPickerVisibility] = useState(false);

  const [formData, setFormData] = useState({
    startDate: "",
    finishDate: "",
    confirmation: "",
    question: "",
    infoAditional: ""
  });

  const [valid, setValid] = useState({
    startDate: false,
    finishDate: false,
    confirmation: false,
    question: false,
    infoAditional: false
  });

  const [errors, setErrors] = useState({});

  //--------------------FECHA 1----------------------------------------------------

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

  //--------------------FECHA 2----------------------------------------------------

  const showDateFinishPicker = () => {
    setDateFinishPickerVisibility(true);
  };

  const hideDateFinishPicker = () => {
    setDateFinishPickerVisibility(false);
  };

  const handleDateFinishConfirm = date => {
    const dt = new Date(date);
    const x = dt.toLocaleDateString();
    const x1 = x.split("/");
    const result = x1[1] + "/" + x1[0] + "/" + x1[2];
    setFormData({
      ...formData,
      finishDate: result
    });
    setValid({
      ...valid,
      finishDate: true
    });
    hideDateFinishPicker();
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

    if (!formData.startDate) {
      handleError("Por favor, introduzca una fecha de incio", "startDate");
      setValid({
        ...valid,
        startDate: false
      });
    }
    if (!formData.finishDate) {
      handleError("Por favor, introduzca una fecha de finalizacion", "finishDate");
      setValid({
        ...valid,
        finishDate: false
      });
    }
    if (!formData.confirmation) {
      handleError("Por favor, seleccione una opcion", "confirmation");
      setValid({
        ...valid,
        confirmation: false
      });
    }
    if (!formData.question) {
      handleError("Por favor, seleccione una opcion", "question");
      setValid({
        ...valid,
        question: false
      });
    }
    if (!formData.infoAditional) {
      handleError("Por favor, introduzca informacion adicional", "infoAditional");
      setValid({
        ...valid,
        infoAditional: false
      });
    }

    if (
      valid.startDate &&
      valid.finishDate &&
      valid.confirmation &&
      valid.question &&
      valid.infoAditional
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
                Fecha de finalizacion
              </Text>
              <TouchableOpacity
                style={{ color: colors.text, borderColor: colors.text }}
                className="flex justify-center items-center border rounded-lg py-3"
                onPress={() => showDateFinishPicker()}
              >
                <Text style={{ color: colors.text }}>{formData.finishDate}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDateFinishPickerVisible}
                mode="date"
                onConfirm={handleDateFinishConfirm}
                onCancel={hideDateFinishPicker}
              />
              {!valid.finishDate && (
                <Text className="text-xs color-[#ff0000]">{errors.finishDate}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg mb-1 font-bold">
                Confirmar la mascota elegida?
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
                  onValueChange={handleChange("confirmation")}
                  items={[
                    { label: "Si", value: "Si", color: colors.text },
                    { label: "No", value: "No", color: colors.text }
                  ]}
                />
              </View>
              {!valid.confirmation && (
                <Text className="text-xs color-[#ff0000]">{errors.confirmation}</Text>
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

export default FormCuidado;
