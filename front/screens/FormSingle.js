import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../colors/colors";

const FormSingle = (props) => {
  return (
    <View className="items-center w-full">
      <View className="p-2 w-3/4 bg-gray-200 border-2 rounded-md border-gray-600 shadow-md mt-4 ">
        <Text>{props.form.username}</Text>
        <Text className="mt-2">{props.form.body}</Text>
        <View className="flex-row justify-around mt-4 mb-1">
          <Icon name="comment" color={colors.dark_button} />
          <Icon name="retweet" color={colors.dark_button} />
          <Icon name="heart" color={colors.dark_button} />
        </View>
      </View>
    </View>
  );
};

export default FormSingle;
