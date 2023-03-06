import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useTheme, Link } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobOffersUser } from "../redux/actions";

const ServicesProvided = () => {
  const colorScheme = "light";
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.users);
  const { jobOffersUser } = useSelector(state => state.users);
  const user = currentUser?.data;

  useEffect(() => {
    dispatch(fetchJobOffersUser({ currentUser }));
  }, []);

  return (
    <ScrollView>
      <View style={{ color: colors.text, borderColor: colors.text }}>
        {jobOffersUser?.length >= 1 ? (
          <View className="w-max-[120px] flex flex-row flex-wrap justify-center gap-x-4 gap-y-5 py-6">
            {jobOffersUser.map(jobOffer => (
              <Link
                key={jobOffer.id}
                to={{
                  screen: "Service",
                  params: { jobOffer: jobOffer, user: user, ownUser: true }
                }}
              >
                <View key={jobOffer.id} className="w-36 shadow-sm rounded-lg bg-white/10 mt-3">
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
          </View>
        ) : (
          <View className="py-3 px-4">
            <Text className="text-lg" style={{ color: colors.text, borderColor: colors.text }}>
              No ofreces servicios
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ServicesProvided;
