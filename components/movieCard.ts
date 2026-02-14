import { Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export const MovieCard = ({
  title,
  poster_path,
  id,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="movie-card">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white mt-2">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};
