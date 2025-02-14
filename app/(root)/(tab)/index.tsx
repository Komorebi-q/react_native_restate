import { Card, FeatureCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties
    });
  const {
    data: properties,
    loading: propertiesLoading,
    refetch: refetchProperties
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true
  });

  console.log("data", latestProperties, properties);

  useEffect(() => {
    refetchProperties({
      filter: params.filter!,
      query: params.query!,
      limit: 6
    });
  }, [params.query, params.filter]);

  function handleCardPress(id: string) {
    router.push(`/properties/${id}`);
  }

  return (
    <SafeAreaView className="h-full bg-white ">
      <Button title="Seed" onPress={seed} />
      <FlatList
        className="h-10"
        data={properties}
        renderItem={({ item }) => {
          return (
            <Card
              item={item}
              onPress={() => {
                handleCardPress(item.$id);
              }}
            />
          );
        }}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                className="flex flex-row items-center"
                onPress={() => {
                  router.push("/profile");
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start justify-center ml-2">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                className="mt-5"
                data={latestProperties}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                  <FeatureCard
                    item={item}
                    onPress={() => {
                      handleCardPress(item.$id);
                    }}
                  />
                )}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5"
              />
            </View>

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
