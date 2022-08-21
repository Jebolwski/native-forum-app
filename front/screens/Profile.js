import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../AuthContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import FormSingle from "./FormSingle";
import { colors } from "../colors/colors";

const Profile = ({ navigation }) => {
  let { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [profilesForm, setProfilesForm] = useState([]);
  const [profilesFormsWithImages, setProfilesFormsWithImages] = useState([]);
  const [profilesLikeds, setProfilesLikeds] = useState([]);
  const [begeniWidth, setBegeniWidth] = useState(0);
  const [tweetlerWidth, setTweetlerWidth] = useState(2);
  const [tweetlerveyanitlarWidth, setTweetlerveyanitlarWidth] = useState(0);
  const [medyaWidth, setMedyaWidth] = useState(0);

  const translation = useRef(new Animated.Value(1)).current;

  BackHandler.addEventListener("hardwareBackPress", function () {
    return false;
  });

  let getProfilesForms = async () => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/profile/${user.user_id}/forms/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      setProfilesForm(data);
      setFinalState(data);
    }
  };

  let getProfile = async () => {
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
    getProfilesForms();
  }, []);
  let tweetlerRef = useRef();
  let begeniRef = useRef();
  let tweetlerveyanitlarRef = useRef();
  let medyaRef = useRef();

  const [finalState, setFinalState] = useState([]);

  if (profile && finalState) {
    return (
      <SafeAreaView className="container bg-white h-full">
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
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
        <View className="background-image h-1/3 max-h-32">
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
          <View className="flex-row absolute right-4 top-3 w-1/3 justify-around">
            <View className="border border-gray-300 rounded-full p-1">
              <Icon name="bell-o" size={15} />
            </View>
            <View className="border border-gray-300 rounded-2xl p-1 ml-4">
              <Text>Takip Ediliyor</Text>
            </View>
          </View>
        </View>
        <View className="bio-div">
          <Text className="ml-6 mt-4">{profile.bio}</Text>
        </View>
        <View className="mt-2">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity className="px-5 py-2">
              <Text
                className="text-center p-1"
                ref={tweetlerRef}
                style={{
                  borderBottomColor: colors.blue,
                  borderBottomWidth: tweetlerWidth,
                }}
                onPress={() => {
                  setFinalState(profilesForm);
                  setTweetlerWidth(2);
                  setBegeniWidth(0);
                  setMedyaWidth(0);
                  setTweetlerveyanitlarWidth(0);
                }}
              >
                Tweetler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-2" ref={tweetlerveyanitlarRef}>
              <Text className="text-center  p-1">Tweetler ve yanıtlar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-2" ref={medyaRef}>
              <Text className="text-center  p-1 ">Medya</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-5 py-2"
              ref={begeniRef}
              onPress={() => {
                setTweetlerWidth(0);
                setBegeniWidth(2);
                setMedyaWidth(0);
                setTweetlerveyanitlarWidth(0);
                setFinalState(profilesLikeds);
              }}
            >
              <Text
                className="text-center p-1"
                style={{
                  borderBottomWidth: begeniWidth,
                  borderBottomColor: colors.blue,
                }}
              >
                Beğeni
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <ScrollView className="bg-dark">
          {finalState.map((form) => {
            return (
              <FormSingle form={form} key={form.id} navigation={navigation} />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default Profile;
