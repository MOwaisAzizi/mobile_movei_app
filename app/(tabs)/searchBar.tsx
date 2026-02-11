import { icons } from "@/constants/icons";
import React, { useState } from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  const [iconError, setIconError] = useState(false);

  return (
    <View className="flex-row items-center bg-white/10 rounded-full px-3 py-2 flex-1">
      {!iconError && icons.search ? (
        <Image
          source={icons.search}
          resizeMode="contain"
          onError={() => setIconError(true)}
          style={{ tintColor: "#ab8bff" }}
          className="w-5 h-5"
        />
      ) : (
        <View className="w-5 h-5 rounded bg-gray-400" />
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.8)"
        className="ml-3 text-white flex-1"
        onFocus={onPress}
      />
    </View>
  );
};

export default SearchBar;
