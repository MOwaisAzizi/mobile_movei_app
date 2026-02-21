import { icons } from "@/constants/icons";
import { fetchMovieDetials } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter, useSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Details = () => {
  const params = useSearchParams();
  const router = useRouter();
  const movieId = params.id as string | undefined;

  const {
    data: movie,
    loading,
    refetch,
  } = useFetch<MovieDetails>(() => fetchMovieDetials(movieId ?? ""), !!movieId);

  useEffect(() => {
    if (movieId) refetch();
  }, [movieId, refetch]);

  if (loading || !movie) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-900">
        <Text className="text-gray-300">Loading...</Text>
      </View>
    );
  }

  const poster = movie.poster_path || movie.backdrop_path;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const runtime = movie.runtime ? `${movie.runtime}m` : "";
  const genres = movie.genres?.map((g) => g.name).join(" - ");

  const formatMoney = (value: number) => {
    if (!value) return "$0";
    return `$${(value / 1000000).toFixed(0)}M`;
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        {poster ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w780${poster}` }}
            className="w-full h-96"
            resizeMode="cover"
          />
        ) : null}

        <View className="-mt-12 rounded-t-3xl bg-[#0b0f1a] p-6">
          <Text className="text-white text-2xl font-bold mb-1">
            {movie.title}
          </Text>
          <View className="flex-row items-center mb-3">
            <Text className="text-gray-400 mr-3">
              {year} {runtime ? " • " + runtime : ""}
            </Text>
            <View className="flex-row items-center bg-neutral-800 px-3 py-1 rounded-full">
              <Image source={icons.star} className="w-4 h-4 mr-2" />
              <Text className="text-yellow-300">
                {movie.vote_average?.toFixed(1)}
              </Text>
              <Text className="text-gray-400 ml-2">
                ({movie.vote_count} votes)
              </Text>
            </View>
          </View>

          <Text className="text-gray-300 font-semibold mb-2">Overview</Text>
          <Text className="text-gray-400 mb-4">
            {movie.overview || "No overview available."}
          </Text>

          <Text className="text-gray-300 font-semibold mb-2">Genres</Text>
          <Text className="text-gray-400 mb-4">{genres || "—"}</Text>

          <View className="flex-row justify-between mb-6">
            <View>
              <Text className="text-gray-400">Budget</Text>
              <Text className="text-white mt-1">
                {formatMoney(movie.budget)}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400">Revenue</Text>
              <Text className="text-white mt-1">
                {formatMoney(movie.revenue)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            className="bg-violet-300 rounded-xl p-4 items-center"
          >
            <Text className="text-black font-semibold">← Go back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;
