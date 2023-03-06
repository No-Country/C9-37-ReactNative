import {
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { actionLogin } from "../redux/reducers/users";
import {
  addFavourite,
  deleteFavourite,
  fetchFavourites,
  logOutUser,
  fetchPetsUser,
  fetchPetsUserSearch,
  fetchJobOffersUser,
  fetchJobOffersUserSearch,
  fetchReviewsUser,
  fetchReviewsUserSearch,
  cleanState
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import VisitorOptions from "./VisitorOptions";

const UserProfile = ({ route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { currentUser } = useSelector(state => state.users);
  const user = route?.params ? route.params.user : currentUser?.data;
  const favorited = useSelector(state => state.users.favouriteUsers);
  const userActive = route?.params?.user ? false : true;
  const {
    petsUsers,
    petsUsersSearch,
    jobOffersUser,
    jobOffersUserSearch,
    reviewsUser,
    reviewsUserSearch
  } = useSelector(state => state.users);

  console.log("Usuario propio", reviewsUser);
  console.log("Usuario normal", reviewsUserSearch);

  useEffect(() => {
    dispatch(cleanState());
    dispatch(fetchPetsUser({ currentUser }));
    dispatch(fetchJobOffersUser({ currentUser }));
    dispatch(fetchPetsUserSearch({ user }));
    dispatch(fetchJobOffersUserSearch({ user }));
    dispatch(fetchReviewsUser({ currentUser }));
    dispatch(fetchReviewsUserSearch({ user }));
  }, [dispatch]);

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

  const refreshList = () => {
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
  <ScrollView>
    <ScrollView className={"px-5 pt-6 gap-y-5 h-full " + ( Platform.OS === "ios" ? "mb-10" : "")}>
      <View className="flex flex-row pl-2">
        {user.profile_pic ? (
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "cover"
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

        <View className="flex justify-between flex-row w-full flex-shrink pl-4">
          <View className="flex flex-col gap-y-2">
            <Text style={{ color: colors.text }} className="text-2xl font-bold -mb-1 max-w-[150px]">
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

          <View className="flex justify-between flex-row w-full flex-shrink pl-4">
            <View className="flex flex-col gap-y-2">
              <Text
                style={{ color: colors.text }}
                className="text-2xl font-bold -mb-1 max-w-[150px]"
              >
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
                <View className="flex flex-row">
                  <Pressable
                    style={{ color: colors.text, borderColor: colors.text }}
                    className="border"
                  >
                    <Link to={{ screen: "Configuration" }} style={{ padding: 8 }}>
                      <Text style={{ color: colors.text }} className="text-sm font-bold">
                        Configuracion
                      </Text>
                    </Link>
                  </Pressable>
                </View>
              ) : (
                <Link
                  to={
                    currentUser?.data?.id
                      ? { screen: "Message", params: { user } }
                      : { screen: "Perfil" }
                  }
                >
                  <View
                    style={{ borderColor: colors.border }}
                    className="flex justify-center items-center border mr-auto"
                  >
                    <Text style={{ color: colors.text }} className="py-2 px-5 font-medium">
                      Chatear
                    </Text>
                  </View>
                </Link>
              )}
            </View>

            {!userActive ? (
              verifyFavorite(user.id) ? (
                <Ionicons
                  onPress={() => {
                    delFavorite(), refreshList();
                  }}
                  name="heart"
                  size={30}
                  color={colors.text}
                />
              ) : (
                <Ionicons
                  onPress={() =>
                    currentUser?.data?.id
                      ? (addFavorite(), refreshList())
                      : navigation.navigate("Perfil")
                  }
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
            Sobre mí
          </Text>
          <Text style={{ color: colors.text }} className="text-base">
            {!userActive
              ? user.description
                ? user.description
                : user.name + " todavia no completo este campo."
              : currentUser?.data?.id
              ? user.description
                ? user.description
                : "Aún no completaste este campo."
              : ""}
          </Text>
        </View>

        <View>
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
            Servicios
          </Text>

          {userActive ? (
            <View className="">
              {jobOffersUser?.length >= 1 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="gap-x-4"
                >
                  {jobOffersUser.map(jobOffer => (
                    <Link
                      key={jobOffer.id}
                      to={{
                        screen: "Service",
                        params: { jobOffer: jobOffer, user: user, ownUser: true }
                      }}
                    >
                      <View
                        key={jobOffer.id}
                        className="w-36 shadow-sm rounded-lg bg-white/10 mt-3"
                      >
                        <Image
                          className="h-24 rounded-t-lg"
                          source={{
                            uri: jobOffer.img
                          }}
                        />

                        <View className="p-3 gap-y-1 flex justify-center items-center">
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.text }}
                            className="text-base font-semibold -mb-1 flex justify-center"
                          >
                            {jobOffer.name}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm flex justify-center"
                          >
                            En {user.city}
                          </Text>
                        </View>
                      </View>
                    </Link>
                  ))}
                </ScrollView>
              ) : (
                <View>
                  <Text style={{ color: colors.text }} className="text-base">
                    No ofrece servicios
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              {jobOffersUserSearch?.length >= 1 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="gap-x-4"
                >
                  {jobOffersUserSearch.map(jobOffer => (
                    <Link
                      key={jobOffer.id}
                      to={{ screen: "Service", params: { jobOffer: jobOffer, user: user } }}
                    >
                      <View
                        key={jobOffer.id}
                        className="w-36 shadow-sm rounded-lg bg-white/10 mt-3"
                      >
                        <Image
                          className="h-24 rounded-t-lg"
                          source={{
                            uri: jobOffer.img
                          }}
                        />

                        <View className="p-3 gap-y-1 flex justify-center items-center">
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.text }}
                            className="text-base font-semibold -mb-1 flex justify-center"
                          >
                            {jobOffer.name}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm flex justify-center"
                          >
                            En {user.city}
                          </Text>
                        </View>
                      </View>
                    </Link>
                  ))}
                </ScrollView>
              ) : (
                <View>
                  <Text style={{ color: colors.text }} className="text-base">
                    No ofrece servicios
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View>
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
            Mascotas
          </Text>

          {userActive ? (
            <View className="">
              {petsUsers?.length >= 1 ? (
                <View className="flex flex-row gap-x-4 justify-center flex-wrap">
                  {petsUsers.map(pet => (
                    <View key={pet.id} className="flex flex-row">
                      <View className="w-36 pt-3 mt-3 relative shadow-sm rounded-lg overflow-hidden bg-white/10">
                        <Image
                          style={{
                            resizeMode: "contain"
                          }}
                          className="h-24"
                          source={{
                            uri:
                              pet.petTypeId === 1
                                ? "https://cdn-icons-png.flaticon.com/128/1998/1998627.png"
                                : pet.petTypeId === 2
                                ? "https://cdn-icons-png.flaticon.com/128/1998/1998592.png"
                                : pet.petTypeId === 3
                                ? "https://cdn-icons-png.flaticon.com/128/874/874960.png"
                                : pet.petTypeId === 4
                                ? "https://cdn-icons-png.flaticon.com/128/404/404013.png"
                                : pet.petTypeId === 5
                                ? "https://cdn-icons-png.flaticon.com/128/6807/6807896.png"
                                : "https://img.freepik.com/vector-gratis/coleccion-diferentes-caras-perros_1096-37.jpg"
                          }}
                        />

                        <View className="p-2 gap-y-1 flex justify-center items-center">
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.text }}
                            className="text-base font-semibold -mb-1 flex justify-center"
                          >
                            {pet.name}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm flex justify-center"
                          >
                            {pet.breed}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View className="">
                    <Pressable onPress={() => navigation.navigate({ name: "FormAddPet" })}>
                      <View className="w-36 h-44 mt-3 shadow-sm rounded-lg bg-white/10 flex items-center justify-center">
                        <View className="flex justify-center items-center">
                          <Ionicons
                            size={70}
                            name="add-circle-outline"
                            color={colors.text}
                          ></Ionicons>
                        </View>

                        <View className="pb-3 flex justify-center items-center flex-wrap">
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.text }}
                            className="text-base font-semibold -mb-1 flex justify-center"
                          >
                            Agregar mascota
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm flex justify-center pt-1"
                          >
                            Toca aqui
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View className="">
                  <View>
                    <Text style={{ color: colors.text }} className="text-base">
                      No tiene mascotas
                    </Text>
                  </View>
                  <View className="flex justify-center items-center mt-4">
                    <Pressable onPress={() => navigation.navigate({ name: "FormAddPet" })}>
                      <View className="w-36 h-44 shadow-sm rounded-lg bg-white/10 flex items-center justify-center">
                        <View className="flex justify-center items-center">
                          <Ionicons
                            size={70}
                            name="add-circle-outline"
                            color={colors.text}
                          ></Ionicons>
                        </View>

                        <View className="pb-3 flex justify-center items-center flex-wrap">
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.text }}
                            className="text-base font-semibold -mb-1 flex justify-center"
                          >
                            Agregar mascota
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm flex justify-center pt-1"
                          >
                            Toca aqui
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View className="">
              {petsUsersSearch?.length >= 1 ? (
                <View className="flex flex-row gap-x-4 justify-center flex-wrap">
                  {petsUsersSearch.map(pet => (
                    <View key={pet.id} className="flex flex-row">
                      <View className="w-36 pt-3 mt-3 relative shadow-sm rounded-lg overflow-hidden bg-white/10">
                        <Image
                          style={{
                            resizeMode: "contain"
                          }}
                          className="h-24"
                          source={{
                            uri:
                              pet.petTypeId === 1
                                ? "https://cdn-icons-png.flaticon.com/128/1998/1998627.png"
                                : pet.petTypeId === 2
                                ? "https://cdn-icons-png.flaticon.com/128/1998/1998592.png"
                                : pet.petTypeId === 3
                                ? "https://cdn-icons-png.flaticon.com/128/874/874960.png"
                                : pet.petTypeId === 4
                                ? "https://cdn-icons-png.flaticon.com/128/404/404013.png"
                                : pet.petTypeId === 5
                                ? "https://cdn-icons-png.flaticon.com/128/6807/6807896.png"
                                : "https://img.freepik.com/vector-gratis/coleccion-diferentes-caras-perros_1096-37.jpg"
                          }}
                        />

                        <View className="p-2 gap-y-1 flex justify-center items-center">
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.text }}
                            className="text-base font-semibold -mb-1 flex justify-center"
                          >
                            {pet.name}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm flex justify-center"
                          >
                            {pet.breed}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="">
                  <View>
                    <Text style={{ color: colors.text }} className="text-base">
                      No tiene mascotas
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        <View>
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
            Reseñas
          </Text>

          {user.offers_services ? (
            userActive ? (
              reviewsUserSearch.reviews?.length > 0 ? (
                reviewsUserSearch.reviews?.map(r => (
                  <View className="shadow-sm py-3 px-4 rounded-lg bg-white/10 mt-2">
                    <View className="flex flex-row items-center gap-x-6">
                      <View className="">
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: "contain"
                          }}
                          className="rounded-full"
                          source={{
                            uri: "https://p16-tiktok-va-h2.ibyteimg.com/img/musically-maliva-obj/1665843987269638~c5_720x720.jpeg"
                          }}
                        />
                      </View>
                      <View className="flex flex-col gap-y-1">
                        <View>
                          <Text style={{ color: colors.text }} className="text-base font-medium">
                            Pepito
                          </Text>
                        </View>
                        <View>
                          <Text
                            numberOfLines={1}
                            style={{ color: colors.textGray }}
                            className="text-sm"
                          >
                            De San Juan
                          </Text>
                        </View>
                        <View className="">
                          <Text style={{ color: colors.text }} className="text-sm">
                            {r.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text>No hay reseñas en usuario propio</Text>
              )
            ) : reviewsUser.reviews?.length > 0 ? (
              reviewsUser.reviews?.map(r => (
                <View className="shadow-sm py-3 px-4 rounded-lg bg-white/10 mt-2">
                  <View className="flex flex-row items-center gap-x-6">
                    <View className="">
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain"
                        }}
                        className="rounded-full"
                        source={{
                          uri: "https://p16-tiktok-va-h2.ibyteimg.com/img/musically-maliva-obj/1665843987269638~c5_720x720.jpeg"
                        }}
                      />
                    </View>
                    <View className="flex flex-col gap-y-1">
                      <View>
                        <Text style={{ color: colors.text }} className="text-base font-medium">
                          Pepito
                        </Text>
                      </View>
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{ color: colors.textGray }}
                          className="text-sm"
                        >
                          De San Juan
                        </Text>
                      </View>
                      <View className="">
                        <Text style={{ color: colors.text }} className="text-sm">
                          {r.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View className="">
                <View>
                  <Text style={{ color: colors.text }} className="text-base">
                    No tiene mascotas
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {user.offers_services ? (
        <View className="mb-40">
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
            Reseñas
          </Text>

          {reviewsUser?.length ? (
            <View className="shadow-sm py-3 px-4 rounded-lg bg-white/10 mt-2 mb-10">
              <View className="flex flex-row items-center gap-x-6">
                <View className="">
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain"
                    }}
                    className="rounded-full"
                    source={{
                      uri: "https://p16-tiktok-va-h2.ibyteimg.com/img/musically-maliva-obj/1665843987269638~c5_720x720.jpeg"
                    }}
                  />
                </View>
                <View className="flex flex-col gap-y-1">
                  <View>
                    <Text style={{ color: colors.text }} className="text-base font-medium">
                      Pepito
                    </Text>
                  </View>
                  <View>
                    <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm">
                      De San Juan
                    </Text>
                  </View>
                  <View className="">
                    <Text style={{ color: colors.text }} className="text-sm">
                      Muy bueno el compromiso
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No hay reseñas en usuario normal</Text>
            )
          ) : (
            <Text>No ofrece servicios</Text>
          )}
        </View>

        {userActive ? (
          <View className="flex justify-center items-center">
            <TouchableOpacity
              onPress={handleLogOut}
              className="bg-violet-700 py-2.5 px-4 rounded-lg mt-10"
            >
              <Text className="text-xl text-white font-bold">Cerrar sesion</Text>
            </TouchableOpacity>
          </View>
        ) : undefined}
      </ScrollView>
    </ScrollView>
  );
};

export default UserProfile;
