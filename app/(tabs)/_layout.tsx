import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ title, focused, icon }) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex-row min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary font-semibold text-base ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="justify-center items-center mt-4">
      <Image source={icon} tintColor="#A8A8A8" className="size-5" />
    </View>
  );
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginTop: 10,
          marginBottom: 30,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Saved" icon={icons.saved} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
}
