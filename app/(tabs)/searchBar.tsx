import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row">
      <Image
        source={icons.search}
        resizeMode="contain"
        tintColor="#ab8bff"
        className="size-5"
      />

      <TextInput
        placeholder={placeholder}
        className="ml-2 text-white flex-1"
        onFocus={onPress}
      />
    </View>
  );
};

export default SearchBar;
