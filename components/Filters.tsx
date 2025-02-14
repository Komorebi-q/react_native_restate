import { categories } from "@/constants/data";
import clsx from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          className={clsx(
            "flex flex-col items-start mr-4 px-4 py-2 rounded-full",
            selectedCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-200"
          )}
          onPress={() => handleCategory(item.category)}
        >
          <Text
            className={clsx(
              "text-sm",
              selectedCategory === item.category
                ? "text-white font-rubik-bold"
                : "text-primary-300 font-rubik"
            )}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
