import { REACT_APP_BACK_URL } from "@env";
import axios from "axios";
import { NativeWindStyleSheet } from "nativewind";
import { useState } from "react";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { Image, View, StatusBar } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import persistStore from "redux-persist/es/persistStore";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { HomeIcon, MessageIcon, PawIcon, ProfileIcon, SearchIcon } from "./components/Icons";

import Index from "./screens/Index";
import Home from "./screens/Home";
import Post from "./screens/Post";
import Messages from "./screens/Messages";
import Message from "./screens/Message";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import AboutUs from "./screens/AboutUs";
import BlogPost from "./screens/BlogPost";
import Favorites from "./screens/Favorites";
import EditarProfile from "./screens/EditProfile";
import Service from "./screens/Service";
import AuthProvider from "./context/AuthContext";
import FormService from "./components/FormService";
import FormCorteDePelo from "./components/FormCorteDePelo";
import FormPaseador from "./components/FormPaseador";
import FormTransporte from "./components/FormTransporte";
import FormCuidado from "./components/FormCuidado";
import FormEntrenamiento from "./components/FormEntrenamiento";
import ServicesContracted from "./components/ServicesContracted";
import ServicesProvided from "./components/ServicesProvided";
import UserProfile from "./components/UserProfile";
import ForgotPassword from "./screens/ForgotPassword";

// Setea la url base a partir de la cual axios va a realizar las llamadas al back

axios.defaults.baseURL = REACT_APP_BACK_URL; // cuando querramos trabajar y/o probar nuestro proyecto de forma local
// axios.defaults.baseURL = process.env.REACT_APP_DEPLOY_BACK_URL; // cuando querramos pushear o actualizar nuestro deploy del front

// Habilita Tailwind en React Native Web

NativeWindStyleSheet.setOutput({
  default: "native"
});

// Contenedor de Rutas

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Colores y Temas

const violet = "#7f4dff";
const lightColor = "#fff";
const darkColor = "#010101";

const CustomLight = {
  dark: false,
  colors: {
    background: lightColor,
    border: "#d8d8d8a0",
    card: lightColor,
    notification: "#ff3b30",
    primary: "#007aff",
    text: "#1c1c1e",
    textGray: "#777",
    violet: "#7f4dff"
  }
};

const CustomDark = {
  dark: true,
  colors: {
    background: darkColor,
    border: "#272729ab",
    card: darkColor,
    notification: "#ff453a",
    primary: "#0a84ff",
    text: "#fff",
    textGray: "#999",
    violet: "#7f4dff"
  }
};

// Navbar de paginas principales

function BottomNavigation({ isDarkMode, setDarkMode, colors }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => (
          <Image
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
            source={require("./assets/logo.png")}
          />
        ),
        headerRight: () => (
          <Ionicons
            onPress={() => setDarkMode(!isDarkMode)}
            name={isDarkMode? "sunny-outline" : "moon-outline"}
            size={30}
            color={isDarkMode ? "#fff" : "#000"}
          />
        ),
        headerTitle: "",
        headerStyle: {
          shadowColor: "transparent",
          borderBottomWidth: 0
        },
        headerLeftContainerStyle: {
          paddingLeft: 20
        },
        headerRightContainerStyle: {
          paddingRight: 20
        },
        tabBarStyle: {
          marginBottom: 2
        },
        headerTintColor: colors.text,
        tabBarActiveTintColor: violet,
        tabBarInactiveTintColor: "#999"
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Index}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: props => <HomeIcon color={props.color} />
        }}
      />

      <Tab.Screen
        name="Buscar"
        component={Search}
        options={({ route }) => ({
          tabBarLabel: "Buscar",
          tabBarIcon: props => <SearchIcon color={props.color} />
        })}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Explorar",
          tabBarIcon: props => <PawIcon color={props.color} />
        }}
      />

      <Tab.Screen
        name="Mensajes"
        component={Messages}
        options={{
          tabBarLabel: "Mensajes",
          tabBarIcon: props => <MessageIcon color={props.color} />,
          tabBarBadge: 3
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: props => <ProfileIcon color={props.color} />
        }}
      />
    </Tab.Navigator>
  );
}

// Index de Rutas

let persistorStore = persistStore(store);

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const { colors } = useTheme();

  // Esto toma el tema del dispositivo
  // const scheme = useColorScheme();

  return (
    <NativeRouter>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate persistor={persistorStore}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

            <NavigationContainer theme={isDarkMode ? CustomDark : CustomLight}>
              <Stack.Navigator
                screenOptions={{
                  headerTintColor: isDarkMode ? "#fff" : "#000"
                }}
              >
                <Stack.Screen name="Root" options={{ headerShown: false }}>
                  {() => (
                    <BottomNavigation
                      isDarkMode={isDarkMode}
                      setDarkMode={setDarkMode}
                      colors={colors}
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen
                  name="Post"
                  component={Post}
                  options={({ route }) => ({ title: route.params.title })}
                />

                <Stack.Screen
                  name="BlogPost"
                  component={BlogPost}
                  options={{
                    title: "Blog"
                  }}
                />

                <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />

                <Stack.Screen
                  name="AboutUs"
                  component={AboutUs}
                  options={{
                    title: "Acerca de Nosotros"
                  }}
                />

                <Stack.Screen
                  name="Favorites"
                  component={Favorites}
                  options={{
                    title: "Favoritos"
                  }}
                />

                <Stack.Screen
                  name="Edit"
                  component={EditarProfile}
                  options={{
                    title: "Editar perfil"
                  }}
                />

                <Stack.Screen
                  name="Service"
                  component={Service}
                  options={{
                    title: "Servicio"
                  }}
                />

                <Stack.Screen
                  name="FormService"
                  component={FormService}
                  options={{
                    title: "Ofrece tus servicios"
                  }}
                />

                <Stack.Screen
                  name="Corte de pelo"
                  component={FormCorteDePelo}
                  options={{
                    title: "Corte de pelo"
                  }}
                />

                <Stack.Screen
                  name="Paseador"
                  component={FormPaseador}
                  options={{
                    title: "Paseador"
                  }}
                />

                <Stack.Screen
                  name="Transporte"
                  component={FormTransporte}
                  options={{
                    title: "Transporte"
                  }}
                />

                <Stack.Screen
                  name="Cuidado"
                  component={FormCuidado}
                  options={{
                    title: "Cuidado"
                  }}
                />

                <Stack.Screen
                  name="Entrenamiento"
                  component={FormEntrenamiento}
                  options={{
                    title: "Entrenamiento"
                  }}
                />

                <Stack.Screen
                  name="ServicesContracted"
                  component={ServicesContracted}
                  options={{
                    title: "Servicios contratados"
                  }}
                />

                <Stack.Screen
                  name="ServicesProvided"
                  component={ServicesProvided}
                  options={{
                    title: "Servicios brindados"
                  }}
                />

                <Stack.Screen
                  name="VisitProfile"
                  component={UserProfile}
                  options={{
                    title: ""
                  }}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                  options={{
                    title: "Olvidé mi contraseña"
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </NativeRouter>
  );
}

export default App;
