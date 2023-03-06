import { View, Text, ScrollView, Image, Linking } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const BlogPost = ({ route }) => {
  const blog = route.params.blog;

  const { colors } = useTheme();

  return (
    <ScrollView className="relative">
      <View className="flex justify-center items-center p-5 gap-y-4">
        <Text style={{ color: colors.text }} className="text-xl text-center font-bold">
          {blog.title}
        </Text>
        <Image
          className="w-full rounded-lg"
          style={{
            height: 200,
            resizeMode: "contain"
          }}
          source={{
            uri: blog.image
          }}
        />
        <Text
          className="bg-violet-700 text-white text-xl p-3 font-bold rounded-lg"
          onPress={() => Linking.openURL(blog.link)}
        >
          Ver Blog
        </Text>
      </View>
    </ScrollView>
  );
};

export default BlogPost;
