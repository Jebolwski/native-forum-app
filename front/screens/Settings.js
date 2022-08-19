import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";

const Settings = ({ navigation: { goBack } }) => {
  return (
    <View className=" h-full">
      <View className="p-3">
        <TouchableWithoutFeedback
          onPress={() => {
            goBack();
          }}
        >
          <View className="p-3">
            <View className=" bg-slate-200 w-7 h-7 border rounded-full flex justify-center">
              <Icon name="chevron-left" size={26} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Text className="text-center">Settings</Text>
    </View>
  );
};

export default Settings;
