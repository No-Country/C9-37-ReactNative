import { View, TextInput, Modal } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { SearchIcon } from "../components/Icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchView } from "../redux/actions";
import Filter from "./Filter";

const SearchBar = () => {
  const { colors } = useTheme();

  const [openFilter, setOpenFilter] = useState(false);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleInput = () => {
    dispatch(searchView({ search: input }));
  };

  return (
    <View className="flex flex-row justify-center items-center pt-3 pl-2 pr-20 w-full">
      <View className="w-10 md:w-0">

      </View>
      <View className="left-12">
        <SearchIcon color={colors.text}></SearchIcon>
      </View>
      <TextInput
        style={{ color: colors.text, borderColor: colors.text }}
        className="rounded-lg p-3 pl-14 border w-full"
        placeholder="Buscar en MascotApp"
        onChange={e => setInput(e.nativeEvent.text)}
        onSubmitEditing={handleInput}
        keyboardType="web-search"
        placeholderTextColor={colors.textGray}
      ></TextInput>

      <View className="pl-4">
        <Ionicons
          onPress={() => setOpenFilter(!openFilter)}
          size={32}
          name="options-outline"
          color={colors.text}
        ></Ionicons>
      </View>

      <Modal animationType="slide" transparent={true} visible={openFilter}>
        <Filter
          currentSearch={{ search: input }}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
        ></Filter>
      </Modal>
    </View>
  );
};

export default SearchBar;
