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
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../AuthContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileFormSingle from "./ProfileFormSingle";
import { colors } from "../colors/colors";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const Profile = (props) => {
  let { user, urlBase } = useContext(AuthContext);
  const [profile, setProfile] = useState(props.route.params.profile);
  const [profilesForm, setProfilesForm] = useState([]);
  const [profilesFormsWithImages, setProfilesFormsWithImages] = useState([]);
  const [profilesLikeds, setProfilesLikeds] = useState([]);
  const [begeniWidth, setBegeniWidth] = useState(0);
  const [tweetlerWidth, setTweetlerWidth] = useState(2);
  const [tweetlerveyanitlarWidth, setTweetlerveyanitlarWidth] = useState(0);
  const [medyaWidth, setMedyaWidth] = useState(0);
  const [modalPPVisible, setModalPPVisible] = useState(false);
  const [modalBPVisible, setModalBPVisible] = useState(false);
  const [image, setImage] = useState();
  const [result, setResult] = useState();

  const translation = useRef(new Animated.Value(1)).current;

  BackHandler.addEventListener("hardwareBackPress", function () {
    return false;
  });

  let getProfilesForms = async () => {
    let response = await fetch(
      `http://${urlBase}/api/profile/${profile.user}/forms/`,
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

  let getProfilesLikedForms = async () => {
    let response = await fetch(
      `http://${urlBase}/api/profile/${profile.user}/forms/liked/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      setProfilesLikeds(data);
    }
  };

  useEffect(() => {
    getProfilesForms();
    getProfilesLikedForms();
  }, [isFocused]);

  let tweetlerRef = useRef();
  let begeniRef = useRef();
  let tweetlerveyanitlarRef = useRef();
  let medyaRef = useRef();

  const [finalState, setFinalState] = useState([]);

  const isFocused = useIsFocused();
  const upload = async () => {
    const result = await launchCamera(options);
  };
  const pickImage = async (a, b) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [a, b],
      quality: 1,
    });

    setResult(result);
    var formdata = new FormData();
    formdata.append("photo", result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  let duzenle = async (a) => {
    var formdata = new FormData();
    if (image != null) {
      formdata.append("photo", {
        name: new Date() + "_profile",
        uri: image,
        type: "image/jpg",
      });
      formdata.append("pp_mi", a);
    }

    var requestOptions = {
      method: "PUT",
      body: formdata,
      credentials: "same-origin",
    };
    let response = await fetch(
      `http://${urlBase}/api/profile/${profile.id}/edit/`,
      requestOptions
    );
    if (response.status === 200) {
      setModalBPVisible(false);
      setModalPPVisible(false);
      getProfile();
    }
  };
  console.log(profilesLikeds);

  if (profile && finalState) {
    return (
      <SafeAreaView className="container bg-white h-full">
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.goBack();
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

        <TouchableWithoutFeedback
          onPress={() => {
            setModalBPVisible(true);
          }}
        >
          <View className="background-image h-1/3 max-h-32">
            <Image
              source={{
                uri: `http://${urlBase}/api${profile.background_pic}`,
              }}
              className="w-full h-full"
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          className="top-div justify-around relative bg-white"
          style={{ minHeight: 50 }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalPPVisible(true);
            }}
          >
            <View className="absolute left-4" style={{ top: -35 }}>
              <Image
                source={{
                  uri: `http://${urlBase}/api/${profile.profile_pic}`,
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
          </TouchableWithoutFeedback>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text className="font-bold text-lg ml-6 mt-10">
              {profile.username}
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
              <ProfileFormSingle
                form={form}
                key={form.id}
                navigation={props.navigation}
                getProfilesForms={getProfilesForms}
              />
            );
          })}
        </ScrollView>

        {/* Profile pic modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPPVisible}
          onRequestClose={() => {
            setModalPPVisible(!modalPPVisible);
          }}
        >
          <View className="w-full h-full bg-white">
            <View className="flex-row p-3 absolute">
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalPPVisible(false);
                }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <AntDesign name="arrowleft" size={26} className="font-bold" />
              </TouchableWithoutFeedback>
            </View>
            <View
              className="h-full"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {image ? (
                <Image
                  source={{
                    uri: image,
                  }}
                  className="w-full h-1/2"
                />
              ) : (
                <Image
                  source={{
                    uri: `http://${urlBase}/api${profile.profile_pic}`,
                  }}
                  className="w-full h-1/2"
                />
              )}
            </View>
            <View className="items-center">
              {image ? (
                <View className="flex-row w-full bottom-10 absolute justify-evenly">
                  <TouchableOpacity
                    onPress={() => {
                      setImage();
                    }}
                    className="justify-center border rounded-xl px-4 py-1"
                  >
                    <Text>Kaldır</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage(3, 3);
                    }}
                    className="justify-center border rounded-xl px-4 py-1"
                  >
                    <Text>Düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      duzenle("1");
                    }}
                    className="justify-center border rounded-xl px-4 py-1"
                  >
                    <Text>Kaydet</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    pickImage(3, 3);
                  }}
                  className="absolute bottom-10 justify-center border rounded-xl px-4 py-1"
                >
                  <Text>Düzenle</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>

        {/* Background pic modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalBPVisible}
          onRequestClose={() => {
            setModalPPVisible(!modalBPVisible);
          }}
        >
          <View className="w-full h-full bg-white">
            <View className="flex-row p-3 absolute">
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalBPVisible(false);
                }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <AntDesign name="arrowleft" size={26} className="font-bold" />
              </TouchableWithoutFeedback>
            </View>
            <View
              className="h-full"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {image ? (
                <Image
                  source={{
                    uri: image,
                  }}
                  className="w-full h-1/2"
                />
              ) : (
                <Image
                  source={{
                    uri: `http://${urlBase}/api${profile.background_pic}`,
                  }}
                  className="w-full h-1/2"
                />
              )}
            </View>
            <View className="items-center">
              {image ? (
                <View className="flex-row w-full bottom-10 absolute justify-evenly">
                  <TouchableOpacity
                    onPress={() => {
                      setImage();
                    }}
                    className="justify-center border rounded-xl px-4 py-1"
                  >
                    <Text>Kaldır</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage(16, 9);
                    }}
                    className="justify-center border rounded-xl px-4 py-1"
                  >
                    <Text>Düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      duzenle("0");
                    }}
                    className="justify-center border rounded-xl px-4 py-1"
                  >
                    <Text>Kaydet</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    pickImage(16, 9);
                  }}
                  className="absolute bottom-10 justify-center border rounded-xl px-4 py-1"
                >
                  <Text>Düzenle</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
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
