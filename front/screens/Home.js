import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";

const Home = () => {
  let { user } = useContext(AuthContext);
  return (
    <SafeAreaView className="w-full h-full mt-12 bg-slate-300">
      <View className="h-14 shadow-sm bg-white mt-6">
        <Text className="text-lg h-12 mt-3 border-spacing-1 text-center ">
          Hello, {user.username}!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
