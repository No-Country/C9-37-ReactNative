import { Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Children } from "react";
import { Link, useTheme } from "@react-navigation/native";
import LoadingGif from "./LoadingGif";
import { useSelector } from "react-redux";

const Highlights = ({ data }) => {
  const { dark, colors } = useTheme();
  const { currentUser } = useSelector(state => state.users);

  if (!data) return <LoadingGif />;

  return (
    <>
      <ScrollView>
        <View className="flex justify-center flex-wrap gap-2 flex-row py-2">
          {data?.length > 0 ? (
            Children.toArray(
              data.map((card, index) => (
                <Link
                  to={
                    currentUser?.data?.id === card?.id
                      ? { screen: "Perfil" }
                      : {
                          screen: "VisitProfile",
                          params: { user: card, title: card?.name, id: card?.id }
                        }
                  }
                >
                  <View
                    className={
                      "flex-1 flex items-center w-28 border border-black/5 rounded-lg overflow-hidden bg-white/10 pt-3" +
                      (data.length - 1 === index ? "lg:mr-auto" : "")
                    }
                  >
                    {card?.profile_pic ? (
                      <Image
                        style={{
                          height: 100,
                          width: 100,
                          resizeMode: "contain"
                        }}
                        source={{
                          uri: card?.profile_pic
                        }}
                      />
                    ) : (
                      <View className="bg-white">
                        <Ionicons
                          name="person-circle-outline"
                          size={100}
                          style={{ height: 100, width: 100 }}
                        />
                      </View>
                    )}

                    <View className="p-2">
                      <Text
                        numberOfLines={1}
                        style={{ color: colors.textGray }}
                        className="text-sm"
                      >
                        De {card?.city}
                      </Text>

                      {card?.categories?.length > 0 ? (
                        Children.toArray(
                          card?.categories?.map(category =>
                            category.name === "entrenamiento" ? (
                              <Text className="bg-violet-700 text-white font-bold text-center capitalize py-1">
                                {category?.name}
                              </Text>
                            ) : (
                              <Text className="bg-violet-700 text-white font-bold p-1 text-center capitalize">
                                {category?.name}
                              </Text>
                            )
                          )
                        )
                      ) : (
                        <Text className="bg-violet-700 text-white font-bold p-1 text-center capitalize">
                          Usuario
                        </Text>
                      )}

                      <View className="flex flex-row py-2 justify-left items-left gap-x-2">
                        {card?.profile_pic ? (
                          <Image
                            style={{
                              width: 35,
                              height: 35,
                              resizeMode: "contain"
                            }}
                            className="rounded-full"
                            source={{
                              uri: card?.profile_pic
                            }}
                          />
                        ) : (
                          <Ionicons name="person-circle-outline" size={32} color={colors.text} />
                        )}
                        <View>
                          <Text style={{ color: colors.text }}>{card?.name}</Text>
                          <View className="flex flex-row items-center">
                            {Children.toArray(
                              Array.from(Array(card?.rating)).map(star => (
                                <Ionicons name="star" size={10} color="#ffe100" />
                              ))
                            )}
                            <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                              {card?.rating ? "(" + card?.rating + ")" : undefined}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Link>
              ))
            )
          ) : (
            <View className="flex justify-center items-center w-full">
              <Text className="py-3 px-4 text-center font-bold text-2xl text-white bg-violet-600">
                Sin Resultados.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Highlights;
