import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./../redux/actions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

const FormSecondScreen = ({ formData, setFormData, setScreen }) => {
  const { colors } = useTheme();

  const firebaseError = useSelector(state => state.users.fbError);
  console.log("fb_error: ", firebaseError);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function handleSignup() {
    try {
      setErrors("");
      setLoading(true);
      dispatch(registerUser(formData));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!formData.name) {
      handleError("Por favor, introduzca su nombre", "name");
      setValid(false);
    }
    if (!formData.surname) {
      handleError("Por favor, introduzca su apellido", "surname");
      setValid(false);
    }
    if (!formData.city) {
      handleError("Por favor, introduzca su ciudad", "city");
      setValid(false);
    }

    switch (firebaseError?.message) {
      case "auth/email-already-in-use":
        Toast.show({
          type:"error",
          text1:"Ya existe una cuenta con ese email"
        });
        setValid(false);
        break;
      case "auth/invalid-email":
        Toast.show({
          type:"error",
          text1:"Email inválido"
        });
        setValid(false);
        break;
      case "auth/weak-password":
        Toast.show({
          type:"error",
          text1:"La contraseña es demasiado débil"
        });
        setValid(false);
        break;
      default:
        Toast.show({
          type:"error",
          text1:"Algo ha salido mal."
        });
        setValid(false);
        break;
    }

    if (valid) {
      await handleSignup();
      await AsyncStorage.setItem("token", formData);
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <>
    <Toast/>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView className="w-full ">
        <View className="w-full ">
          <InputField
            className="my-1"
            label="Nombre"
            placeholder="Tu nombre"
            onChangeText={text => setFormData({ ...formData, name: text })}
            error={errors.name}
            value={formData.name}
          />
          <InputField
            className="my-1"
            label="Apellido"
            placeholder="Tu apellido"
            onChangeText={text => setFormData({ ...formData, surname: text })}
            /* onChangeText={text => setSurname(text)} */
            error={errors.surname}
            value={formData.surname}
          />
          <InputField
            className="my-1"
            label="Ciudad"
            placeholder="Tu ciudad"
            onChangeText={text => setFormData({ ...formData, city: text })}
            /* onChangeText={text => setCity(text)} */
            error={errors.city}
            value={formData.city}
          />
          <View className="flex flex-row justify-start gap-x-5 w-full">
            <View className="flex justify-center items-center rounded-lg bg-violet-700 my-2">
              <Pressable onPress={() => setScreen(0)} className=" py-3 px-6 rounded-lg">
                <Text className="text-white text-center font-bold text-lg">Atrás</Text>
              </Pressable>
            </View>
            <View className="flex justify-center items-center rounded-lg bg-violet-700 my-2">
              <Pressable onPress={handleValidation} className=" py-3 px-6 rounded-lg">
                <Text className="text-white text-center font-bold text-lg">Registrarme</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
};

export default FormSecondScreen;
