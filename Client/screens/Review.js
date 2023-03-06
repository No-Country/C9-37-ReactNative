import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert
} from "react-native";
import React, { Children, useRef } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPetTypes } from "../redux/actions";
import { Ionicons } from "@expo/vector-icons";
import { addReview } from "../redux/actions";

const Review = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [stars, setStars] = useState(0);
  // const [description, setDescription] = useState("");

  const { user, currentUser } = route.params;

  const [formData, setFormData] = useState({
    reviewer_user_id: user.id,
    description: "",
    stars: 0,
    userId: currentUser.data.id
  });

  const [errors, setErrors] = useState(undefined);

  const [valid, setValid] = useState({
    stars: false
  });

  const handleDescription = event => {
    setFormData({ ...formData, description: event.nativeEvent?.text });
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleValidation = async () => {
    Keyboard.dismiss();

    if (!formData.stars) {
      handleError("Por favor, seleccione un tipo de mascota", "stars");
      setValid({
        ...valid,
        stars: false
      });
    }

    if (valid.stars) {
      try {
        const response = await dispatch(addReview(formData));

        if (response) {
          Alert.alert("Calificación exitosa", "Gracias por dejar tu opinión", [{ text: "OK" }]);
          navigation.navigate("Home");
        }
      } catch (error) {
        Alert.alert("Algo ha salido mal", "Por favor intentelo nuevamente", [{ text: "OK" }]);
        navigation.goBack();
      }
    }
  };
  return (
    <ScrollView>
      <View>
        <View className="p-5 gap-y-5">
          <Text style={{ color: colors.text }} className="text-lg font-bold -mb-3">
            Cantidad de estrellas
          </Text>

          <View className="flex flex-row gap-x-1">
            {Children.toArray(
              Array.from(Array(5)).map((e, index) => (
                <Ionicons
                  onPress={() => {
                    setFormData({ ...formData, stars: index + 1 }),
                      setValid({
                        ...valid,
                        stars: true
                      });
                  }}
                  name={formData.stars <= index ? "star-outline" : "star"}
                  color={formData.stars <= index ? colors.text : "#fff133"}
                  size={25}
                />
              ))
            )}
          </View>
          {errors ? (
            <Text className="text-red-600">La calificación es obligatoria.</Text>
          ) : undefined}

          <Text style={{ color: colors.text }} className="text-lg font-bold -mb-3">
            Comentario (opcional)
          </Text>
          <View
            style={{ color: colors.text, borderColor: colors.text }}
            className="border rounded-lg"
          >
            <TextInput
              className="px-2"
              style={{ color: colors.text, borderColor: colors.text }}
              editable
              multiline={true}
              numberOfLines={4}
              onChange={event => handleDescription(event)}
            />
          </View>
        </View>

        <View className="px-5">
          <TouchableOpacity
            className="flex justify-center items-center bg-violet-700 py-2 rounded-lg mb-6"
            onPress={handleValidation}
          >
            <Text className="text-lg text-white font-medium">Calificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Review;
