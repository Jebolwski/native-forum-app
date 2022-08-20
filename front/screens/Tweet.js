import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tweet = ({ navigation: { goBack } }) => {
  return (
    <View className="m-0 p-0 h-full bg-white">
      <View className="flex-row p-3 border-b border-b-slate-400">
        <TouchableWithoutFeedback
          onPress={() => {
            goBack();
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <AntDesign name="arrowleft" size={26} className="font-bold" />
        </TouchableWithoutFeedback>
        <View
          style={{ display: "flex", justifyContent: "center" }}
          className="ml-5"
        >
          <Text className="text-xl">Tweet</Text>
        </View>
      </View>
    </View>
  );
};

export default Tweet;
