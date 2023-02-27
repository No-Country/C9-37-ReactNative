import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

const FormPaseador = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [formData, setFormData] = useState({
    petType: "",
    razaType: "",
    size: "",
    age: "",
    weight: "",
    confirmation: "",
    cantWalksDay: 0,
    cantDaysWalk: 0,
    startDate: "",
    ubicationService: "",
    infoAditional: ""
  });

  const [valid, setValid] = useState({
    petType: false,
    razaType: false,
    size: false,
    age: false,
    weight: false,
    confirmation: false,
    cantWalksDay: false,
    cantDaysWalk: false,
    startDate: false,
    ubicationService: false,
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
      startDate: result
    });
    setValid({
      ...valid,
      startDate: true
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

    if (!formData.petType) {
      handleError("Por favor, seleccione un tipo de mascota", "petType");
      setValid({
        ...valid,
        petType: false
      });
    }
    if (!formData.razaType) {
      handleError("Por favor, introduzca un tipo de raza", "razaType");
      setValid({
        ...valid,
        razaType: false
      });
    }
    if (!formData.size) {
      handleError("Por favor, introduzca un tamaño", "size");
      setValid({
        ...valid,
        size: false
      });
    }
    if (!formData.age) {
      handleError("Por favor, introduzca una edad", "age");
      setValid({
        ...valid,
        age: false
      });
    }
    if (!formData.weight) {
      handleError("Por favor, introduzca el peso", "weight");
      setValid({
        ...valid,
        weight: false
      });
    }
    if (!formData.confirmation) {
      handleError("Por favor, seleccione una opcion", "confirmation");
      setValid({
        ...valid,
        confirmation: false
      });
    }
    if (!formData.cantWalksDay) {
      handleError("Por favor, introduzca una cantidad", "cantWalksDay");
      setValid({
        ...valid,
        cantWalksDay: false
      });
    }
    if (!formData.cantDaysWalk) {
      handleError("Por favor, introduzca una cantidad", "cantDaysWalk");
      setValid({
        ...valid,
        cantDaysWalk: false
      });
    }
    if (!formData.startDate) {
      handleError("Por favor, introduzca una fecha de incio", "startDate");
      setValid({
        ...valid,
        startDate: false
      });
    }
    if (!formData.ubicationService) {
      handleError("Por favor, introduzca una ubicacion", "ubicationService");
      setValid({
        ...valid,
        ubicationService: false
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
      valid.petType &&
      valid.razaType &&
      valid.size &&
      valid.age &&
      valid.weight &&
      valid.confirmation &&
      valid.cantWalksDay &&
      valid.cantDaysWalk &&
      valid.startDate &&
      valid.ubicationService &&
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
          <View>
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Tipo de mascota
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <RNPickerSelect
                  placeholder={{ label: "Seleccionar tipo de mascota", value: null }}
                  style={{
                    placeholder: {
                      color: "black"
                    },
                    color: colors.text,
                    borderColor: colors.text
                  }}
                  onValueChange={handleChange("petType")}
                  items={[
                    { label: "Perro", value: "Perro", color: colors.text },
                    { label: "Gato", value: "Gato", color: colors.text },
                    { label: "Pez", value: "Pez", color: colors.text },
                    { label: "Pajaro", value: "Pajaro", color: colors.text },
                    { label: "Hamster", value: "Hamster", color: colors.text }
                  ]}
                />
              </View>
              {!valid.petType && <Text className="text-xs color-[#ff0000]">{errors.petType}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Tipo de raza
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <RNPickerSelect
                  placeholder={{ label: "Seleccionar tipo de raza", value: null }}
                  style={{
                    placeholder: {
                      color: "black"
                    },
                    color: colors.text,
                    borderColor: colors.text
                  }}
                  onValueChange={handleChange("razaType")}
                  items={[
                    { label: "Labrador", value: "Labrador", color: colors.text },
                    { label: "Caniche", value: "Caniche", color: colors.text },
                    { label: "Bulldog", value: "Bulldog", color: colors.text }
                  ]}
                />
              </View>
              {!valid.razaType && (
                <Text className="text-xs color-[#ff0000]">{errors.razaType}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Tamaño
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("size")}
                />
              </View>
              {!valid.size && <Text className="text-xs color-[#ff0000]">{errors.size}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Edad
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("age")}
                />
              </View>
              {!valid.age && <Text className="text-xs color-[#ff0000]">{errors.age}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Peso
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("weight")}
                />
              </View>
              {!valid.weight && <Text className="text-xs color-[#ff0000]">{errors.weight}</Text>}
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
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Cantidad de caminatas por dia
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("cantWalksDay")}
                />
              </View>
              {!valid.cantWalksDay && (
                <Text className="text-xs color-[#ff0000]">{errors.cantWalksDay}</Text>
              )}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Cantidad de dias que necesita caminar
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("cantDaysWalk")}
                />
              </View>
              {!valid.cantDaysWalk && (
                <Text className="text-xs color-[#ff0000]">{errors.cantDaysWalk}</Text>
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
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Lugar donde ofrece el servicio
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("ubicationService")}
                />
              </View>
              {!valid.ubicationService && (
                <Text className="text-xs color-[#ff0000]">{errors.ubicationService}</Text>
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

export default FormPaseador;
