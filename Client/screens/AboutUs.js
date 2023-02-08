import { Image, ScrollView, Text, useColorScheme, View } from "react-native";

const AboutUs = () => {
  return (
    <ScrollView>
      <View className=" flex-column  align-center px-6">
        <Text className="dark:text-white text-4xl font-bold my-8">Sobre Nosotros</Text>
        <View className="w-full my-6 ">
          <Image
            source={require("../assets/about-us.png")}
            className="ml-auto mr-auto w-[200px] h-[300px]"
          />
        </View>
        <View>
          <Text className="text-sm dark:text-white text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia vitae tempora
            aspernatur nobis explicabo fuga rerum esse et voluptatibus, quam dolorum animi facere
            amet voluptatum earum delectus blanditiis repudiandae! Ipsa, accusamus culpa impedit
            perspiciatis autem ea accusantium voluptate nesciunt? Veniam, quas, provident omnis
            obcaecati dolor illo voluptate tempora porro unde exercitationem quasi corrupti at quod
            distinctio saepe voluptas odit. Nemo, quasi? Facilis, molestias. Odio molestias rem
            exercitationem hic nesciunt suscipit blanditiis adipisci doloremque aliquid modi,
            laudantium vel expedita delectus ducimus id tempora corporis ab repudiandae esse
            accusamus quas magnam. Sunt tenetur nihil beatae saepe laboriosam quaerat iure incidunt!
            Aliquam alias dolores saepe ab tempora aliquid magni obcaecati maxime cupiditate aut.
            Quisquam labore delectus ducimus totam possimus fugiat saepe expedita? Dignissimos ex
            expedita officiis odio numquam id.
            {"\n"}
            {"\n"}
            Eius iusto, illum, eum quibusdam voluptatibus explicabo incidunt eveniet quasi dolorum
            ut doloremque autem iste voluptate vel nam? Fugiat natus fugit architecto possimus? In
            a, nulla laudantium tenetur error, aliquid adipisci dolores reprehenderit nesciunt sint
            maiores fugiat aspernatur, expedita veniam quod dolore dolor asperiores accusamus vero?
            Expedita ipsum laudantium doloremque, sapiente cupiditate omnis? Accusantium ducimus at,
            rem velit in aliquid, molestiae ut amet eaque odit nam quia repellat id laboriosam
            similique maxime deleniti doloremque quibusdam iusto accusamus ex, fugiat doloribus.
            {"\n"}
            {"\n"}
            Ipsum, a corporis? Labore doloribus ea facere harum corporis tempora aliquid itaque, eos
            eum provident esse inventore architecto maiores. Commodi ipsa assumenda perspiciatis hic
            nostrum accusamus est provident, amet distinctio facere labore autem. Sed voluptas
            optio, non quisquam facilis fuga mollitia quis qui adipisci ipsam dignissimos illo
            aliquam, libero ea itaque possimus saepe. Debitis deserunt, architecto in necessitatibus
            dicta saepe. Eveniet, quas adipisci. Molestiae quas ab ipsa veritatis maxime obcaecati,
            omnis rem odio saepe. Repellat facilis saepe enim esse, dolorem officiis! Vero
            asperiores quae voluptatum quia magnam architecto soluta iste dolorem! A, iste?{"\n"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
