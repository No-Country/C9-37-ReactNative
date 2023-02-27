import { useState } from "react";
import { Text, View, Modal, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";

import Register from "../screens/Register";
import Login from "../screens/Login";

const VisitorOptions = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { colors } = useTheme();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openLogin}
        onRequestClose={() => {
          setOpenLogin(!openLogin);
        }}
      >
        <ScrollView className="h-full" style={{ backgroundColor: colors.background }}>
        <View className="flex justify-center h-full w-full mt-auto">
          <View
            className="pt-20 lg:pt-10 px-5 h-full w-full lg:max-w-3xl mx-auto"
          >
            <View className="flex justify-between flex-row items-center">
              <Ionicons
                onPress={() => setOpenLogin(!openLogin)}
                name="md-close-sharp"
                size={34}
                color={colors.text}
              />
              <Text style={{color: colors.text}} className="font-bold">Iniciar Sesión</Text>
              <Text className="w-10"></Text>
            </View>
            <Login openLogin={openLogin} setOpenLogin={setOpenLogin} setOpenRegister={setOpenRegister}/>
          </View>
        </View>
        </ScrollView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openRegister}
        onRequestClose={() => {
          setOpenRegister(!openRegister);
        }}
      >
        <ScrollView className="h-full" style={{ backgroundColor: colors.background }}>
          <View className="flex justify-center h-full w-full mt-auto">
            <View
              className="pt-20 lg:pt-10 px-5 h-full w-full lg:max-w-3xl mx-auto"
            >
              <View className="flex justify-between flex-row items-center">
                <Ionicons
                  onPress={() => setOpenRegister(!openRegister)}
                  name="md-close-sharp"
                  size={34}
                  color={colors.text}
                />
                <Text className="font-bold">Registrarme</Text>
                <Text className="w-10"></Text>
              </View>
              <Register />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <View className="flex gap-y-2 py-6">
        <Pressable
          style={{ borderColor: colors.text }}
          className="border p-4 w-32 mx-auto rounded-sm"
          onPress={() => setOpenLogin(true)}
        >
          <Text style={{ color: colors.text }} className="font-bold text-center">
            Iniciar Sesión
          </Text>
        </Pressable>

        <Pressable
          className="bg-violet-700 p-4 w-32 mx-auto rounded-sm"
          onPress={() => setOpenRegister(true)}
        >
          <Text className="text-white font-bold text-center">Registrarme</Text>
        </Pressable>

        <Pressable
          style={{ color: colors.text, borderColor: colors.text }}
          className="border p-4 w-32 mx-auto rounded-sm"
        >
          <Link to={{ screen: "AboutUs" }}>
            <Text style={{ color: colors.text }} className="flex text-center">
              Acerca de Nosotros
            </Text>
          </Link>
        </Pressable>
      </View>
    </View>
  );
};

export default VisitorOptions;
