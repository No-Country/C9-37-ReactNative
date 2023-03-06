import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme, useNavigation } from "@react-navigation/native";
import { Children } from "react";
import { useSelector } from "react-redux";

const Service = ({ route }) => {
  const { currentUser } = useSelector(state => state.users);
  const { user, jobOffer, userContracted, ownUser } = route.params;
  const colorScheme = "light";
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Image
        className="h-56"
        source={{
          uri: jobOffer.img
        }}
      />
      <View
        style={{ color: colors.text, borderColor: colors.text }}
        className="flex flex-row justify-between items-center py-4 px-6 border-b"
      >
        <View>
          <Text style={{ color: colors.text }} className="font-semibold text-lg">
            {jobOffer.name}
          </Text>
        </View>
        <View>
          <Text style={{ color: colors.text }} className="font-bold text-lg">
            ${jobOffer.price}
          </Text>
        </View>
      </View>
      <View
        style={{ color: colors.text, borderColor: colors.text }}
        className="flex flex-row items-center justify-between py-4 px-7 border-b"
      >
        <Link to={{ screen: "VisitProfile", params: { user: user } }}>
          <View className="flex flex-row items-center">
            <View>
              {user.profile_pic ? (
                <View className="flex items-center">
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "contain"
                    }}
                    className="rounded-full"
                    source={{
                      uri: user.profile_pic
                    }}
                  />
                </View>
              ) : (
                <View className="rounded-full bg-white flex">
                  <Ionicons
                    name="person-circle-outline"
                    size={60}
                    fill={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                </View>
              )}
            </View>
            <View className="flex pl-3 pb-1" style={{ color: colors.text }}>
              <Text className="font-semibold text-lg">{user.name}</Text>
              <Text
                numberOfLines={1}
                style={{ color: colors.textGray }}
                className="text-base mb-1 font-semibold"
              >
                {user.city}
              </Text>
              {user.rating ? (
                <View className="flex flex-row items-center">
                  {Children.toArray(
                    Array.from(Array(user.rating)).map(star => (
                      <Ionicons name="star" size={13} color="#ffe100" />
                    ))
                  )}
                  <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                    {user.clients ? "(" + user.clients + ")" : undefined}
                  </Text>
                </View>
              ) : (
                <Text className="text-white p-1 font-bold bg-violet-600 w-28 mt-1 text-center rounded-sm">
                  Usuario Nuevo
                </Text>
              )}
            </View>
          </View>
        </Link>
        <View>
          <Link
            to={
              currentUser?.data?.id ? { screen: "Message", params: { user } } : { screen: "Perfil" }
            }
          >
            <View
              style={{ color: colors.text, borderColor: colors.text }}
              className="border-2 px-8 py-1"
            >
              <Text
                style={{ color: colors.text, borderColor: colors.text }}
                className="font-bold text-sm"
              >
                Chat
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <View className="py-3 px-3">
        <Text style={{ color: colors.text }} className="font-semibold text-base">
          {jobOffer.description}
        </Text>
      </View>
      <View className="px-4 mt-9">
        <View>
          {userContracted ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  currentUser?.data?.id
                    ? { name: "Review", params: { user, currentUser, jobOffer, userContracted } }
                    : { name: "Perfil" }
                )
              }
              className="flex flex-row justify-center items-center bg-violet-700 py-2 px-28 rounded-lg"
            >
              <Text className="text-xl text-white">Calificar</Text>
            </TouchableOpacity>
          ) : ownUser ? (
            <View className="flex flex-row gap-x-5 pb-6 justify-center">
              <View className="">
                <TouchableOpacity className="flex flex-row justify-center items-center bg-violet-700 py-2 px-12 rounded-lg">
                  <Text className="text-xl text-white">Editar</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity className="flex flex-row justify-center items-center bg-violet-700 py-2 px-10 rounded-lg">
                  <Text className="text-xl text-white">Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  currentUser?.data?.id
                    ? { name: "Request", params: { user, currentUser, jobOffer } }
                    : { name: "Perfil" }
                )
              }
              className="flex flex-row justify-center items-center bg-violet-700 py-2 px-28 rounded-lg"
            >
              <Text className="text-xl text-white">Contratar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Service;
