import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwirte";
import { useGlobalContext } from "@/lib/global-provider";
import clsx from "clsx";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true
}: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex flex-row items-center justify-between gap-2 py-4">
        <View className="flex flex-row items-center gap-3">
          <Image source={icon} className="size-6" />
          <Text
            className={clsx(
              "font-rubik text-lg-medium text-black-300",
              textStyle
            )}
          >
            {title}
          </Text>
        </View>

        {showArrow && <Image source={icons.rightArrow} className="size-5" />}
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { refetch, user } = useGlobalContext();
  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      refetch();
      Alert.alert("Success", "Logout Successful");
    } else {
      Alert.alert("Error", "Logout Failed");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row gap-1 items-center justify-between mt-5 ">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-5">
          {settings.slice(0, 2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="logout"
            textStyle="text-danger font-rubik-bold"
            onPress={() => {
              Alert.alert("Logout", "Are you sure you want to logout?", [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "Logout",
                  onPress: handleLogout,
                  style: "destructive"
                }
              ]);
            }}
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
