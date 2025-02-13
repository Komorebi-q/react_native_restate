import icons from "@/constants/icons";
import clsx from "clsx";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View className="flex-1 mt-3 flex-col items-center justify-center gap-1">
      <Image
        source={icon}
        className="size-6"
        tintColor={focused ? "#0061ff" : "#666876"}
        resizeMode="contain"
      />
      <Text
        className={clsx(
          focused ? "text-primary-300 font-rubik" : "text-black-200 font-rubik",
          "text-xs w-full text-center"
        )}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          )
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
