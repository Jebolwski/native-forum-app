import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { useContext } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import AuthContext from "../AuthContext";

const Tweet = ({ navigation, route }) => {
  let form = route.params.form;
  let { urlBase } = useContext(AuthContext);
  return (
    <View className="m-0 p-0 h-full bg-white">
      <View className="flex-row p-3 border-b border-gray-400">
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
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
      <View className="p-3 flex-row">
        <View className="flex justify-center">
          <Image
            source={{
              uri: `http://${urlBase}/api${form.profileObj.profile_pic}`,
            }}
            className="h-9 w-9 border rounded-full"
          />
        </View>
        <View className="ml-5">
          <Text className="font-bold text-lg">{form.username}</Text>
          <Text className="text-gray-700 font-light">
            @{form.username.toLowerCase()}
          </Text>
        </View>
      </View>
      <View className="p-3 pb-1 border-b border-gray-600">
        <Text className="text-xl">{form.body}</Text>
        <View className="py-3">
          <Text>{form.create}</Text>
        </View>
      </View>
      <View className="flex-row justify-around py-3 border-b border-gray-600">
        <View className="flex-row">
          <Text className="font-extrabold">126</Text>
          <Text className="ml-2">Retweet</Text>
        </View>
        <View className="flex-row">
          <Text className="font-extrabold">10</Text>
          <Text className="ml-2">Quote Tweets</Text>
        </View>
        <View className="flex-row">
          <Text className="font-extrabold">1.902</Text>
          <Text className="ml-2">Likes</Text>
        </View>
      </View>
    </View>
  );
};

export default Tweet;
