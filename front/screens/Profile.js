import { View, Text, Image } from "react-native";
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
        <Text>Yükleniyor...</Text>
      </View>
    );
  } else {
    return (
      <View className="container">
        <View className="flex flex-row justify-around mt-5">
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text>{user.username}</Text>
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
              borderColor: "black",
            }}
          />
        </View>
      </View>
    );
  }
};

export default Profile;
