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

  useEffect(() => {
    FormsGel();
  }, []);
  BackHandler.addEventListener("hardwareBackPress", function () {
    return true;
  });
  if (!profile) {
    return (
      <View>
        <Text className="text-center twxt-white">Yükleniyor...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView className="container h-full bg-white">
        <View className="shadow-sm ">
          <View className="flex flex-row justify-between px-4 py-3 border-b border-black">
            <View
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <Image
                  className=" w-10 h-10 rounded-full border border-black"
                  style={{ borderColor: "white", borderWidth: 1 }}
                  source={{
                    uri: `http://192.168.0.11:19002/api${profile.profile_pic}`,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              className="grid grid-cols-1 content-center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text className="font-bold text-xl">Home</Text>
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <MaterialCommunityIcons
                name="feather"
                size={30}
                color={"rgb(35, 165, 245)"}
              />
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
              className="items-center w-full  h-full"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <View
                className="items-center w-11/12 relative text-input bg-white p-3 rounded-lg shadow-lg"
                style={{ borderWidth: 1, borderColor: "black" }}
              >
                <View className="w-full">
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    className="w-full"
                  >
                    <Icon name="close" color={"rgb(29, 155, 240)"} size={26} />
                  </TouchableOpacity>
                  <View className="items-center mt-4">
                    <TextInput
                      placeholder="What's happening ?"
                      className="rounded-lg p-2 w-full mb-3"
                      style={{ borderWidth: 1, borderColor: "black" }}
                      multiline={true}
                      numberOfLines={4}
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
            className="mb-9 border-b border-black"
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
                />
              );
            })}
          </ScrollView>
        </View>
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
