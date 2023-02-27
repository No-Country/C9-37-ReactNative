import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

const FormTransporte = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [formData, setFormData] = useState({
    searchDate: "",
    ubicationSearch: "",
    ubicationGoTo: "",
    confirmation: "",
    question: "",
    infoAditional: ""
  });

  const [valid, setValid] = useState({
    searchDate: false,
    ubicationSearch: false,
    ubicationGoTo: false,
    confirmation: false,
    question: false,
    infoAditional: false
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
      searchDate: result
    });
    setValid({
      ...valid,
      searchDate: true
    });
    hideDatePicker();
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

    if (!formData.searchDate) {
      handleError("Por favor, introduzca una fecha", "searchDate");
      setValid({
        ...valid,
        searchDate: false
      });
    }
    if (!formData.ubicationSearch) {
      handleError("Por favor, introduzca una ubicacion", "ubicationSearch");
      setValid({
        ...valid,
        ubicationSearch: false
      });
    }
    if (!formData.ubicationGoTo) {
      handleError("Por favor, introduzca una ubicacion", "ubicationGoTo");
      setValid({
        ...valid,
        ubicationGoTo: false
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
      valid.searchDate &&
      valid.ubicationSearch &&
      valid.ubicationGoTo &&
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
                Fecha que hay buscar a la mascota
              </Text>
              <TouchableOpacity
                style={{ color: colors.text, borderColor: colors.text }}
                className="flex justify-center items-center border rounded-lg py-3"
                onPress={() => showDatePicker()}
              >
                <Text style={{ color: colors.text }}>{formData.searchDate}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              {!valid.searchDate && (
                <Text className="text-xs color-[#ff0000]">{errors.searchDate}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Lugar donde hay que bucar a la mascota
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("ubicationSearch")}
                />
              </View>
              {!valid.ubicationSearch && (
                <Text className="text-xs color-[#ff0000]">{errors.ubicationSearch}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Lugar donde hay wue llevar a la mascota
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("ubicationGoTo")}
                />
              </View>
              {!valid.ubicationGoTo && (
                <Text className="text-xs color-[#ff0000]">{errors.ubicationGoTo}</Text>
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
                Hay que devolverla al mismo lugar?
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

export default FormTransporte;
