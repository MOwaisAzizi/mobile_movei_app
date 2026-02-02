import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center bg-dark-900"
    >
      <Text className="text-5x text-dark-200">Welcome</Text>
      <Link href="/onboarding">CLick to Onboarding</Link>
    </View>
  );
}
