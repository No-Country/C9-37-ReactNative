import { Text, View, TouchableOpacity } from "react-native";
import SearchBarFilter from "./SearchBarFilter";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const Filter = ({ openFilter, setOpenFilter }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{ color: colors.text, backgroundColor: colors.background }}
      className=" h-full py-4"
    >
      <View className="pl-4">
        <Ionicons
          style={{ color: colors.text }}
          onPress={() => setOpenFilter(!openFilter)}
          size={32}
          name="md-close-sharp"
        ></Ionicons>
      </View>
      <Text
        style={{ color: colors.text }}
        className="flex w-full text-2xl px-36 items-center font-bold"
      >
        Filtros
      </Text>
      <Text style={{ color: colors.text }} className="text-lg font-medium p-4">
        Servicios
      </Text>
      <View className="flex flex-row flex-wrap pl-4 gap-5 justify-center items-center">
        <TouchableOpacity className="flex w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Corte de pelo</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Paseador</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Transporte</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Cuidado</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-40 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Entretenimiento</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: colors.text }} className="text-lg font-medium p-4 pt-5">
        Buscar Ciudad
      </Text>
      <View className="pl-4">
        <SearchBarFilter></SearchBarFilter>
      </View>

      <View className="flex flex-row justify-center items-center py-20 gap-5">
        <TouchableOpacity
          style={{ borderColor: colors.text }}
          className="flex justify-center items-center w-28 border rounded-md px-5 py-1"
        >
          <Text style={{ color: colors.text }} className="text-lg">
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex justify-center items-center w-28 border rounded-md px-5 py-1 bg-purple-600">
          <Text className="text-lg text-white">Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;
