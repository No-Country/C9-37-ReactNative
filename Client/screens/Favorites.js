import { Image, Pressable, ScrollView, Text, useColorScheme, View } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchFavorites, DelFavorite} from "../redux/actions";
import { useEffect, Children, useState } from "react";
import { Ionicons } from '@expo/vector-icons';

const Favorites = () => {
  const { dark, colors } = useTheme();

  const { currentUser } = useSelector(state => state.users);

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.users.favouriteUsers);

  useEffect(() => {
    dispatch(fetchFavorites(currentUser.data.auth.id));
  }, []);

  if (favorites.length < 1) return <Text className="mx-auto text-2xl font-bold py-10">No tenes favoritos.</Text>

  const delFavorite = (id) => {
    dispatch(DelFavorite({id: currentUser.data.auth.id, fav_id: id}))
    dispatch(fetchFavorites(currentUser.data.auth.id));
  }

  return (
    <View className="pt-3 pb-10 w-full">
    <ScrollView className="h-full" showsVerticalScrollIndicator="false">
      {
        Children.toArray(
        favorites.map(favorite => (
          <View style={{borderColor: colors.border}} className="flex flex-row gap-x-2 border my-1 overflow-hidden relative">
            <View className="relative">
              <Image
                className="h-32 w-32"
                source={{
                  uri: favorite.profile_pic
                }}
              />
              <Text style={{backgroundColor: (favorite.offers_services? "#07d70a" : "#000")}} className="text-white font-medium text-center p-1 bottom-0 w-full">{favorite.offers_services? "Disponible" : "No Disponible"}</Text>
            </View>

            <View className="p-2 flex gap-y-1">
              <Text style={{color: colors.text}} className="text-xl">{favorite.name}</Text>
              <Text style={{color: colors.text}} className="opacity-70">{favorite.city}</Text>
            </View>

            <Pressable className="right-2 top-2 absolute">
              <Ionicons
                onPress={() => delFavorite(favorite.id)}
                name="trash-outline"
                size={26}
                color={dark? "#fff" : "#000"}
              />
            </Pressable>
          </View>
        ))
        )
      }
    </ScrollView>
    </View>
  );
};

export default Favorites;
