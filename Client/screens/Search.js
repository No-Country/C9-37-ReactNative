import { Text, View, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Highlights from "../components/Highlights";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sortUsersByRating } from "../redux/actions";
import { useEffect } from "react";

const Search = () => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const sortedUsersByRating = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(sortUsersByRating());
  }, []);

  return (
    <ScrollView>
      <View className="p-2">
        <SearchBar></SearchBar>
        <View className="mt-3">
          <Text style={{ color: colors.text }} className="font-bold text-2xl mb-2 pl-3">
            Los más destacados
          </Text>
          <Highlights data={sortedUsersByRating} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
