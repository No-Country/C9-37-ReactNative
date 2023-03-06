import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useTheme } from "@react-navigation/native";
import {
  fetchJobOffersUser,
  fetchRequestInfoUserId,
  fetchRequestsUser,
  fetchJobOffersRequestUser
} from "../redux/actions";

const ServicesContracted = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.users);
  const { requestsUser } = useSelector(state => state.users);
  const { userContracted } = useSelector(state => state.users);
  const { userContractedJobOffers } = useSelector(state => state.users);

  // console.log(requestsUser);
  // console.log(userContracted);

  useEffect(() => {
    dispatch(fetchRequestsUser({ currentUser }));
    dispatch(fetchRequestInfoUserId(requestsUser[0]?.hired_user_id));
    dispatch(fetchJobOffersRequestUser(requestsUser[0]?.hired_user_id));
  }, []);

  return userContracted?.length >= 1 ? (
    <View className="shadow-sm py-3 px-4 rounded-lg bg-white/10 mt-2 mb-10">
      <Link
        to={{
          screen: "Service",
          params: {
            jobOffer: userContractedJobOffers ? userContractedJobOffers[0] : undefined,
            user: userContracted,
            userContracted: true
          }
        }}
      >
        <View className="flex flex-row items-center gap-x-6">
          <View className="">
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: "contain"
              }}
              className="rounded-full"
              source={{
                uri: userContracted?.profile_pic
              }}
            />
          </View>
          <View className="flex flex-col gap-y-1">
            <View>
              <Text style={{ color: colors.text }} className="text-base font-medium">
                {userContractedJobOffers[0]?.name}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm">
                De {userContracted?.name} {userContracted?.surname}
              </Text>
            </View>
            <View className="">
              <Text style={{ color: colors.text }} className="text-sm">
                ${userContractedJobOffers[0]?.price}
              </Text>
            </View>
          </View>
        </View>
      </Link>
    </View>
  ) : (
    <View className="py-3 px-4">
      <Text className="text-lg">No contrataste ningun servicio</Text>
    </View>
  );
};

export default ServicesContracted;