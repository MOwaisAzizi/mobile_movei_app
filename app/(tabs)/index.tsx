import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Search } from "./search";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
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
          />


        {/* Search */}
        <View className="mt-5 border border-gray-300 rounded-2xl bg-white shadow-md px-3">
          <Search
            placeholder="search..."
            onPress={() => router.push("/searchBar")}
          />
        </View>

        {/* Loading / Error */}
        { moviesLoading
 && (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            className="mt-10"
          />
        )}

        {error && !moviesLoading && (
          <Text className="text-white text-center mt-10">
            Error: {error.message}
          </Text>
        )}

        {/* Example: Render Movies Count */}
 {!moviesLoading && !error && movies && (
  <>
    <Text className="text-white text-center mt-10">
      Movies Loaded: {movies.length}
    </Text>

    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <><Text className="text-white">
          {item.title}
        </Text><view>
            <Image source={icons.star} />
            <Text>
              {Math.round(item.vote_average)}
            </Text>
          </view><view>
            <text>{item.release_date.split('-')[0]}</text>
          </view></>
      )}
      
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingRight: 10,
      }}
      keyExtractor={(item) => item.id.toString()}
      className="mt-2 mb-3"
    />
  </>
)}

      </ScrollView>
    </View>
  );
}
