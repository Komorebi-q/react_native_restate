import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeatureCard = ({ item, onPress }: Props) => {
  console.log("image", item.image);
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300">
          {item.rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5 gap-.5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {item.type}
        </Text>
        <Text className="text-base font-rubik-light text-white">
          22 W 15th, New York
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl text-white font-rubik-extrabold">
            {`$${Number(item.price).toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}`}
          </Text>

          <Image source={icons.heart} className="size-6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center gap-0.5 bg-white px-2 py-1 rounded-full absolute top-5 right-5 z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300">
          {item.rating}
        </Text>
      </View>

      <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col items-start mt-2">
        <Text className="text-base font-rubik-extrabold text-black-300">
          {item.address}
        </Text>
        <Text className="text-xs font-rubik text-black-200">
          22 W 15th, New York
        </Text>
        <View className="flex flex-row items-center justify-between mt-2 w-full">
          <Text className="text-base text-primary-300 font-rubik-bold">
            ${Number(item.price).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </Text>

          <Image
            source={icons.heart}
            className="size-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
