import { MovieCard } from "@/components/movieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { Search } from "./search";

export default function Index() {
  const {
    data: movies,
    loading: moviesLoading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-neutral-900">
      {/* <Image
        source={images.bg}
        resizeMode="cover"
       className="absolute inset-0 w-full h-full border"      /> */}

      <View className="flex-1 px-5">
        <View className="mb-4">
          <Search placeholder="Search movies..." />
        </View>

        {moviesLoading && (
          <ActivityIndicator size="large" color="#a78bfa" className="mt-6" />
        )}

        {error && !moviesLoading && (
          <Text className="text-red-400 mt-6 text-center">
            Error: {error.message}
          </Text>
        )}

        {!moviesLoading && movies && (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 12,
            }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
          />
        )}
      </View>

    </View>
  );
}
