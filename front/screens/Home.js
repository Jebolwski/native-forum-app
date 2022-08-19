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
import React, { useContext, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import AuthContext from "../AuthContext";
import FormSingle from "../screens/FormSingle";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Evil from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../colors/colors";

const Home = ({ navigation }) => {
  let { user } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [profile, setProfile] = useState();
  const [body, setBody] = useState();
  const [sidebar, setSidebar] = useState(-600);
  const [modalVisible, setModalVisible] = useState(false);
  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    "rgba(29, 155, 240,0.7)"
  );
  const FormsGel = async () => {
    let response = await fetch("http://192.168.0.11:19002/api/forms/", {
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
  const createForm = async () => {
    if (body == "" || body == undefined || body == null) {
      alert("Enter something to add a note.");
    } else {
      let response = await fetch("http://192.168.0.11:19002/api/create-form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: body,
          user: user?.user_id,
        }),
      });
      if (response.status == "200") {
        let data = await response.json();
        setForms([data, ...forms]);
        LayoutAnimation.configureNext(layoutconfig);
        setBody("");
        textRef.current.clear();
        setModalVisible(false);
      }
    }
  };

  const deleteForm = async (id) => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/form/${id}/delete/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

  let getProfile = async (props) => {
    let response = await fetch(
      `http://192.168.0.11:19002/api/profile/${user?.user_id}/`,
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
  }, []);

  BackHandler.addEventListener("hardwareBackPress", function () {
    return true;
  });

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
          className="w-3/4 h-full absolute top-0 left bg-white z-20 px-7 py-5 border flex justify-evenly"
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
              navigation.navigate("Profile");
            }}
          >
            <View>
              <Image
                source={{
                  uri: `http://192.168.0.11:19002/api${profile.profile_pic}`,
                }}
                className="h-12 w-12 rounded-full"
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              />
              <Text className="font-bold text-xl mt-1">{user.username}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Profile");
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
                    uri: `http://192.168.0.11:19002/api${profile.profile_pic}`,
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View
              className="items-center w-full  h-full bg-neutral-600"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <View className="items-center w-full relative text-input bg-white p-3 shadow-2xl h-full">
                <View className="w-full">
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    className="w-full"
                  >
                    <Icon name="close" color={"rgb(29, 155, 240)"} size={26} />
                  </TouchableOpacity>
                  <View className="items-center mt-16">
                    <TextInput
                      placeholder="What's happening ?"
                      className="rounded-lg p-2 w-full mb-3"
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
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
                  <View className="items-center vertical-icons">
                    <View className="flex flex-row justify-between w-full">
                      <View className="flex-row justify-between w-1/2">
                        <View
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Icon name="image" color={colors.blue} size={19} />
                        </View>
                        <View
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Icon name="smile-o" color={colors.blue} size={19} />
                        </View>
                        <View
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Foundation
                            name="graph-horizontal"
                            color={colors.blue}
                            size={19}
                          />
                        </View>
                        <View
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Evil name="location" color={colors.blue} size={19} />
                        </View>
                      </View>
                      <View
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Text
                          style={[
                            styles.btn,
                            {
                              backgroundColor: btnBackgroundColor,
                              borderWidth: 1,
                              borderColor: btnBackgroundColor,
                            },
                          ]}
                          onPress={createForm}
                        >
                          Tweetle
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <ScrollView
            className="mb-14 border-b border-gray-300"
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
