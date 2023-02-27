import {
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { actionLogin } from "../redux/reducers/users";
import { addFavourite, deleteFavourite, fetchFavourites, logOutUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import VisitorOptions from "./VisitorOptions";

const UserProfile = ({ route}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { currentUser } = useSelector(state => state.users);
  const user = route?.params ? route.params.user : currentUser?.data;
  const favorited = useSelector(state => state.users.favouriteUsers);
  const userActive = route?.params?.user ? false : true;

  const handleLogOut = () => {
    dispatch(actionLogin(false));
    dispatch(logOutUser());
  };

  const addFavorite = () => {
    dispatch(addFavourite({ currentUser, id: user.id }));
    dispatch(fetchFavourites(currentUser));
  };

  const delFavorite = () => {
    dispatch(deleteFavourite({ currentUser, id: user.id }));
    dispatch(fetchFavourites(currentUser));
  };

  const verifyFavorite = id => {
    const res = favorited
      ?.filter(fav => {
        return fav.id === id;
      })
      .map(res => {
        return res.id;
      });

    return +res === id;
  };

  if (!user)
    return (
      <View>
        <VisitorOptions></VisitorOptions>
      </View>
    );

  return (
    <View className="h-full w-full p-5 gap-y-5">
      <View className="flex flex-row justify-start gap-x-4 w-full">
        {user.profile_pic ? (
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain"
            }}
            className="rounded-full"
            source={{
              uri: user.profile_pic
            }}
          />
        ) : (
          <View className="flex justify-center h-[105px] rounded-full bg-white">
            <Ionicons name="person-circle-outline" size={100} />
          </View>
        )}

        <View className="flex justify-between flex-row w-full flex-shrink">
          <View className="flex flex-col gap-y-2">
            <Text style={{ color: colors.text }} className="text-2xl font-bold -mb-1">
              {user.name} {user.surname}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm -mb-1">
              {user.city}
            </Text>
            {user.rating ? (
              <View className="flex flex-row items-center">
                {Children.toArray(
                  Array.from(Array(user.rating)).map(star => (
                    <Ionicons name="star" size={10} color="#ffe100" />
                  ))
                )}
                <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                  {user.rating ? "(" + user.rating + ")" : undefined}
                </Text>
              </View>
            ) : (
              <Text className="text-xs text-white p-1 font-bold bg-violet-600 w-28 text-center rounded-sm">
                Usuario Nuevo
              </Text>
            )}

            {userActive ? (
              <View className="flex flex-row gap-x-2">
                <Pressable
                  style={{ color: colors.text, borderColor: colors.text }}
                  className="border"
                >
                  <Link to={{ screen: "Edit" }} style={{ padding: 8 }}>
                    <Text style={{ color: colors.text }} className="text-sm font-bold">
                      Editar perfil
                    </Text>
                  </Link>
                </Pressable>
                <Pressable
                  style={{ color: colors.text, borderColor: colors.text }}
                  className="border"
                >
                  <Link to={{ screen: "Favorites" }} style={{ padding: 8 }}>
                    <Text style={{ color: colors.text }} className="text-sm font-bold">
                      Favoritos
                    </Text>
                  </Link>
                </Pressable>
              </View>
            ) : (
            <Link to={currentUser?.data?.id? { screen: "Message", params: { user } } : {screen: "Perfil"}}>
              <View style={{borderColor: colors.border}} className="flex justify-center items-center border mr-auto">
                <Text style={{color: colors.text}} className="py-2 px-5 font-medium">
                  Chatear
                </Text>
              </View>
            </Link>
            )}
          </View>

          {!userActive ? (
            verifyFavorite(user.id) ? (
              <Ionicons onPress={() => delFavorite()} name="heart" size={30} color={colors.text} />
            ) : (
              <Ionicons
                onPress={() => currentUser?.data?.id? addFavorite() : navigation.navigate("Perfil")}
                name="heart-outline"
                size={30}
                color={colors.text}
              />
            )
          ) : undefined}
        </View>
      </View>

      <View className="mt-8">
        <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
          Sobre mi
        </Text>
        <Text style={{ color: colors.text }} className="text-base">
          {
            !userActive?
              user.description?
                user.description
                :
                user.name+" todavia no completo este campo."
              :
            currentUser?.data?.id?
              user.description?
                user.description
                :
                "Aun no completaste este campo."
            :
            ""
          }
        </Text>
      </View>

      {
        user?.service?
        <View>
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
            Servicios
          </Text>

          <View className="flex justify-start flex-row items-center gap-x-3">
            <Text className="text-base p-2 text-white bg-violet-700 rounded-2xl">
              {user?.service}
            </Text>
          </View>
        </View>
        :
        undefined
      }

      {userActive ? (
        <View className="flex justify-center items-center">
          <TouchableOpacity onPress={handleLogOut} className="bg-violet-700 py-2 px-4 rounded-lg">
            <Text className="text-xl text-white">Cerrar sesion</Text>
          </TouchableOpacity>
        </View>
      ) : (
        undefined
      )}
    </View>
  );
};

export default UserProfile;
