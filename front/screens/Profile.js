import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";

const Profile = () => {
  let { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();
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
      <SafeAreaView className="container bg-stone-800 ">
        <View className="top-div flex flex-row justify-around mt-5">
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text className="font-bold text-white">{user.username}</Text>
          </View>
          <Image
            source={{
              uri: `http://192.168.0.11:19002/api/${profile.profile_pic}`,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              display: "flex",
              alignContent: "center",
              borderWidth: 1,
              borderColor: "white",
            }}
          />
        </View>
        <View className="bio-div p-4">
          <Text className="text-white">{profile.bio}</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className=" bg-stone-800 px-5 py-2 border-b-2 border-white">
            <Text className="text-center text-white">Tweetler</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-5 py-2 border-b-2 border-white bg-stone-800">
            <Text className="text-center text-white">Tweetler ve yanıtlar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-5 py-2 border-b-2 border-white bg-stone-800">
            <Text className="text-center text-white">Medya</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-5 py-2 border-b-2 border-white bg-stone-800">
            <Text className="text-center text-white">Beğeni</Text>
          </TouchableOpacity>
        </ScrollView>
        <View className="bg-dark p-4">
          <Text className="text-white">Bottom Div</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default Profile;
