import {
  View,
  BackHandler,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";
import FormSingle from "../screens/FormSingle";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Evil from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../colors/colors";

const Home = ({ navigation }) => {
  let { user, urlBase } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [profile, setProfile] = useState();
  const [body, setBody] = useState();
  const [answerBody, setAnswerBody] = useState();
  const [answermodalVisible, setAnswermodalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [result, setResult] = useState();
  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    "rgba(29, 155, 240,0.7)"
  );

  const formUserRef = useRef();

  const FormsGel = async () => {
    let response = await fetch(`http://${urlBase}/api/forms/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == "200") {
      let data = await response.json();
      setForms(data);
    }
  };

  const answerForm = async () => {
    if (body == "" || body == undefined || body == null) {
      alert("Enter something to add a note.");
    } else {
      let response = await fetch(`http://${urlBase}/api/form/${id}/answer/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: body,
          profile: profile?.id,
        }),
      });
      if (response.status == "200") {
        setAnswermodalVisible(false);
        alert("cevaplandı.");
      }
    }
  };

  const deleteForm = async (id) => {
    let response = await fetch(`http://${urlBase}/api/form/${id}/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == "200") {
      let data = forms.filter(function (form) {
        return form.id != id;
      });
      setForms(data);
    }
  };

  const isFocused = useIsFocused();

  const layoutconfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  let getProfile = async () => {
    let response = await fetch(
      `http://${urlBase}/api/profile/${user?.user_id}/`,
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
    FormsGel();
    getProfile();
  }, [isFocused]);

  let textRef = useRef();

  const translation = useRef(new Animated.Value(-600)).current;

  useEffect(() => {
    FormsGel();
    getProfile();
  }, []);

  BackHandler.addEventListener("hardwareBackPress", function () {
    return true;
  });

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

  let duzenle = async () => {
    var formdata = new FormData();
    if (image != null) {
      formdata.append("photo", {
        name: new Date() + "_profile",
        uri: image,
        type: "image/jpg",
      });
    }
    formdata.append("body", body);
    formdata.append("profile", profile?.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      credentials: "same-origin",
    };
    let response = await fetch(
      `http://${urlBase}/api/create-form/`,
      requestOptions
    );
    if (response.status == 200) {
      let data = await response.json();
      console.log(data);
      setForms([data, ...forms]);
      LayoutAnimation.configureNext(layoutconfig);
      setBody("");
      setImage();
      setResult();
      textRef.current.clear();
      setModalVisible(false);
    }
  };

  if (!profile) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <SafeAreaView className="container h-full bg-white">
        <Animated.View
          className="w-3/4 h-full absolute top-0 left bg-white z-20 px-7 py-5 flex justify-evenly"
          style={{
            transform: [{ translateX: translation }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            zIndex: 30,
            elevation: 11,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Profile", {
                profile: profile,
              });
            }}
          >
            <View>
              <Image
                source={{
                  uri: `http://${urlBase}/api${profile.profile_pic}`,
                }}
                className="h-12 w-12 rounded-full"
                onPress={() => {
                  navigation.navigate("Profile", { profile: profile });
                }}
              />
              <Text className="font-bold text-xl mt-1">{user.username}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Profile", { profile: profile });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="user-o" size={22} style={{ width: 35 }} />
              <Text>Profil</Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="list-alt" size={22} style={{ width: 35 }} />
            <Text>Listeler</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Evil name="comment" size={22} style={{ width: 35 }} />
            <Text>Konular</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="bookmark-o" size={22} style={{ width: 35 }} />
            <Text>Yer işaretleri</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="user-o" size={22} style={{ width: 35 }} />
            <Text>An</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="money" size={22} style={{ width: 35 }} />
            <Text>Gelire dönüştürme</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>Ayarlar ve gizlilik</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(translation, {
                toValue: -600,
                duration: 1000,
                useNativeDriver: true,
              }).start();
            }}
            className="absolute right-0 bg-blue-400 p-1 rounded-full translate-x-6 z-10"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}
          >
            <Evil name="chevron-left" color={"white"} size={35} />
          </TouchableOpacity>
        </Animated.View>

        <View>
          <View className="flex flex-row justify-between px-4 py-3 border-b border-gray-300">
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(translation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                  }).start();
                }}
              >
                <Image
                  className=" w-8 h-8 rounded-full border border-black"
                  style={{ borderColor: "white", borderWidth: 1 }}
                  source={{
                    uri: `http://${urlBase}/api${profile.profile_pic}`,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                FormsGel();
              }}
              className="grid grid-cols-1 content-center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Icon name="twitter" size={30} color={colors.blue} />
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Icon name="star-o" size={24} />
            </TouchableOpacity>
          </View>

          {/* Form oluşturma modalı */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              className="items-center w-full  h-full bg-neutral-600"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <View className="items-center w-full relative text-input bg-white p-3 shadow-2xl h-full">
                <View className="w-full">
                  <View className="flex-row justify-between">
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}
                      className="flex justify-center"
                    >
                      <AntDesign name="close" size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={duzenle}>
                      <View
                        className="px-2 rounded-2xl"
                        style={[
                          styles.btn,
                          {
                            backgroundColor: btnBackgroundColor,
                            borderWidth: 1,
                            borderColor: btnBackgroundColor,
                          },
                        ]}
                      >
                        <Text className="text-white">Tweetle</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row mt-5">
                    <View>
                      <Image
                        source={{
                          uri: `http://${urlBase}/api${profile.profile_pic}`,
                        }}
                        className="h-12 w-12 rounded-full"
                        onPress={() => {
                          navigation.navigate("Profile", { profile: profile });
                        }}
                      />
                    </View>
                    <TextInput
                      placeholder="What's happening ?"
                      className="rounded-lg p-2 w-5/6 mb-3 ml-3"
                      style={{
                        minHeight: 100,
                        textAlignVertical: "top",
                      }}
                      multiline={true}
                      ref={textRef}
                      onChangeText={(text) => {
                        setBody(text);
                        if (text.length > 0) {
                          setBtnBackgroundColor(colors.blue);
                        } else {
                          setBtnBackgroundColor("rgba(29, 155, 240,0.7)");
                        }
                      }}
                    />
                  </View>
                  <View className="ml-16">
                    {image ? (
                      <View className="relative">
                        <Image source={{ uri: image }} className="h-80" />
                        <View
                          style={{
                            position: "absolute",
                            top: 3,
                            left: 3,
                            borderRadius: 100,
                            backgroundColor: "rgba(40,40,40,0.6)",
                            padding: 10,
                          }}
                        >
                          <Evil
                            onPress={() => {
                              setResult();
                              setImage();
                            }}
                            name="close"
                            size={22}
                            color={"white"}
                          />
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View className="absolute bottom-0 left-0 w-full p-3 vertical-icons flex ml-3">
                  <View className="flex-row justify-between">
                    <TouchableWithoutFeedback
                      onPress={() => {
                        pickImage(3, 3);
                      }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Icon name="image" color={colors.blue} size={19} />
                    </TouchableWithoutFeedback>
                    <View style={{ display: "flex", justifyContent: "center" }}>
                      <Icon name="smile-o" color={colors.blue} size={19} />
                    </View>
                    <View style={{ display: "flex", justifyContent: "center" }}>
                      <Foundation
                        name="graph-horizontal"
                        color={colors.blue}
                        size={19}
                      />
                    </View>
                    <View style={{ display: "flex", justifyContent: "center" }}>
                      <Evil name="location" color={colors.blue} size={19} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <ScrollView
            className="mb-14  border-b border-gray-400"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {forms.map((form) => {
              return (
                <FormSingle
                  key={form.id}
                  form={form}
                  forms={forms}
                  setForms={setForms}
                  navigation={navigation}
                  formUserRef={formUserRef}
                  profile={profile}
                  FormsGel={FormsGel}
                  setAnswermodalVisible={setAnswermodalVisible}
                />
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: colors.blue,
            position: "absolute",
            borderRadius: 30,
            bottom: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
            right: 20,
            padding: 10,
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <MaterialCommunityIcons name="feather" size={28} color={"white"} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  btn: {
    padding: 6,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 12,
    color: "white",
    borderWidth: 1,
  },
  settings_icon: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  profile_icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default Home;
