import { Text, Image, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

export const MovieCard = ({
  title,
  poster_path,
  id,
  vote_average,
  release_date,
}: Movie) => {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : undefined;

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-32 bg-transparent">
        {posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            className="w-32 h-48 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-32 h-48 rounded-lg bg-gray-700 items-center justify-center">
            <Text className="text-white text-center px-2">{title}</Text>
          </View>
        )}

        <Text className="text-white mt-2 text-sm" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-yellow-300 text-xs">★ {vote_average?.toFixed(1)}</Text>
          <Text className="text-gray-400 text-xs ml-2">{release_date?.slice(0,4)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
