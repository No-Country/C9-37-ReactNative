import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert
} from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addJobOffer } from "../redux/actions";
import Toast from "react-native-toast-message";

const FormJobOffers = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { category } = route.params;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.users);
  const user = currentUser?.data;

  const [formData, setFormData] = useState({
    categoryId:
      category === "Peluqueria"
        ? 5
        : category === "Paseo"
        ? 1
        : category === "Transporte"
        ? 3
        : category === "Alojamiento"
        ? 2
        : category === "Entrenamiento"
        ? 4
        : undefined,
    img:
      category === "Peluqueria"
        ? "https://images.ecestaticos.com/QrGY4szPeVHiRI7y1s8kbwGvPhA=/0x0:1778x1333/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F0ac%2F6c8%2F61a%2F0ac6c861a0da67564d3c81f5b5e19fcf.jpg"
        : category === "Paseo"
        ? "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2022/05/21/628955615d048.jpeg"
        : category === "Transporte"
        ? "https://cdn.motor1.com/images/mgl/YAANLq/s3/5.jpg"
        : category === "Alojamiento"
        ? "https://media.iatiseguros.com/wp-content/uploads/2017/08/04004709/hacer-housesitting-1.jpg"
        : category === "Entrenamiento"
        ? "https://www.olimpia.com.ec/wp-content/uploads/2018/07/Blog-entrenar-perro-sin-logo.jpg"
        : "https://venadotuerto.gob.ar/wp-content/uploads/2021/02/cuidado-mascotas.jpg",
    name: "",
    price: 0,
    description: ""
  });

  const [valid, setValid] = useState({
    name: false,
    price: false,
    description: false
  });

  const [errors, setErrors] = useState({});

  //-----------------------------------------------

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

    if (!formData.name) {
      handleError("Por favor, introduzzca un nombre al servicio", "name");
      setValid({
        ...valid,
        name: false
      });
    }

    if (!formData.price) {
      handleError("Por favor, introduzca una cantidad", "price");
      setValid({
        ...valid,
        price: false
      });
    }

    if (!formData.description) {
      handleError("Por favor, introduzca una descripcion del servicio", "description");
      setValid({
        ...valid,
        description: false
      });
    }

    if (valid.name && valid.price && valid.description) {
      try {
        const response = await dispatch(addJobOffer({ user, formData }));

        if (response) {
          Alert.alert(
            "Servicio creado con éxito",
            "Puedes ver tus servicios haciendo click en servicios brindados",
            [{ text: "OK" }]
          );

          navigation.navigate("Home");
        }
      } catch (error) {
        Alert.alert("Algo ha salido mal", "Por favor intentelo nuevamente", [{ text: "OK" }]);
        navigation.goBack();
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
              <View className="flex justify-center items-center">
                <Image
                  style={{
                    width: 310,
                    height: 200
                  }}
                  source={{
                    uri: formData.img
                  }}
                  className="rounded-lg"
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Tipo de servicio
              </Text>
              <View style={{ color: colors.text, borderColor: colors.text }} className="rounded-lg">
                <Text style={{ color: colors.text }} className="text-base">
                  {category}
                </Text>
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Nombre del servicio
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("name")}
                />
              </View>
              {!valid.name && <Text className="text-xs color-[#ff0000]">{errors.name}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Precio del servicio
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  keyboardType="numeric"
                  onChangeText={handleChange("price")}
                />
              </View>
              {!valid.price && <Text className="text-xs color-[#ff0000]">{errors.price}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Descripcion del servicio
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
                  onChangeText={handleChange("description")}
                />
              </View>
              {!valid.description && (
                <Text className="text-xs color-[#ff0000]">{errors.description}</Text>
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

export default FormJobOffers;
