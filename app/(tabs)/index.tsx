import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "./searchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api"; // ✅ make sure this exists

export default function Index() {
  const router = useRouter();
  const [logoError, setLogoError] = useState(false);

  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-orange-400">
      {/* Background image */}
      <Image
        source={images.bg}
        resizeMode="cover"
        className="absolute inset-0 w-full h-full z-0"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        className="flex-1 px-5"
      >
          <Image
            source={icons.logo}
            className="w-24 h-12 mt-20 mb-5 self-center"
            onError={() => setLogoError(true)}
          />


        {/* Search */}
        <View className="mt-5 border border-gray-300 rounded-2xl bg-white shadow-md px-3">
          <SearchBar
            placeholder="search..."
            onPress={() => router.push("/searchBar")}
          />
        </View>

        {/* Loading / Error */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            className="mt-10"
          />
        )}

        {error && !loading && (
          <Text className="text-white text-center mt-10">
            Error: {error.message}
          </Text>
        )}

        {/* Example: Render Movies Count */}
        {!loading && !error && movies && (
          <Text className="text-white text-center mt-10">
            Movies Loaded: {movies.length}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
