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
import { useAuth } from "../context/AuthContext";
import { actionLogin } from "../redux/reducers/users";

const Login = ({ openLogin, setOpenLogin }) => {
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
      dispatch(loginUser(loginCredentials));
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        handleError("Contraseña incorrecta, por favor intentelo de nuevo", "password");
      } else if (error.code === "auth/user-not-found") {
        handleError("Usuario no encontrado", "password");
      } else if (error.code) {
        handleError("Algo salió mal, por favor intentelo de nuevo", "password");
      }
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
      await handleSignin();
      dispatch(actionLogin(true));
      setOpenLogin(!openLogin);
      navigation.navigate("Perfil");
    }
  };

  return (
    <>
      <View className="flex gap-y-2 p-8 w-full">
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
            resizeMode: "contain"
          }}
          className="mb-4 h-28 w-56 mx-auto"
          source={require("../assets/logo.png")}
        />

        <Text style={{ color: colors.text }} className="text-2xl mb-4 font-bold text-center">
          Bienvenido a MascotApp
        </Text>

        <InputField
          label="E-Mail"
          placeholder="Correo electrónico"
          onChangeText={text => setEmail(text)}
          error={errors.email}
        />
        <InputField
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

        <View className="flex gap-y-2">
          <Link to={{ screen: "ForgotPassword", params: { emailFromLogin: email, setOpenLogin } }}>
            <Text className="text-violet-500/80 font-bold">Me Olvide la Contraseña</Text>
          </Link>
          <Text className="text-violet-500/80 font-bold">No tenes cuenta? Registrate aca</Text>
          <Text className="text-violet-500/80 font-bold">Politica de Privacidad</Text>
        </View>
      </View>
    </>
  );
};

export default Login;
