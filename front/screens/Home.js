import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-navigation";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="border-black h-7 w-40 shadow-sm">
        <Text className="text-red-500 h-12 mt-3 border-spacing-1 border-black">
          Home
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
