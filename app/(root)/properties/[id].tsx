import { useLocalSearchParams } from "expo-router";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProps {}

const Property: FC<IProps> = (props) => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Property {id}</Text>
    </View>
  );
};

export default Property;
