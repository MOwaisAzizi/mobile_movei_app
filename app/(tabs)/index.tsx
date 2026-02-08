import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-orange-400">
      {/* Background image */}
      <Image
        source={images.bg}
        className="w-full absolute z-0"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        className="flex-1 px-5"
      >
        {/* Logo */}
        <Image
          source={images.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />
      </ScrollView>
    </View>
  );
}
