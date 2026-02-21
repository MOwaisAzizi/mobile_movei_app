import { MovieCard } from "@/components/movieCard";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TextInput, View, Text, Image } from "react-native";

export const Search = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

useEffect(() => {
  const timer = setTimeout(() => {
    if (searchQuery.trim().length > 0) {
      loadMovies();
    } else {
      reset();
    }
  }, 500);

  return () => clearTimeout(timer);
}, [searchQuery]);


  return (
    <View className="flex-1 bg-primary px-4">
      
      <View className="w-full flex-row justify-center mt-16 items-center">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>

      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="bg-white/10 text-white px-4 py-3 rounded-full mt-6"
      />

      <FlatList
        data={movies || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="w-full mt-10 justify-center items-center">
              <Text className="text-gray-400 text-center">
                {searchQuery.length > 0
                  ? "No movies found"
                  : "Search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
