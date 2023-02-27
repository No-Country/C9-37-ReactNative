import { Text, View, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Highlights from "../components/Highlights";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { sortUsersByRating } from "../redux/actions";
import { useEffect } from "react";

const Search = () => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const sortedUsersByRating = useSelector(state => state.users.search);

  useEffect(() => {
    dispatch(sortUsersByRating());
  }, []);

  return (
    <ScrollView>
      <View className="w-full">
        <SearchBar></SearchBar>
        <Text style={{ color: colors.text }} className="font-bold text-2xl mt-4 mb-3 text-center">
          Los más destacados
        </Text>
        <Highlights data={sortedUsersByRating} />
      </View>
    </ScrollView>
  );
};

export default Search;
