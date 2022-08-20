import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile = ({ navigation: { goBack } }) => {
  let { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();

  BackHandler.addEventListener("hardwareBackPress", function () {
    return false;
  });

  let getProfile = async (props) => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/profile/${user.user_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      setProfile(data);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  if (!profile) {
    return (
      <View>
        <Text className="text-center">Yükleniyor...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView className="container bg-white">
        <TouchableWithoutFeedback
          onPress={() => {
            goBack();
          }}
          className="h-10 w-10"
        >
          <View
            className="absolute top-2 left-2 z-10 p-1 rounded-full"
            style={{ backgroundColor: "rgba(30, 30, 30, 0.5)" }}
          >
            <AntDesign name="arrowleft" size={26} color="white" />
          </View>
        </TouchableWithoutFeedback>
        <View className="background-image h-1/3">
          <Image
            source={{
              uri: `http://192.168.0.11:19002/api/background_pic/${profile.background_pic}`,
            }}
            className="w-full h-full"
          />
        </View>
        <View
          className="top-div justify-around relative bg-white"
          style={{ minHeight: 50 }}
        >
          <View className="absolute left-4" style={{ top: -35 }}>
            <Image
              source={{
                uri: `http://192.168.0.11:19002/api/${profile.profile_pic}`,
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                display: "flex",
                alignContent: "center",
                borderWidth: 2,
                borderColor: "white",
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text className="font-bold text-lg ml-6 mt-10">
              {user.username}
            </Text>
          </View>
          <View className="flex-row absolute right-1 top-3 w-1/3 justify-around">
            <View className="border border-gray-300 rounded-full p-1">
              <Icon name="bell-o" size={15} />
            </View>
            <View className="border border-gray-300 rounded-2xl p-1">
              <Text>Takip Ediliyor</Text>
            </View>
          </View>
        </View>
        <View className="bio-div">
          <Text className="ml-6 mt-4">{profile.bio}</Text>
        </View>
        <View className="mt-4">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity className="px-5 py-2 border-b-2 border-white">
              <Text className="text-center border-b-2 border-blue-500 p-1">
                Tweetler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-2 border-b-2 border-white">
              <Text className="text-center  p-1">Tweetler ve yanıtlar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-2 border-b-2 border-white">
              <Text className="text-center  p-1 ">Medya</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-2 border-b-2 border-white">
              <Text className="text-center  p-1 ">Beğeni</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View className="bg-dark p-4">
          <Text className="">Bottom Div</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default Profile;
