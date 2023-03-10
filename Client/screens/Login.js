import { useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../components/InputField";
import { useTheme, useNavigation, Link } from "@react-navigation/native";
import { loginUser } from "./../redux/actions/index";
import { actionLogin } from "../redux/reducers/users";
import Toast from "react-native-toast-message";

const Login = ({ openLogin, setOpenLogin, setOpenRegister }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const { loading } = useSelector(state => state.users);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  async function handleSignin() {
    try {
      const loginCredentials = { email, password };
      handleError("");
      const response = await dispatch(loginUser(loginCredentials));
      if (response.error) throw response.error.message;
      else return response;
    } catch (error) {
      throw error;
    }
  }

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("Por favor, introduzca un correo válido", "email");
      setValid(false);
    }

    if (!password) {
      handleError("Por favor, introduzca su contraseña", "password");
      setValid(false);
    } else if (password.length < 5) {
      handleError("Por favor, introduzca una contraseña con al menos 5 caracteres", "password");
      setValid(false);
    }

    if (valid) {
      try {
        const response = await handleSignin();
        const { name, surname } = response.payload.data;
        Toast.show({
          type: "success",
          text1: `¡Bienvenido ${name} ${surname}!`
        });
        setTimeout(() => {
          dispatch(actionLogin(true));
          setOpenLogin(!openLogin);
          navigation.navigate("Perfil");
        }, 1500);
      } catch (error) {
        if (error === "auth/wrong-password") {
          Toast.show({
            type: "error",
            text1: "Contraseña incorrecta"
          });
        } else if (error === "auth/user-not-found") {
          Toast.show({
            type: "error",
            text1: "No existe una cuenta registrada con ese email"
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Algo ha salido mal. Por favor inténtelo nuevamente"
          });
        }
      }
    }
  };

  function goRegister() {
    setOpenLogin(false);
    setOpenRegister(true);
  }

  return (
    <>
      <View className="z-10">
        <Toast />
      </View>
      <View className="flex gap-y-2 px-4 pb-8 lg:px-8 lg:py-8 w-full">
        {loading ? (
          <View className="absolute bottom-0  top-[-60] left-[-20] right-0 justify-center  align-center w-[100vw] bg-gray-100 opacity-25 h-[100vh] m-0 z-10">
            <ActivityIndicator
              animating={true}
              size="large"
              color="blue"
              className="self-center z-50"
            />
          </View>
        ) : null}
        <Image
          style={{
            resizeMode: "contain",
          }}
          className="mb-4 h-28 w-56 mx-auto"
          source={require("../assets/logo.png")}
        />

        <Text style={{ color: colors.text }} className="text-2xl mb-4 font-bold text-center">
          Bienvenido a MascotApp
        </Text>

        <InputField
          className="my-2"
          label="E-Mail"
          placeholder="Correo electrónico"
          onChangeText={text => setEmail(text)}
          error={errors.email}
        />
        <InputField
          className="my-2"
          label="Contraseña"
          placeholder="Tu contraseña"
          onChangeText={text => setPassword(text)}
          error={errors.password}
          password
        />

        <View className="bg-violet-700 p-3 rounded-lg">
          <Pressable onPress={handleValidation} disabled={loading ? true : false}>
            <Text className="text-white text-center font-bold text-lg">Continuar</Text>
          </Pressable>
        </View>

        <View className="flex gap-y-2 justify-start items-start">
          <Link to={{ screen: "ForgotPassword", params: { emailFromLogin: email } }} onPress={() => setOpenLogin(false)}>
            <Text className="text-violet-500/80 font-bold">Me olvidé la contraseña</Text>
          </Link>
          <Text
            onPress={() => {
              setOpenLogin(false), navigation.navigate("Privacy");
            }}
            className="text-violet-500/80 font-bold"
          >
            Política de privacidad
          </Text>
          <Text onPress={() => goRegister()} className="text-violet-500/80 font-bold">
            ¿No tienes cuenta? Regístrate acá
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;
